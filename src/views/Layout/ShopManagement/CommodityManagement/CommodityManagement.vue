<!--
 * @LastEditTime : 2019-12-30 16:34:36
 * @Description: 商品管理
 * @Date: 2019-12-16 15:59:26
 * @Author: @虾哔哔
 -->
<template>
	<div class="commodity-management">
		<div class="header">
			<!--  -->
			<el-input placeholder="请输入关键字搜索" v-model="search_info">
				<el-select v-model="search_item" slot="prepend" style="width:100px">
					<el-option label="商品名称" value="name"></el-option>
					<el-option label="商品ID" value="id"></el-option>
				</el-select>
				<i slot="suffix" class="el-input__icon el-icon-search" @click="getAllCommodity()" style="cursor: pointer;"></i>
			</el-input>
			<!--  -->
			<el-popover trigger="click" v-model="advanced_search.isShow">
				<el-form ref="form" :model="advanced_search.form" label-position="left" label-width="90px">
					<el-form-item label="类目：">
						<el-select class="tool-block" v-model="advanced_search.form.category" placeholder="请选择活动区域">
							<el-option label="全部类目" value="all"></el-option>
							<el-option label="未分类" value="no"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="状态：">
						<el-select class="tool-block" v-model="advanced_search.form.status" placeholder="请选择活动区域">
							<el-option label="全部状态" :value="0"></el-option>
							<el-option label="销售中" :value="1"></el-option>
							<el-option label="已售罄" :value="2"></el-option>
							<el-option label="仓库中" :value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="更新时间：">
						<el-date-picker v-model="advanced_search.form.time" :picker-options="$pickerOptions" value-format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="advancedSearch()">搜索</el-button>
					</el-form-item>
				</el-form>
				<el-button type="text" slot="reference">高级搜索</el-button>
			</el-popover>
			<!--  -->
			<div></div>
			<!--  -->
			<el-button type="primary" @click="syncCommodity()">同步</el-button>
			<el-button type="primary" @click="importCommodity()">导入</el-button>
			<el-button type="primary" @click="createCommodity()">新建</el-button>
			<!--  -->
			<el-dropdown trigger="click">
				<el-button type="primary">
					<span>批量操作</span>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>批量删除</el-dropdown-item>
					<el-dropdown-item>更新为销售中</el-dropdown-item>
					<el-dropdown-item>更新为已售罄</el-dropdown-item>
					<el-dropdown-item>更新为仓库中</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="content tool-my30">
			<el-table :data="tableData" border>
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column label="商品信息" width="300">
					<template slot-scope="scope">
						<div class="table-commodity__info">
							<el-image :src="scope.row.ico" :preview-src-list="[scope.row.ico]" fit="contain" style="width:50px;height:50px"></el-image>
							<div>
								<p>名称：{{scope.row.name}}</p>
								<p>ID：{{scope.row.id}}</p>
							</div>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="price" label="价格"></el-table-column>
				<el-table-column prop="category_name" label="类目"></el-table-column>
				<el-table-column prop="status" label="状态">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.status === 0" type="success" effect="plain">销售中</el-tag>
						<el-tag v-if="scope.row.status === 1" type="danger" effect="plain">已售罄</el-tag>
						<el-tag v-if="scope.row.status === 2" type="info" effect="plain">仓库中</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="count" label="咨询量"></el-table-column>
				<el-table-column prop="relevance" label="已关联问题"></el-table-column>
				<el-table-column prop="updated_time" label="更新时间" :formatter="timeFormat" width="150"></el-table-column>
				<el-table-column label="操作" width="100" fixed="right">
					<template slot-scope="scope">
						<el-button type="text" @click="editCommodity(scope.row)">编辑</el-button>
						<el-popconfirm title="确定删除吗？" @onConfirm="deleteCommodity(scope.row)">
							<el-button slot="reference" type="text">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination">
			<el-pagination @current-change="getAllCommodity" :current-page="pagination.page" :page-size="pagination.per_page" :total="pagination.total" background layout="prev, pager, next"></el-pagination>
		</div>
		<!-- components -->
		<ImportCommodity ref="ImportCommodity" />
		<EditCommodity ref="EditCommodity" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import ImportCommodity from "./components/ImportCommodity";
	import EditCommodity from "./components/EditCommodity";
	export default {
		components: {
			ImportCommodity,
			EditCommodity
		},
		data() {
			return {
				search_info: "",
				search_item: "name",
				advanced_search: {
					isShow: false,
					form: {
						category: "all",
						status: 0,
						time: []
					}
				},
				tableData: [],
				pagination: {
					page: 1, // 当前页
					per_page: 10, // 每页条数
					total: 0 // 总数
				}
			};
		},
		computed: {
			...mapGetters(["shopId"])
		},
		mounted() {
			this.getAllCommodity();
		},
		methods: {
			timeFormat(row, column, val, index) {
				if (val) {
					return dayjs(val).format("yyyy-MM-DD HH:mm:ss");
				} else {
					return val;
				}
			},
			// 获取/搜索
			getAllCommodity(page) {
				try {
					if (_.isNull(this.advanced_search.form.time)) {
						this.advanced_search.form.time = [];
					}
					let params = {
						authority_id: this.shopId,
						page: page || this.pagination.page,
						per_page: this.pagination.per_page,
						search_item: this.search_item,
						search_info: this.search_info,
						//
						category_id: this.advanced_search.form.category,
						status: this.advanced_search.form.status,
						start_date: this.advanced_search.form.time[0],
						end_date: this.advanced_search.form.time[1]
					};
					this.$store
						.dispatch("ShopManagement/getAllCommodity", params)
						.then(res => {
							console.log(res.data);
							this.tableData = res.data.data.list;
							this.pagination.page = res.data.data.page;
							this.pagination.per_page = res.data.data.per_page;
							this.pagination.total = res.data.data.total;
						})
						.catch(err => {});
				} catch (error) {
					console.log(error);
				}
			},
			// 高级搜索
			advancedSearch() {
				this.getAllCommodity();
				this.advanced_search.isShow = false;
			},
			// 新建
			createCommodity() {
				this.$refs.EditCommodity.openDialog();
			},
			// 编辑
			editCommodity(data) {
				this.$refs.EditCommodity.openDialog(data);
			},
			// 删除
			deleteCommodity(data) {
				console.log(data);
			},
			// 同步
			syncCommodity() {
				try {
					let params = {
						authority_id: this.shopId
					};
					this.$store
						.dispatch("ShopManagement/syncCommodity", params)
						.then(res => {
							console.log(res);
							if (res.data.code === 2000) {
								this.$message({
									type: "success",
									message: "已同步到最新商品信息",
									center: true
								});
							} else {
								this.$message({
									type: "error",
									message: "同步失败",
									center: true
								});
							}
						})
						.catch(err => {});
				} catch (error) {
					console.log(error);
				}
			},
			// 导入
			importCommodity() {
				this.$refs.ImportCommodity.openDialog();
			}
		}
	};
</script>

<style lang="less" scoped>
	.commodity-management {
		.header {
			display: grid;

			grid-template-rows: 1fr;
			grid-template-columns: 350px auto 1fr auto auto auto auto;
			grid-column-gap: 20px;
			.el-button + .el-button {
				margin-left: 0;
			}
		}
		.content {
			.table-commodity__info {
				display: grid;
				align-items: center;

				grid-template-rows: 1fr;
				grid-template-columns: 50px 1fr;
				justify-items: center;
				grid-gap: 10px;
			}
		}
		.pagination {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
</style>
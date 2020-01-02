<!--
 * @LastEditTime : 2020-01-02 10:18:15
 * @Description: 编辑商品信息
 * @Date: 2019-12-27 10:42:26
 * @Author: @虾哔哔
 -->
<template>
	<div class="edit-commodity">
		<el-dialog title="编辑商品" :visible.sync="dialogVisible" width="600px" @close="dialogClose()">
			<el-form ref="form" :model="form" label-width="100px">
				<!--  -->
				<el-form-item label="商品名称：" prop="name" :rules="{
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }">
					<el-input v-model="form.name" placeholder="输入商品名称"></el-input>
				</el-form-item>
				<!--  -->
				<el-form-item label="商品ID：" prop="goods_id" :rules="{ required: true, message: '请输入商品ID', trigger: 'blur' }">
					<el-input v-model="form.goods_id" placeholder="输入商品ID"></el-input>
				</el-form-item>
				<!--  -->
				<el-form-item label="商品状态：">
					<el-radio-group v-model="form.status">
						<el-radio :label="0">销售中</el-radio>
						<el-radio :label="1">已售罄</el-radio>
						<el-radio :label="2">仓库中</el-radio>
					</el-radio-group>
				</el-form-item>

				<h3>更多信息</h3>
				<!--  -->
				<el-form-item label="商品图：">
					<el-upload class="commodity-avatar" action="null" :show-file-list="false" :before-upload="uploadCommodityImage" accept="image/png, image/jpeg">
						<el-image v-if="form.ico" :src="form.ico" fit="contain">
							<div slot="error" class="el-image__error">
								<i class="el-icon-picture-outline tool-fontsize20"></i>
							</div>
						</el-image>
						<el-button v-else icon="el-icon-plus" plain></el-button>
						<div slot="tip" class="el-upload__tip">
							支持jpeg/png格式，建议尺寸800x800像素，图片小于5M
						</div>
					</el-upload>
				</el-form-item>
				<!--  -->
				<el-form-item label="商品链接：">
					<el-input v-model="form.link" placeholder="输入商品链接"></el-input>
				</el-form-item>
				<!--  -->
				<el-form-item label="价格(元)：">
					<el-input v-model="form.price" type="number">
						<font-icon slot="prefix" icon="yen-sign" />
						<i slot="suffix">元</i>
					</el-input>
				</el-form-item>
				<!--  -->
				<el-form-item label="配送方式：">
					<el-checkbox-group v-model="form.distribution">
						<el-checkbox :label="1">快递发货</el-checkbox>
						<el-checkbox :label="2">同城配送</el-checkbox>
						<el-checkbox :label="3">到店自提</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<!--  -->
				<el-form-item label="快递运费：">
					<el-input v-model="form.distribution_price" type="number">
						<font-icon slot="prefix" icon="yen-sign" />
						<i slot="suffix">元</i>
					</el-input>
				</el-form-item>
				<!--  -->
				<el-form-item label="会员折扣：">
					<el-checkbox-group v-model="form.member_discount">
						<el-checkbox :label="1">参加会员折扣</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<!--  -->
				<el-form-item label="商品卖点：">
					<el-input v-model="form.specialty" type="textarea"></el-input>
				</el-form-item>

				<h3>商品属性</h3>
				<!--  -->
				<el-form-item label="商品类目：">
					<div class="category">
						<el-select v-model="form.category_id" @visible-change="getCategory" @change="getAttr" placeholder="请选择">
							<el-option label="未分类" value="no"></el-option>
							<el-option v-for="(item, index) in categoryList" :key="index" :label="item.name" :value="item.id"></el-option>
						</el-select>
						<el-button type="text" @click="createCategory()">新建类目</el-button>
					</div>
				</el-form-item>

				<!--  -->
				<el-divider v-if="form.category_info.length>0">
					<i class="el-icon-sunny"></i>
				</el-divider>
				<div class="category_info">
					<template v-for="(item, index) in form.category_info">
						<el-form-item :label="item.label + '：'" :key="index">
							<el-input v-model="item.value"></el-input>
						</el-form-item>
					</template>
				</div>
			</el-form>
			<!--  -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm()">确 定</el-button>
			</span>
		</el-dialog>
		<CreateCategory ref="CreateCategory" />
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	import { urls } from "@/api/config";
	import CreateCategory from "./CreateCategory";

	const form = {
		authority_id: null,
		name: null,
		goods_id: null,
		status: 0, // 0 销售中，1 已售罄，2 仓库中
		ico: null,
		link: null, // 商品链接
		price: null, // 价格
		distribution: [], // 配送方式
		distribution_price: null, // 配送价格
		member_discount: [], // 是否参加会员折扣：0 默认 不参加；1 参加
		specialty: null, // 亮点
		category_id: "no", // 类目ID
		category_info: [] // 类目信息
	};
	export default {
		components: {
			CreateCategory
		},
		data() {
			return {
				type: "create",
				dialogVisible: true,
				form: JSON.parse(JSON.stringify(form)),
				categoryList: []
			};
		},
		computed: {
			...mapGetters(["shopId"])
		},
		mounted() {
			console.log(this);
		},
		methods: {
			openDialog(data) {
				if (data) {
					console.log(data);
					this.type = "edit";
					let params = {
						authority_id: this.shopId,
						id: data.id
					};
					this.$store
						.dispatch("ShopManagement/getCommodity", params)
						.then(res => {
							console.log(res);
							if (res.data.code === 2000) {
								this.form = JSON.parse(JSON.stringify(res.data.data));
							} else {
							}
						});
				} else {
					this.type = "create";
				}
				this.dialogVisible = true;
			},
			dialogClose() {
				this.$refs["form"].resetFields();
				this.form = JSON.parse(JSON.stringify(form));
			},
			uploadCommodityImage(file) {
				this.$message.success({
					message: "图片正在上传",
					center: true
				});
				console.log(file);
				const isJPG_PNG = file.type === "image/jpeg" || "image/png";
				const isLt5M = file.size / 1024 / 1024 < 5;

				if (isJPG_PNG && isLt5M) {
					let params = new FormData();
					params.append("authority_id", this.shopId);
					params.append("image", file);
					this.$store
						.dispatch("ShopManagement/uploadCommodityImage", params)
						.then(res => {
							if (res.data.code === 2000) {
								this.form.ico = res.data.data;
							} else {
								this.$message.error({
									message: res.data.desc,
									center: true
								});
							}
						});
				} else {
					if (!isJPG_PNG) {
						this.$message({
							type: "error",
							message: "上传头像图片只能是 jpeg/png 格式!",
							center: true
						});
						return false;
					}
					if (!isLt5M) {
						this.$message.error({
							type: "error",
							message: "上传头像图片大小不能超过 5MB!",
							center: true
						});
						return false;
					}
				}
				return false;
			},
			// 新建类目
			createCategory() {
				this.$refs.CreateCategory.openDialog();
			},
			// 获取类目
			getCategory(isShow) {
				if (isShow) {
					let params = {
						authority_id: this.shopId
					};
					this.$store.dispatch("ShopManagement/getCategory", params).then(res => {
						console.log(res);
						if (res.data.code === 2000) {
							this.categoryList = res.data.data;
						}
					});
				}
			},
			// 获取属性
			getAttr(id) {
				let params = {
					authority_id: this.shopId,
					id: id
				};
				this.$store.dispatch("ShopManagement/getAttr", params).then(res => {
					console.log(res);
					if (res.data.code === 2000) {
						this.form.category_info = res.data.data.keywords;
					}
				});
			},
			submitForm() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						let params = {
							authority_id: this.shopId,
							id: this.form.id,
							name: this.form.name,
							goods_id: this.form.goods_id,
							status: this.form.status,
							ico: this.form.ico,
							link: this.form.link,
							price: this.form.price,
							distribution: this.form.distribution,
							distribution_price: this.form.distribution_price,
							member_discount: this.form.member_discount,
							specialty: this.form.specialty,
							category_id: this.form.category_id,
							category_info: this.form.category_info
						};
						if (this.type === "create") {
							// 新建
							this.$store
								.dispatch("ShopManagement/createCommodity", params)
								.then(res => {
									console.log(res.data);
								});
						} else {
							// 编辑
							this.$store
								.dispatch("ShopManagement/editCommodity", params)
								.then(res => {
									console.log(res.data);
								});
						}
					} else {
						return false;
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.edit-commodity {
		.commodity-avatar {
			/deep/ .el-upload {
				display: block;
				width: 100px;
				height: 100px;
			}
			.el-image {
				width: 100%;
				height: 100%;
				background-color: #f5f7fa;
			}
			.el-button {
				width: 100%;
				height: 100%;
				border-style: dashed;
				background-color: #f5f7fa;
			}
		}
		.category {
			display: flex;
			justify-content: space-between;
			.el-select {
				flex: 1;
				margin-right: 30px;
			}
		}
		.category_info {
			display: grid;

			grid-template-columns: 1fr 1fr;
		}
	}
</style>

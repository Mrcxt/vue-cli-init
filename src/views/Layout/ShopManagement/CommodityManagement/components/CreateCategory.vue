<!--
 * @LastEditTime : 2019-12-31 16:32:34
 * @Description: 新建类目
 * @Date: 2019-12-31 11:45:33
 * @Author: @虾哔哔
 -->
<template>
	<div class="create-category">
		<el-dialog title="新建类目" :visible.sync="dialogVisible" width="600px" @close="dialogClose()">
			<el-form ref="form" :model="form" label-width="100px">
				<!--  -->
				<el-form-item label="商品类目：" prop="category" :rules="{
            required: true,
            message: '请输入商品类目，如食品',
            trigger: 'blur'
          }">
					<el-input v-model="form.category" placeholder="请输入商品类目，如食品"></el-input>
				</el-form-item>
				<el-form-item label="商品属性：" :rules="{required: true}">
					<el-form-item v-for="(item,index) in form.attr" :key="index" :rules="{required: true, message: '请输入该类目下的商品属性，如有效期', trigger: 'blur'}" :prop="'attr.' + index + '.name'">
						<el-input v-model.trim="item.name" placeholder="请输入该类目下的商品属性，如有效期">
							<el-button slot="prepend">{{index + 1}}</el-button>
							<el-button v-if="index !== 0 || form.attr.length > 1" slot="append" type="danger" icon="el-icon-delete" @click="removeAttr(index)"></el-button>
						</el-input>
					</el-form-item>
					<el-button type="text" icon="el-icon-plus" @click="addAttr()">新增属性</el-button>

				</el-form-item>
			</el-form>
			<!--  -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitForm()">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	const form = {
		category: null,
		attr: [
			{
				name: null
			}
		]
	};
	export default {
		data() {
			return {
				dialogVisible: false,
				form: JSON.parse(JSON.stringify(form))
			};
		},
		computed: {
			...mapGetters(["shopId"])
		},
		methods: {
			openDialog() {
				this.dialogVisible = true;
			},
			dialogClose() {
				this.$refs["form"].resetFields();
				this.form = JSON.parse(JSON.stringify(form));
			},
			// 删除回答语料
			removeAttr(index) {
				if (index !== -1) {
					this.form.attr.splice(index, 1);
				}
			},
			// 添加回答语料
			addAttr() {
				this.form.attr.push({ name: null });
			},
			submitForm() {
				this.$refs["form"].validate(valid => {
					if (valid) {
						let params = {
							authority_id: this.shopId,
							name: this.form.category,
							keywords: this.form.attr.map(item => item.name)
						};
						this.$store
							.dispatch("ShopManagement/createCategory", params)
							.then(res => {
								if (res.data.code === 2000) {
									this.$message.success({
										message: res.data.desc,
										center: true
									});
									this.dialogVisible = false;
								} else {
									this.$message.error({
										message: res.data.desc,
										center: true
									});
								}
							});
					} else {
						return false;
					}
				});
			}
		}
	};
</script>

<style lang="less" scoped>
	.create-category {
	}
</style>

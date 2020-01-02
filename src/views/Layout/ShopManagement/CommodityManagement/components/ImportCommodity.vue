<!--
 * @LastEditTime : 2019-12-26 18:56:03
 * @Description: 导入商品
 * @Date: 2019-12-26 17:07:37
 * @Author: @虾哔哔
 -->
<template>
	<div class="import-commodity">
		<el-dialog title="导入商品" :visible.sync="dialogVisible" width="500px">
			<!--  -->
			<div class="content">
				<div class="tool-mb30">
					<div class="layout_grid">
						<span>点击下载模板</span>
						<el-select v-model="templateType" placeholder="请选择类目">
							<el-option label="类目1" value="1"></el-option>
						</el-select>
						<el-button type="primary" plain :disabled="!templateType">下载类目模板</el-button>
					</div>
					<div class="tips">
						提示: 请先选择类目，下载当前类目的导入模板文件，按格式填写后上传提交。
					</div>
				</div>
				<div>
					<div class="layout_grid">
						<span>上传模板导入数据</span>
						<el-upload action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
							<el-button size="small" type="primary">选择文件</el-button>
						</el-upload>
					</div>
					<div class="tips">
						<p>提示:</p>
						<p>1、只能上传xls、xlsx文件，且不超过5M；</p>
						<p>2、商品ID不能重复，若导入的商品ID已存在，将对原商品进行覆盖更新；</p>
						<p>3、为保证导入顺利，请按照模板填写导入。</p>
					</div>
				</div>
			</div>
			<!--  -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dialogVisible: false,
				templateType: ""
			};
		},
		methods: {
			openDialog() {
				this.dialogVisible = true;
			}
		}
	};
</script>

<style lang="less" scoped>
	.import-commodity {
		.content {
			.layout_grid {
				display: grid;
				align-items: center;

				grid-template-rows: 1fr;
				grid-template-columns: auto 1fr auto;
				grid-column-gap: 20px;
			}
			.tips {
				margin-top: 10px;
				color: @text-color-3;
				font-size: @font-size-1;
				p {
					margin: 0;
				}
			}
		}
	}
</style>
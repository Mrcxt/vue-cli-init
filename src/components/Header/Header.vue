<!--
 * @LastEditTime : 2019-12-25 13:26:54
 * @Description: 
 * @Date: 2019-12-11 09:39:31
 * @Author: @虾哔哔
 -->
<template>
	<div class="header">
		<div class="logo">
			logo 200px
		</div>
		<div class="robot">
			<el-tag size="null" effect="plain">{{shopName}}</el-tag>
		</div>
		<div class="remind">
			<el-button type="text" size="null" icon="el-icon-bell" circle></el-button>
		</div>
		<div class="user">
			<el-button type="text" size="null" icon="el-icon-user" circle></el-button>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		computed: {
			...mapGetters(["shopId", "shopName", "shopLogo"])
		}
	};
</script>

<style lang="less" scoped>
	.header {
		position: relative;
		z-index: 10;
		display: grid;
		align-items: center;
		height: 100%;
		box-shadow: @box-shadow-1;

		justify-items: center;
		grid-template-rows: 1fr;
		grid-template-columns: 200px 1fr auto auto;
		grid-column-gap: 30px;
		.logo {
		}
		.robot {
			justify-self: start;
		}
		.remind {
		}
		.user {
			margin-right: 30px;
		}
	}
</style>

<!--
 * @LastEditTime : 2020-01-02 11:40:28
 * @Description: 
 * @Date: 2019-12-11 09:39:24
 * @Author: @虾哔哔
 -->
<template>
	<div class="navmenu" :style="{ width: menuWidth }">
		<el-scrollbar class="scrollbar">
			<el-menu :default-active="$route.path" router :unique-opened="true" :collapse="collapseSwitch" :collapse-transition="false">
				<template v-for="items in menuRouter">
					<template v-if="items.meta.isShow">
						<!-- 二级菜单大于1 -->
						<el-submenu v-if="items.children && items.children.length > 1" :index="items.path" :key="items.path">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span>{{ items.meta.title }}</span>
							</template>
							<template v-for="item in items.children">
								<el-menu-item v-if="item.meta.isShow" :index="items.path + '/' + item.path.replace('/', '')" :key="item.path">
									<span slot="title">{{ item.meta.title }}</span>
								</el-menu-item>
							</template>
						</el-submenu>
						<!-- 二级菜单等于1 -->
						<template v-else-if="items.children && items.children.length === 1">
							<template v-for="item in items.children">
								<el-menu-item :index="items.path + '/' + item.path.replace('/', '')" :key="item.path">
									<i class="el-icon-location"></i>
									<span slot="title">{{ item.meta.title }}</span>
								</el-menu-item>
							</template>
						</template>
						<!-- 无二级菜单 -->
						<el-menu-item v-else :index="items.path" :key="items.path">
							<i class="el-icon-location"></i>
							<span slot="title">{{ items.meta.title }}</span>
						</el-menu-item>
					</template>
				</template>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		components: {},
		data() {
			return {
				menuRouter: this.$router.options.routes
			};
		},
		computed: {
			...mapGetters(["collapseSwitch"]),
			menuWidth() {
				return this.collapseSwitch ? "auto" : "200px";
			}
		}
	};
</script>

<style lang="less" scoped>
	.navmenu {
		position: relative;
		height: 100%;
		.scrollbar {
			height: 100%;
			.el-menu {
				border-right: none;
			}
		}
	}
</style>

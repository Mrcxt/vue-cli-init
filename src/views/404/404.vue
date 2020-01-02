<!--
 * @LastEditTime : 2019-12-24 13:56:44
 * @Description: 
 * @Date: 2019-12-10 16:10:38
 * @Author: @虾哔哔
 -->
<template>
	<div class="_404">
		<div class="main">
			<div class="logo">
				<i class="el-icon-sunny"></i>
			</div>
			<div class="content">
				<div class="inner">
					<h1>404</h1>
					<p>对不起，你要找的这个页面突然不见了。不过，放心，一切都在我的掌控之中，不会跑多远！</p>
				</div>
			</div>
			<div class="nav">
				<el-button size="null" plain @click="routerTo('/')">首页</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			routerTo(path) {
				this.$router.push(path);
			}
		}
	};
</script>

<style lang="less" scoped>
	._404 {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: "Source Sans Pro", sans-serif;
		&::before,
		&::after {
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			height: 100%;
			content: "";
		}
		&::before {
			z-index: 2;
			background-image: linear-gradient(
					to top,
					rgba(19, 21, 25, 0.5),
					rgba(19, 21, 25, 0.5)
				),
				url(./images/overlay.png);
			background-position: center, center;
			background-size: auto, 256px 256px;
			background-repeat: no-repeat, repeat;
		}
		&::after {
			z-index: 1;
			background-image: url(./images/bg.jpg);
			background-position: center;
			background-size: cover;
			background-repeat: no-repeat;
		}
		.main {
			position: relative;
			z-index: 10;
			color: #ffffff;
			text-align: center;
			.logo {
				display: inline-block;
				padding: 1rem;
				border: solid 1px #ffffff;
				border-radius: 100%;
				[class^="el-icon-"] {
					font-size: 3rem;
				}
			}
			.content {
				position: relative;
				margin-top: 50px;
				border: 1px solid #fff;
				border-right-width: 0;
				border-left-width: 0;
				&::before {
					position: absolute;
					top: 0;
					left: 50%;
					width: 1px;
					height: 50px;
					background-color: #fff;
					content: "";
					transform: translate(-50%, -100%);
				}
				.inner {
					padding: 2rem 0;
				}
			}
			.nav {
				position: relative;
				margin-top: 50px;
				&::before {
					position: absolute;
					top: 0;
					left: 50%;
					width: 1px;
					height: 50px;
					background-color: #fff;
					content: "";
					transform: translate(-50%, -100%);
				}
				.el-button {
					background-color: transparent;
					color: #fff;
				}
			}
		}
	}
</style>

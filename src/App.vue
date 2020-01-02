<!--
 * @LastEditTime: 2019-12-11 10:03:16
 * @Description: 
 * @Date: 2019-12-04 15:39:17
 * @Author: @虾哔哔
 -->
<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="less">
	html,
	body {
		width: 100%;
		height: 100%;
	}
	#app {
		display: flex;
		align-items: stretch;
		justify-content: center;
		width: 100%;
		height: 100%;
		color: #2c3e50;
		font-family: "Avenir", Helvetica, Arial, sans-serif;

		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		& > * {
			flex: 1;
		}
	}
</style>

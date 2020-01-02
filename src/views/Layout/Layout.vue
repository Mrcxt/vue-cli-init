<!--
 * @LastEditTime: 2019-12-18 14:56:23
 * @Description: 
 * @Date: 2019-12-10 16:29:00
 * @Author: @虾哔哔
 -->
<template>
  <div class="layout">
    <div class="e-header">
      <Header />
    </div>
    <div class="e-aside">
      <NavMenu />
    </div>
    <!--  -->
    <div class="e-aside__collapse">
      <CollapseSwitch />
    </div>
    <div class="e-main">
      <el-scrollbar class="scrollbar">
        <h2 class="e-main__title">{{ $route.meta.title }}</h2>
        <div class="e-main__view">
          <router-view />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu/NavMenu";
import Header from "@/components/Header/Header";
import CollapseSwitch from "@/components/CollapseSwitch/CollapseSwitch";

export default {
  components: {
    NavMenu,
    Header,
    CollapseSwitch
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: grid;

  grid-template-rows: 60px 1fr;
  grid-template-columns: auto 0px 1fr;
  grid-template-areas:
    "header header header"
    "aside aside_collapse main";

  .e-header {
    grid-area: header;
  }
  .e-aside {
    overflow: hidden; //解决内容溢出的问题

    grid-area: aside;
  }
  .e-aside__collapse {
    position: relative;

    grid-area: aside_collapse;
  }
  .e-main {
    display: flex;
    overflow: hidden; //解决内容溢出的问题
    background-color: #f5f6f9;

    grid-area: main;
    .scrollbar {
      flex: 1;
      /deep/ .el-scrollbar__view {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        padding: 30px;
        min-height: 100%;
      }
      .e-main__title {
        margin: 0;
        margin-bottom: 10px;
        font-size: @font-size-4;
      }
      .e-main__view {
        flex: 1;
        padding: 30px;
        background-color: #fff;
      }
    }
  }
}
</style>

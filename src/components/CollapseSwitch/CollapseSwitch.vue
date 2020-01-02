<!--
 * @LastEditTime: 2019-12-17 11:16:16
 * @Description: 
 * @Date: 2019-12-17 11:11:14
 * @Author: @虾哔哔
 -->
<template>
  <!--  -->
  <div class="collapse-switch" @click="toggleCollapseSwitch">
    <i v-if="collapseSwitch" class="el-icon-d-arrow-right"></i>
    <i v-else class="el-icon-d-arrow-left"></i>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["collapseSwitch"])
  },
  mounted() {
    // console.log(this.menuRouter);
  },
  methods: {
    toggleCollapseSwitch() {
      this.$store.commit("TOGGLE_COLLAPSE_SWITCH", !this.collapseSwitch);
    }
  }
};
</script>

<style lang="less" scoped>
.collapse-switch {
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 999;
  padding: 5px 3px;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: @box-shadow-1;
  cursor: pointer;
  transform: translate(100%, -50%);
}
</style>

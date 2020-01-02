/*
 * @LastEditTime : 2020-01-02 11:38:23
 * @Description:
 * @Date: 2019-12-10 16:47:53
 * @Author: @虾哔哔
 */
export default [
  {
    path: "/",
    redirect: "/ShopManagement/CommodityManagement",
    meta: {
      title: "",
      isShow: false
    }
  },
  {
    path: "/ShopManagement",
    component: () => import("@/views/Layout/Layout.vue"),
    meta: {
      title: "店铺管理",
      icon: "icon",
      isShow: true
    },
    children: [
      {
        path: "CommodityManagement",
        name: "CommodityManagement",
        component: () =>
          import(
            "@/views/Layout/ShopManagement/CommodityManagement/CommodityManagement.vue"
          ),
        meta: {
          title: "商品管理",
          isShow: true
        }
      },
      {
        path: "CategoryManagement",
        name: "CategoryManagement",
        component: () =>
          import(
            "@/views/Layout/ShopManagement/CategoryManagement/CategoryManagement.vue"
          ),
        meta: {
          title: "类目管理",
          isShow: true
        }
      },
      {
        path: "ActivityManagement",
        name: "ActivityManagement",
        component: () =>
          import(
            "@/views/Layout/ShopManagement/ActivityManagement/ActivityManagement.vue"
          ),
        meta: {
          title: "活动管理",
          isShow: true
        }
      }
    ]
  },
  {
    path: "/KnowledgeBase",
    component: () => import("@/views/Layout/Layout.vue"),
    meta: {
      title: "知识库",
      icon: "icon",
      isShow: true
    },
    children: [
      {
        path: "BusinessKnowledge",
        component: () =>
          import(
            "@/views/Layout/KnowledgeBase/BusinessKnowledge/BusinessKnowledge.vue"
          ),
        meta: {
          title: "业务知识",
          isShow: true
        }
      }
    ]
  }
];

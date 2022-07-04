// createWebHistory： web端的history模式
// createWebHashHistory：web端的hash模式
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

// 注·1：这种import导入，打包的时候，会被打包到一起，这样，首次加载页面太慢，需要使用 () => import()
// import Home from "../pages/Home.vue";
// import About from "../pages/About.vue";

// 1、配置映射关系
const routes = [
  // 路由的默认路径
  {
    path: "/",
    redirect: "/home",
  },
  // /home/shops
  {
    path: "/home",
    name: "home",
    // 注·2：import()函数，返回的就是一个promise，webpack会自动进行分包。这样，该组件就是懒加载的了
    // 指定webpack打包后的名字，/* webpackChunkName: "home-chunk" */
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ "../pages/Home.vue"),
    meta: {
      name: "why",
      age: 18,
      height: 1.88,
    },
    children: [
      {
        path: "",
        redirect: "/home/message",
      },
      {
        // 这里是不需要加/
        path: "message",
        component: () => import("../pages/HomeMessage.vue"),
      },
      {
        path: "shops",
        component: () => import("../pages/HomeShops.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../pages/About.vue"),
  },

  {
    // 动态路由，使用:username进行占位
    path: "/user/:username/id/:id",
    component: () => import("../pages/User.vue"),
  },
  {
    path: "/login",
    component: () => import("../pages/Login.vue"),
  },
  // 类似动态路由匹配，.代表任意字符 *代表0个/多个
  {
    path: "/:pathMatch(.*)",
    component: () => import("../pages/NotFound.vue"),
  },
];

// 2、创建一个路由对象router
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 动态添加路由
const categoryRoute = {
  path: "/category",
  component: () => import("../pages/Category.vue"),
};

// 添加顶级路由对象
router.addRoute(categoryRoute);

// 添加二级路由对象， 使用的是name属性
router.addRoute("home", {
  path: "moment",
  component: () => import("../pages/HomeMoment.vue"),
});

// 导航守卫beforeEach
let counter = 0;
// to: Route对象, 即将跳转到的Route对象
// from: Route对象,
/**
 * 返回值问题:
 *    1.false: 不进行导航
 *    2.undefined或者不写返回值: 进行默认导航
 *    3.字符串: 路径, 跳转到对应的路径中
 *    4.对象: 类似于 router.push({path: "/login", query: ....})
 */
// next() 4.x不推荐使用了
router.beforeEach((to, from) => {
  console.log(`进行了${++counter}路由跳转`);
  // if (to.path.indexOf("/home") !== -1) {
  //   return "/login"
  // }
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login";
    }
  }
});

// 3、将路由对象导出
export default router;
// 4、安装router
// 5、使用<router-view>进行占位
// 6、使用<router-link to='/home'>

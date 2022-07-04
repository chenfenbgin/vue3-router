<template>
  <div id="app">
    <!-- props: href 跳转的链接 -->
    <!-- props: route对象 -->
    <!-- props: navigate导航函数 -->
    <!-- props: isActive 是否当前处于活跃的状态 -->
    <!-- props: isExactActive 是否当前处于精确的活跃状态 -->
    <!-- custom属性，加上了外面就没有一层a元素包裹了 -->
    <router-link to="/home" v-slot="props" custom>
      <!-- props.navigate 相当于 使用了 this.$router.push() -->
      <button @click="props.navigate">{{ props.href }}</button>
      <button @click="props.navigate">哈哈哈</button>

      <!-- isActive,是否出于当前的活跃状态 -->
      <span :class="{ active: props.isActive }">{{ props.isActive }}</span>
      <span :class="{ active: props.isActive }">{{ props.isExactActive }}</span>
      <!-- <p>{{props.route}}</p> -->
    </router-link>

    <router-link to="/about">关于</router-link>
    <router-link to="/user/kobe/id/111">用户</router-link>
    <router-link to="/category">分类</router-link>

    <button @click="jumpToAbout">关于</button>
    <button @click="forwardOneStep">前进一步</button>

    <!-- 这里也是可以写成对象的结构形式的 -->
    <!-- <router-view v-slot="{Component}"> -->
    <router-view v-slot="props">
      <!-- 添加动画 -->
      <transition name="why">
        <!-- <keep-alive> -->
        <component :is="props.Component"></component>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
  // 使用methods方式进行路由跳转
  // methods: {
  //   jumpToAbout() {
  //     // router
  //     this.$router.push("/about")
  //   }
  // },
  // setup中的写法
  setup() {
    const router = useRouter();

    const jumpToAbout = () => {
      // router.push("/about")
      // router.push({
      //   path: "/about",
      //   query: {
      //     name: "why",
      //     age: 18
      //   }
      // })
      // router.replace("/about")
    };

    const forwardOneStep = () => {
      router.go(1);
      // router.go(-1)
      // router.forward()
      // router.back()
    };

    return {
      jumpToAbout,
      forwardOneStep,
    };
  },
};
</script>

<style>
/* 1、会在router-link 添加该class，那个选项就可以险种 */
/* .router-link-active {
  color: red;
} */

/* 2、修改上面默认添加的router-link-active，需要在router-link添加active-class=".why-active" */
.why-active {
  color: red;
}

.why-enter-from,
.why-leave-to {
  opacity: 0;
}
/* 这个class可以不写，因为元素默认的opacity: 1就是1; */
.why-enter-to,
.why-leave-from {
  opacity: q;
}

.why-enter-active,
.why-leave-active {
  transition: opacity 1s ease;
}
</style>

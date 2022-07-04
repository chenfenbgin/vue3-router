import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)

app.mount('#app')

// 这里是可以写链式调用的，因为createApp(app).user(router)返回的也是一个app对象
// createApp(App).use(router).mount("#app")


import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import App from './App.vue'
import { store, key } from './app/store/store'

import 'element-plus/dist/index.css'
import './app/styles/index.scss'

createApp(App).use(router).use(store, key).use(ElementPlus).mount('#app')

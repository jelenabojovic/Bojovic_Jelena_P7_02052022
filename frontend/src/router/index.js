import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import Signup from "../views/Signup.vue"



const routes = [
  {
   path: '/',
   name: 'Login',
   component: Login
 }, 
 
 {
   path: '/signup',
   name: 'Signup',
   component: Signup
 },
    
]

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

export default router;

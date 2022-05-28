import { createRouter, createWebHistory } from "vue-router"




const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import("../views/Login.vue")
}, 
{
  path: '/signup',
 name: 'Signup',
 component: () => import("../views/Signup.vue")
},
{
  path: '/feed',
  name: 'Feed',
 component: () => import("../views/Feed.vue")
},  
    
]

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

export default router;

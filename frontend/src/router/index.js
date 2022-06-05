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
  path: '/wall',
  name: 'Wall',
  component: () => import("../views/Wall.vue")
},  
{
  path: '/profile',
  name: 'Profile',
  component: () => import("../views/Profile.vue")
},
    
]

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

export default router;

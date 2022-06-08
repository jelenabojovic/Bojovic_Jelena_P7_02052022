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
  path: '/profile/:id',
  name: 'Profile',
  component: () => import("../views/Profile.vue")
},
{
  path: '/about',
  name: 'About',
  component: () => import("../views/About.vue"),
},
{
  path: '/members',
  name: 'Members',
  component: () => import("../views/Members.vue"),
},
    
]

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  })

export default router;

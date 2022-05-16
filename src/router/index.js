import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home';
import Task from '../views/Task';
import Template from '../views/Template';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/task',
        name: 'Task',
        component: Task,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/template',
        name: 'Template',
        component: Template,
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/template/edit',
        name: 'TemplateEdit',
        component: () => import('@/views/TemplateEdit'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;

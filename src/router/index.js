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
  },
  {
    path: '/task',
    name: 'Task',
    component: Task,
  },
  {
    path: '/template',
    name: 'Template',
    component: Template,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

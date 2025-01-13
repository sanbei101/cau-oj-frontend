import { createRouter, createWebHistory } from 'vue-router';

const Front = () => import('@/views/FrontRoot.vue');
const ProblemList = () => import('@/views/components/Problems.vue');
const Submission = () => import('@/views/components/Submission/Index.vue');
const HelpDoc = () => import('@/views/components/Help.vue');
const NotFound = () => import('@/views/components/NotFound.vue');
const ErrorPage = () => import('@/views/components/Error.vue');

const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/problems',
      component: Front,
      children: [
        {
          path: '/problems',
          name: 'problems',
          component: ProblemList
        },
        {
          path: '/submission/:pid',
          name: 'submission',
          component: Submission,
          props: (route) => ({
            pid: Number(route.params.pid)
          })
        },
        {
          path: '/help',
          name: 'help',
          component: HelpDoc
        },
        {
          path: '/error',
          name: 'error',
          meta: {
            title: '错误'
          },
          component: ErrorPage
        },
        {
          path: '/:catchAll(.*)',
          name: '404',
          component: NotFound
        }
      ]
    }
  ]
});

export default router;

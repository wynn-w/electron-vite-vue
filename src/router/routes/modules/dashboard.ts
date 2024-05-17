import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: 'Dashboard',
  },
  children: [
    {
      path: 'index',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: {
        title: 'Dashboard',
        hideMenu: true,
      },
    }
  ],
};

export default dashboard;

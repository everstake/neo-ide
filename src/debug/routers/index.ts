import asyncComponent from '../components/asyncComponent';
// import redirectComponent from '@/components/redirectComponent';

export default [

  {
    component: asyncComponent(() => import('../containers/debug')),
    exact: true,
    path: '/debug',
  },

];
import StepOneView from '@/views/StepOneView.vue';
import StepTwoView from '@/views/StepTwoView.vue';
import StepThreeView from '@/views/StepThreeView.vue';
import StepFourView from '@/views/StepFourView.vue';
import MarketView from '@/views/MarketView.vue';
import NextRoundView from '@/views/NextRoundView.vue';
import HomeView from '@/views/HomeView.vue';
import {createWebHistory, createRouter} from 'vue-router';
import {usePlayerInfoStore} from '@/stores/playerInfo.js';

const routes = [
  {path: '/', component: HomeView},
  {path: '/step-1', component: StepOneView},
  {path: '/step-2', component: StepTwoView},
  {path: '/step-3', component: StepThreeView},
  {path: '/step-4', component: StepFourView},
  {path: '/market', component: MarketView},
  {path: '/next-round', component: NextRoundView},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, name)=> {
  const checkPaths = ['/step-2', '/step-3', '/step-4', '/market', '/next-round'];
  if (checkPaths.filter((val) => val === to.path).length > 0 && usePlayerInfoStore().playerName === '') {
    return '/';
  }
});

export default router;

import StepOneView from '@/views/StepOneView.vue';
import StepTwoView from '@/views/StepTwoView.vue';
import StepThreeView from '@/views/StepThreeView.vue';
import StepFourView from '@/views/StepFourView.vue';
import HomeView from '@/views/HomeView.vue';
import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { path: '/', component: HomeView },
  { path: '/step-1', component: StepOneView },
  { path: '/step-2', component: StepTwoView },
  { path: '/step-3', component: StepThreeView },
  { path: '/step-4', component: StepFourView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

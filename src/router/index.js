import NewGameView from '@/views/NewGameView.vue';
import PlayerOverviewView from '@/views/PlayerOverviewView.vue';
import SelectPlanetView from '@/views/SelectPlanetView.vue';
import WelcomeToPlanetView from '@/views/WelcomeToPlanetView.vue';
import MarketView from '@/views/MarketView.vue';
import NextRoundView from '@/views/NextRoundView.vue';
import HomeView from '@/views/HomeView.vue';
import {createWebHistory, createRouter} from 'vue-router';
import {usePlayerInfoStore} from '@/stores/playerInfo.js';

const routes = [
  {path: '/', component: HomeView},
  {path: '/new-game', component: NewGameView},
  {path: '/player-overview', component: PlayerOverviewView},
  {path: '/select-planet', component: SelectPlanetView},
  {path: '/welcome-to-planet', component: WelcomeToPlanetView},
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

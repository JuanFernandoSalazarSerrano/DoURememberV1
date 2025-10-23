import { Routes } from '@angular/router';
import { MemoryRecall } from './components/memory-recall/memory-recall';
import { HomePage } from './components/home-page/home-page';
import { MemoryRecallChat } from './components/memory-recall-chat/memory-recall-chat';
import { StatisticsSession } from './components/statistics-session/statistics-session';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'tests/memoryrecall/1', // 1 is user
    component: MemoryRecall
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'tests/groundtruth', // 1 is session
    component: MemoryRecallChat
  },
  {
    path: 'statistics/session/1', // 1 is session
    component: StatisticsSession
  }
];

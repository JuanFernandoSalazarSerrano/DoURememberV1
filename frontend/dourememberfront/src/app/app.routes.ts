import { Routes } from '@angular/router';
import { MemoryRecall } from './components/memory-recall/memory-recall';
import { HomePage } from './components/home-page/home-page';
import { MemoryRecallChat } from './components/memory-recall-chat/memory-recall-chat';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'tests/memoryrecall/1',
    component: MemoryRecall
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'tests/groundtruth',
    component: MemoryRecallChat
  }
];

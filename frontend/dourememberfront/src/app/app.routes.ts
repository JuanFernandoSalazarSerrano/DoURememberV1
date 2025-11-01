import { Routes } from '@angular/router';
import { MemoryRecall } from './components/memory-recall/memory-recall';
import { HomePage } from './components/home-page/home-page';
import { MemoryRecallChat } from './components/memory-recall-chat/memory-recall-chat';
import { StatisticsSession } from './components/statistics-session/statistics-session';
import { DoctorHomepage } from './components/doctor-homepage/doctor-homepage';
import { PatientSessions } from './components/patient-sessions/patient-sessions';
import { MemoryCardsGame } from './components/memory-cards-game/memory-cards-game';
import { WordsMatchingGame } from './components/words-matching-game/words-matching-game';
import { LineMatchingGame } from './components/line-matching-game/line-matching-game';
import { PatientHome } from './components/patient-home/patient-home';
import { PatientTests } from './components/patient-tests/patient-tests';
import { PatientEditProfile } from './components/patient-edit-profile/patient-edit-profile';

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
    path: 'tests/groundtruth',
    component: MemoryRecallChat
  },
  {
    path: 'statistics/session/1', // 1 is session
    component: StatisticsSession
  },
    {
    path: 'doctor/patients/1', // 1 is doctor id
    component: DoctorHomepage
  },
      {
    path: 'sessions/patient/1', // 1 is patient id
    component: PatientSessions
  },
  {
    path: 'memorycardsgame', // 1 is patient id
    component: MemoryCardsGame
  },
    {
    path: 'wordsmatchinggame', // 1 is patient id
    component: WordsMatchingGame
  },
  {
    path: 'linematchinggame', // 1 is patient id
    component: LineMatchingGame
  },
  {
    path: 'patient/1', // 1 is patient id
    component: PatientHome
  },
  {
    path: 'patient/tests', // 1 is patient id
    component: PatientTests
  },
    {
    path: 'patient/1/edit', // 1 is patient id
    component: PatientEditProfile
  },
];

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
import { DoctorPovPatientStatistics } from './components/doctor-pov-patient-statistics/doctor-pov-patient-statistics';
import { Auth } from './components/auth/auth';
import { authGuard } from './guards/auth-guard';
import { UploadMemoryRecall } from './components/upload-memory-recall/upload-memory-recall';
import { DourememberServices } from './components/douremember-services/douremember-services';
import { DourememberAbout } from './components/douremember-about/douremember-about';
import { Signup } from './components/signup/signup';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'tests/memoryrecall/:id', // 1 is user
    component: MemoryRecall
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'tests/groundtruth/:id',
    component: MemoryRecallChat
  },
  {
    path: 'statistics/session/1', // 1 is session
    component: StatisticsSession
  },
    {
    path: 'doctor/:id/patients', // 1 is doctor id
    component: DoctorHomepage,
    canActivate: [authGuard]
  },
  {
    path: 'signup', // 1 is doctor id
    component: Signup,
  },
  {
    path: 'doctor/1/patient/1/statistics', // 1 is patient id
    component: DoctorPovPatientStatistics
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
    path: 'patient/:id', // 1 is patient id
    component: PatientHome
  },
  {
    path: 'patient/tests/alltests', // 1 is patient id
    component: PatientTests
  },
    {
    path: 'patient/1/edit', // 1 is patient id
    component: PatientEditProfile
  },
  {
    path: 'login', // 1 is patient id
    component: Auth
  },
    {
    path: 'patient/:id/uploadMemory', // 1 is patient id
    component: UploadMemoryRecall
  },
  {
    path: 'douremember/services', // 1 is patient id
    component: DourememberServices
  },
  {
    path: 'douremember/about', // 1 is patient id
    component: DourememberAbout
  },
];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
<<<<<<< HEAD
=======
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
>>>>>>> d08a9c7... init scaffold
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'system-agent',
    loadChildren: () => import('./system-agent/system-agent.module').then(m => m.SystemAgentModule)
  },
  {
    path: 'device-service',
    loadChildren: () => import('./device-service/device-service.module').then(m => m.DeviceServiceModule)
  },
  {
    path: 'core-data',
<<<<<<< HEAD
    loadChildren: () => import('./core-data/core-data.module').then(m => m.CoreDataModule),
=======
    loadChildren: () => import('./core-data/core-data.module').then(m => m.CoreDataModule)
>>>>>>> d08a9c7... init scaffold
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsModule)
  },
  {
    path: 'scheduler',
    loadChildren: () => import('./scheduler/scheduler.module').then(m => m.SchedulerModule)
  },
  {
    path: 'rule-engine',
    loadChildren: () => import('./rule-engine/rule-engine.module').then(m => m.RuleEngineModule)
  },
  {
    path: 'app-service',
    loadChildren: () => import('./app-service/app-service.module').then(m => m.AppServiceModule)
<<<<<<< HEAD
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
=======
  }

>>>>>>> d08a9c7... init scaffold
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

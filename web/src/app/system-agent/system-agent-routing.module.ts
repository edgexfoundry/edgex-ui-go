import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { ConfigComponent } from './config/config.component';
import { MetricsComponent } from './metrics/metrics.component';
import { SystemAgentComponent } from './system-agent.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  {
    path: '',
    component: SystemAgentComponent,
    children: [
      {
        path: '',
        redirectTo: 'service-list',
        pathMatch: 'full',
      },
      {
        path: 'service-list',
        component: ServiceListComponent,
      },
      {
        path: 'metric/:name',
        component: MetricsComponent,
      },
      {
        path: 'config/:name',
        component: ConfigComponent
      }
    ]
  }
];
=======

const routes: Routes = [];
>>>>>>> d08a9c7... init scaffold
=======
=======
import { ConfigComponent } from './config/config.component';
import { MetricsComponent } from './metrics/metrics.component';
>>>>>>> 727932f... Finished system agent module basic feature
import { SystemAgentComponent } from './system-agent.component';
import { ServiceListComponent } from './service-list/service-list.component';

const routes: Routes = [
  {
    path: '',
    component: SystemAgentComponent,
    children: [
      {
        path: '',
        redirectTo: 'service-list',
        pathMatch: 'full',
      },
      {
        path: 'service-list',
        component: ServiceListComponent,
      },
      {
        path: 'metric/:name',
        component: MetricsComponent,
      },
      {
        path: 'config/:name',
        component: ConfigComponent
      }
    ]
  }
];
>>>>>>> 65f645d... init router for each module, sidebar init

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAgentRoutingModule { }

import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddTaskComponent } from './pages/add-task/add-task.component';
import { FourQuadrantsComponent } from './pages/four-quadrants/four-quadrants.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { LayoutComponent } from './layout/layout.component';
import { isLoggedInGuardGuard } from './guards/is-logged-in-guard.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'layout',
    canActivate: [isLoggedInGuardGuard],
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add', component: AddTaskComponent },
      { path: 'levels', component: FourQuadrantsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'tasks', component: TasksListComponent },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // or 'layout/dashboard'
];

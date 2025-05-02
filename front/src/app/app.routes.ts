import { Routes } from '@angular/router';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';

export const routes: Routes = [
    // lazy loading
    { path: 'jobs/details/:id', loadComponent: () => import('./pages/job-details/job-details.component').then(m => m.JobDetailsComponent) },
    { path: 'login', loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
    { path: '', component: JobsListComponent },
];

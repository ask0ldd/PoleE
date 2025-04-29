import { Routes } from '@angular/router';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';

export const routes: Routes = [
    // lazy loading
    { path: 'jobs/details/:id', loadComponent: () => import('./pages/job-details/job-details.component').then(m => m.JobDetailsComponent) },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    { path: '', component: JobsListComponent },
];

import { Routes } from '@angular/router';
import { JobDetailsComponent } from './pages/job-details/job-details.component';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';

export const routes: Routes = [
    { path: 'jobs/details/:id', component: JobDetailsComponent },
    { path: '', component: JobsListComponent },
];

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { JobsAPIService } from '../../services/mocks/jobs-api.service';
import { take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import IJobOffer from '../../interfaces/jobsAPI/IJobOffer';
import { ThirdPartyTokenService } from '../../services/third-party-token.service';
import { JobItemComponent } from './job-item/job-item.component';
import { JobFilterBarComponent } from './job-filter-bar/job-filter-bar.component';
import { OptionalJobsAPIGetAllParams } from '../../interfaces/jobsAPI/requests/IJobsAPIGetAllParams';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { marked } from 'marked';

@Component({
  selector: 'app-jobs-list',
  imports: [JobItemComponent, JobFilterBarComponent, DrawerComponent],
  templateUrl: './jobs-list.component.html',
  styleUrl: './jobs-list.component.css'
})
export class JobsListComponent implements OnInit {

  drawerOpen = false
  jobsOffers! : IJobOffer[]
  activeJobOffer! : IJobOffer
  // searchParams : OptionalJobsAPIGetAllParams = {}
  // destroy$ = new Subject<void>
  private destroyRef = inject(DestroyRef)

  constructor(private jobsAPIService : JobsAPIService, private thirdPartyTokenService : ThirdPartyTokenService){ }

  fetchJobs(){
    this.jobsAPIService.getAll().pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
      // finalize(() => console.log('Observable fetch unsubscribed'))
      // takeUntil(this.destroy$)
    ).subscribe(
      offers => this.jobsOffers = offers/*.filter(offer => offer.description.toLowerCase().includes("typescript"))*/
    )
  }

  ngOnInit(): void {
    /*this.thirdPartyTokenService.token$.pipe(
      filter(token => !!token), // Only allows non-null/undefined tokens to go through
      take(1),
      takeUntilDestroyed(this.destroyRef)
      // takeUntil(this.destroy$)
    ).subscribe(() => this.fetchJobs());*/
    this.fetchJobs()
  }

  handleFilterBarParamsChange(value : OptionalJobsAPIGetAllParams){
    console.log("sent")
    console.log(JSON.stringify(value))
  }

  async toggleDrawer(jobId : string){
    const offer = this.jobsOffers.find(offer => offer.id == jobId)
    if(offer == null) return
    this.activeJobOffer = {...offer, description : await marked(offer.description.replaceAll("***", "\n\n"))}  
    this.drawerOpen = !this.drawerOpen
  }

  /*ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }*/
  
}

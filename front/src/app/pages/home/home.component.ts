import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobsAPIService } from '../../services/mocks/jobsAPI.service';
import { Subscription } from 'rxjs';
import IJobOffer from '../../interfaces/jobsAPI/IJobOffer';
import { TruncTitlePipe } from '../../pipes/trunc-title.pipe';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TruncTitlePipe, TitleCasePipe, LowerCasePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription! : Subscription
  jobsOffers! : IJobOffer[]

  constructor(private jobsAPIService : JobsAPIService){}
  ngOnInit(): void {
    this.subscription = this.jobsAPIService.getAll().subscribe(
      jobs => this.jobsOffers = jobs
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  
}

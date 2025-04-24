import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import IJobOffer from '../../../interfaces/jobsAPI/IJobOffer';
import { ToElapsedDaysPipe } from "../../../pipes/to-elapsed-days.pipe";
import { LowerCasePipe } from '@angular/common';
import { CapitalizeFirstLetterPipe } from '../../../pipes/capitalize-first-letter.pipe';
import { LlmService } from '../../../services/llm.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-offer',
  imports: [ToElapsedDaysPipe, LowerCasePipe, CapitalizeFirstLetterPipe],
  templateUrl: './job-offer.component.html',
  styleUrl: './job-offer.component.css'
})
export class JobOfferComponent implements OnInit, OnDestroy, OnChanges{
  @Input() jobOffer? : IJobOffer
  summarizedOffer : string = ""
  sub! : Subscription

  constructor(private llmService : LlmService){ }

  ngOnInit(){
    this.sub = this.llmService.output$.subscribe(gen => this.summarizedOffer = gen == "" ? "" : JSON.stringify(gen))
    if(this.jobOffer) this.llmService.generate(this.jobOffer.description)
  }

  ngOnChanges() {
    if(this.jobOffer) this.llmService.generate(this.jobOffer.description)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}

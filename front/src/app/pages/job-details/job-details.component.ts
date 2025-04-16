import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import IJobOffer from '../../interfaces/jobsAPI/IJobOffer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, of, switchMap, take } from 'rxjs';
import { LowerCasePipe } from '@angular/common';
import { ToElapsedDaysPipe } from '../../pipes/to-elapsed-days.pipe';
import { JobsAPIService } from '../../services/mocks/jobs-api.service';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize-first-letter.pipe';
import { marked } from "marked"

@Component({
  selector: 'app-job-details',
  imports: [LowerCasePipe, ToElapsedDaysPipe, CapitalizeFirstLetterPipe],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  @Input() id!: string
  jobOffer!: IJobOffer
  private destroyRef = inject(DestroyRef)

  constructor(private jobsAPIService : JobsAPIService){ }

  async ngOnInit() {
    let offer : IJobOffer
    this.jobsAPIService.getById(this.id).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
    )
    .pipe(switchMap(async (offer) => ({...offer, description : await marked(offer.description.replaceAll("***", "\n\n"))})))
    .subscribe(
      offer => this.jobOffer = offer
    )
  }
}

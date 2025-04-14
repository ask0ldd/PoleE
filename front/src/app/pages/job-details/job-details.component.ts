import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import IJobOffer from '../../interfaces/jobsAPI/IJobOffer';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { LowerCasePipe } from '@angular/common';
import { ToElapsedDaysPipe } from '../../pipes/to-elapsed-days.pipe';
import { JobsAPIService } from '../../services/mocks/jobs-api.service';
import { CapitalizeFirstLetterPipe } from '../../pipes/capitalize-first-letter.pipe';

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

  ngOnInit() {
    this.jobsAPIService.getById(this.id).pipe(
      take(1),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(
      job => this.jobOffer = job
    )
  }
}

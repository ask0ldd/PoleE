import { Component, Input } from '@angular/core';
import IJobOffer from '../../../interfaces/jobsAPI/IJobOffer';
import { ToElapsedDaysPipe } from "../../../pipes/to-elapsed-days.pipe";
import { LowerCasePipe } from '@angular/common';
import { CapitalizeFirstLetterPipe } from '../../../pipes/capitalize-first-letter.pipe';

@Component({
  selector: 'app-job-offer',
  imports: [ToElapsedDaysPipe, LowerCasePipe, CapitalizeFirstLetterPipe],
  templateUrl: './job-offer.component.html',
  styleUrl: './job-offer.component.css'
})
export class JobOfferComponent {
  @Input() jobOffer? : IJobOffer
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import IJobOffer from '../../../interfaces/jobsAPI/IJobOffer';
import { LowerCasePipe } from '@angular/common';
import { CapitalizeFirstLetterPipe } from '../../../pipes/capitalize-first-letter.pipe';
import { ToElapsedDaysPipe } from '../../../pipes/to-elapsed-days.pipe';
import { TruncTitlePipe } from '../../../pipes/trunc-title.pipe';
import { SalaryParsingPipe } from '../../../pipes/salary-parsing.pipe';

@Component({
  selector: 'app-job-item',
  imports: [TruncTitlePipe, LowerCasePipe, ToElapsedDaysPipe, CapitalizeFirstLetterPipe, SalaryParsingPipe],
  templateUrl: './job-item.component.html',
  styleUrl: './job-item.component.css'
})
export class JobItemComponent {
  @Input() jobOffer! : IJobOffer
  @Output() emitJob = new EventEmitter<string>()

  emitActiveJobId(){
    this.emitJob.emit(this.jobOffer.id)
  }
}

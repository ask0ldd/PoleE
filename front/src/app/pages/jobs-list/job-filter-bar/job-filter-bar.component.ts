import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OptionalJobsAPIGetAllParams } from '../../../interfaces/jobsAPI/requests/IJobsAPIGetAllParams';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-filter-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './job-filter-bar.component.html',
  styleUrl: './job-filter-bar.component.css'
})
export class JobFilterBarComponent {

  @Input() filterParams : OptionalJobsAPIGetAllParams = {}
  @Output() filterParamsChange = new EventEmitter<OptionalJobsAPIGetAllParams>()

  searchForm = new FormGroup({
    contrat: new FormControl('Contrat'),
  })

  handleSearchClick(){
    this.filterParamsChange.emit(this.filterParams)
    console.log(this.searchForm.value.contrat)
  }
}

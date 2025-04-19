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

  // @Input() filterParams : OptionalJobsAPIGetAllParams = {}
  @Output() filterParamsChange = new EventEmitter<OptionalJobsAPIGetAllParams>()

  searchForm = new FormGroup({
    typeContrat: new FormControl(defaultFormValues.typeContrat, { nonNullable: true }),
    domaine: new FormControl(defaultFormValues.domaine, { nonNullable: true }),
  })

  private excludeNullProperties(formValue: Partial<JobSearchFormValues>): OptionalJobsAPIGetAllParams {
    const cleanedForm: Partial<JobSearchFormValues> = { ...formValue };
    
    (Object.keys(cleanedForm) as Array<keyof JobSearchFormValues>).forEach(key => {
      if (cleanedForm[key] === defaultFormValues[key]) {
        delete cleanedForm[key];
      }
    })

    return cleanedForm as OptionalJobsAPIGetAllParams
  }

  handleSearchClick(){
    const noNullPropertiesForm = this.excludeNullProperties(this.searchForm.getRawValue())
    this.filterParamsChange.emit(noNullPropertiesForm)
    // console.log(this.searchForm.value.typeContrat)
  }
}

interface JobSearchFormValues {
  typeContrat: string
  domaine : string
}

const defaultFormValues : JobSearchFormValues = {
  typeContrat : 'Contrat',
  domaine : 'Domaine Pro.'
}
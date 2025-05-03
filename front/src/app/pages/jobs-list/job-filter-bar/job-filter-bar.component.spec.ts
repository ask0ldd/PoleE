import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFilterBarComponent } from './job-filter-bar.component';

describe('JobFilterBarComponent', () => {
  let component: JobFilterBarComponent;
  let fixture: ComponentFixture<JobFilterBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobFilterBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

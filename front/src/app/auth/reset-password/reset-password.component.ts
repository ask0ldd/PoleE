import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  resetForm = new FormGroup({
    username: new FormControl("", { nonNullable: true }),
    email:  new FormControl("", { nonNullable: true }),
  })

  error : string | null = null

  handleReset(){

  }
}

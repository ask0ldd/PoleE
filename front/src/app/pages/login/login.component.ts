import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl("maria", { nonNullable: true }),
    password: new FormControl("guess", { nonNullable: true }),
  })

  constructor(private authService : AuthService) {}

  handleLogin(){
    const username = this.loginForm.get("username")?.value
    const password = this.loginForm.get("password")?.value
    if(!username || !password) return
    this.authService.login({username, password}).subscribe({
      next: token => console.log(token),
      error: err => {
        if (err.status === 401) {
          console.error('Invalid credentials');
        } else if (err.status === 0) {
          console.error('Network error: Unable to reach server');
        } else {
          console.error('Login failed:', err.message);
        }
      }
    })
  }
}

interface loginFormValues {
  username: string
  password : string
}
import { Component, } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [HeaderComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl("maria", { nonNullable: true }),
    password: new FormControl("guess", { nonNullable: true }),
  })
  
  error : string | null = null

  constructor(private authService : AuthService, private router: Router) {}

  handleLogin(){
    const username = this.loginForm.get("username")?.value
    const password = this.loginForm.get("password")?.value
    if(!username || !password) return
    this.authService.login({username, password}).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => this.handleLoginError(err)
    })
  }

  handleLoginError(err : HttpErrorResponse){
    let errorMessage = ""
    switch(err.status){
      case 401 : 
        errorMessage = 'Invalid credentials'
        this.error = errorMessage
        console.log()
        return console.error(errorMessage)
      case 0 : 
        errorMessage = 'Invalid credentials'
        this.error = errorMessage
        return console.error(errorMessage)
      default :
        errorMessage = 'Login failed:' + err.message
        this.error = errorMessage
        return console.error(errorMessage)
    }
  }
}
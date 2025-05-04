import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm = new FormGroup({
    username: new FormControl("maria", { nonNullable: true }),
    email:  new FormControl("maria@maria.com", { nonNullable: true }),
    password: new FormControl("guess", { nonNullable: true }),
    passwordVerif: new FormControl("guess", { nonNullable: true }),
  })

  error : string | null = null

  constructor(private authService : AuthService, private router: Router) {}

  handleRegister(){
    const username = this.registerForm.get("username")?.value
    const email = this.registerForm.get("email")?.value
    const password = this.registerForm.get("password")?.value
    const passwordVerif = this.registerForm.get("passwordVerif")?.value

    if(!username || !password || !passwordVerif || !email) return
    if(!this.validateEmail(email)) return
    if(password != passwordVerif) return

    this.authService.register({username, email, password}).subscribe({
      error: (err) => console.error(err)
    })
  }

  validateEmail(email : string) : email is `${string}@${string}.${string}`{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }
}

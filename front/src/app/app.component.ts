import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";
import { JobsAPIService } from './services/mocks/jobsAPI.service';
import { CookiesService } from './services/cookies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'polefront';
  // allows us to use HomeComponent within app.component.html
  @ViewChild(HomeComponent) homeComponent! : HomeComponent

  subscription! : Subscription

  constructor(private jobsAPI: JobsAPIService, private cookiesService : CookiesService){ }

  ngOnInit(): void {
    // retrieve the user id from the claims into the jwt
    this.subscription = this.jobsAPI.getAccessToken().subscribe(token => {
      if(!token) return console.log("Can't retrieve the job API token.")
      this.cookiesService.saveToken(token)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}

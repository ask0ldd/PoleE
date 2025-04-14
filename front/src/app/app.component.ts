import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobsAPIService } from './services/mocks/jobs-api.service';
import { ThirdPartyTokenService } from './services/third-party-token.service';
import { Subscription, take } from 'rxjs';
import { JobsListComponent } from './pages/jobs-list/jobs-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent/* implements OnInit, OnDestroy*/{
  title = 'polefront';
  // allows us to use JobsListComponent within app.component.html
  @ViewChild(JobsListComponent) jobsListComponent! : JobsListComponent

  subscription! : Subscription

  constructor(private jobsAPI: JobsAPIService, private thirdPartyTokenService : ThirdPartyTokenService){ }

  ngOnInit(): void {
    // retrieve the user id from the claims into the jwt
    /*this.subscription = this.thirdPartyTokenService.fetchAccessToken().pipe(take(1)).subscribe(token => {
      if(!token) return console.log("Can't retrieve the job API token.")
      this.thirdPartyTokenService.setToken(token)
    })*/
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe()
  }
}

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./pages/home/home.component";

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

  ngOnInit(): void {
    // retrieve the user id from the claims into the jwt
    
  }

  ngOnDestroy(): void {
   
  }
}

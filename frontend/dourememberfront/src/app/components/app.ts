import { SharingData } from './../services/sharing-data-service';
import { Component, signal } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar],
  templateUrl: './app.html'
})

export class App {

  constructor(private readonly SharingData: SharingData){
    this.handlerLogin()
  }

  handlerLogin(){
    this.SharingData.handlerLoginEventEmitter.subscribe(({username, password}) => {console.log({username, password})})
  }

}

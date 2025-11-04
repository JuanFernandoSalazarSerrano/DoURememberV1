import { SharingData } from './../../services/sharing-data-service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.html'})

export class Auth {

  user!: User;

  constructor(private toastr: ToastrService, private SharingDataService: SharingData){
    this.user = new User();
  }

  onSubmit(){
    if(!this.user.username || !this.user.password){
      this.showLoginError()}

    else{
      this.SharingDataService.handlerLoginEventEmitter.emit({username: this.user.username, password: this.user.password})
    }
  }

  showLoginError() {
  this.toastr.error('Login error', 'Username and password required');}
}

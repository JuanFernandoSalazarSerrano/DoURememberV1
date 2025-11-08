import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsService } from './../../services/patientsService';
import { Auth } from '../../services/auth';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html'
})
export class Navbar {

  userId!: number | null;

  constructor(private readonly PatientsService: PatientsService, private readonly auth: Auth){
    this.userId = this.PatientsService.getUserId()
  }

  getAdmin(){
    return this.auth.isAdmin()
  }

}

import { Router } from '@angular/router';
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

  constructor(private readonly PatientsService: PatientsService, private readonly auth: Auth, private readonly router: Router){
    this.userId = this.PatientsService.getUserId()
  }

  getAdmin(){
    return this.auth.isAdmin()
  }

  isAuth(){
    return this.auth.authenticated()
  }

  handlerLogout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }

}

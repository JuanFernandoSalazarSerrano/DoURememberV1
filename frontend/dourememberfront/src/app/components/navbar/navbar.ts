import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsService } from './../../services/patientsService';

@Component({
  selector: 'navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html'
})
export class Navbar {

  userId!: number | null;

  constructor(private readonly PatientsService: PatientsService){
    this.userId = this.PatientsService.getUserId()
  }

}

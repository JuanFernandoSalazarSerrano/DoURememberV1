import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsService } from './../../services/patientsService';

@Component({
  selector: 'patient-edit-profile',
  imports: [RouterModule],
  templateUrl: './patient-edit-profile.html',
})
export class PatientEditProfile {

  userId: number | null = 0;

  constructor(private readonly PatientsService: PatientsService){
  this.userId = this.PatientsService.getUserId();
  }
}


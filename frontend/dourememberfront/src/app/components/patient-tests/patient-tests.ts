import { RouterModule } from '@angular/router';
import { PatientsService } from './../../services/patientsService';
import { Component } from '@angular/core';


@Component({
  selector: 'patient-tests',
  imports: [RouterModule],
  templateUrl: './patient-tests.html'
})
export class PatientTests {

  userId!: number | null;

  constructor(private readonly PatientsService: PatientsService){
    this.userId = this.PatientsService.getUserId()
  }

}

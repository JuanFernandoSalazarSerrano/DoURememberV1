import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsService } from '../../services/patientsService';

@Component({
  selector: 'individual-session',
  imports: [RouterModule],
  templateUrl: './individual-session.html'})

export class IndividualSession {

  @Input() index!: number;

  @Input() userId!: number | null;

  doctorId! :number | null;

    constructor(private readonly patientService: PatientsService){
      this.doctorId = this.patientService.getUserId()
    }
}

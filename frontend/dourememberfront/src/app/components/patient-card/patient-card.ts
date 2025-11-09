import { Component, Input } from '@angular/core';
import { User } from '../../models/User';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'patient-card',
  imports: [RouterModule],
  templateUrl: './patient-card.html',
})
export class PatientCard {

  @Input() patient!: User;

  @Input() userId!: number | null;

}

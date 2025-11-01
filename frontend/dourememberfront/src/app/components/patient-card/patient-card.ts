import { Component, Input } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'patient-card',
  imports: [],
  templateUrl: './patient-card.html',
})
export class PatientCard {

  @Input() patient!: User;

}

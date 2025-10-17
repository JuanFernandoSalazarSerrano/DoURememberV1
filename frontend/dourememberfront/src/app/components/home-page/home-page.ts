import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { AppointmentSection } from '../appointment-section/appointment-section';
import { Feelings } from '../feelings/feelings';


@Component({
  selector: 'home-page',
  imports: [Hero,Feelings,AppointmentSection],
  templateUrl: './home-page.html'
})
export class HomePage {

}

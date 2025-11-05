import { Component, signal } from '@angular/core';
import { User } from '../../models/User';
import { PatientCard } from '../patient-card/patient-card';
import { PatientsService } from '../../services/patientsService';

@Component({
  selector: 'doctor-homepage',
  imports: [PatientCard],
  templateUrl: './doctor-homepage.html',
})

export class DoctorHomepage {

  patients = signal<User[]>([]);

  doctor!: string;

  // constructor(private readonly patientsService: PatientsService){
  //   this.patientsService.findAll().subscribe(allPatients => {
  //     this.patients.set(allPatients)
  //   })

  //   // TODO doctor name from role in db extract it from the patients (its bad ik)

  //   this.doctor = 'Rafel'
  // }

}

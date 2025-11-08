import { PatientsService } from './../../services/patientsService';
import { ServiceDoctors } from './../../services/service-doctors';
import { Component, signal } from '@angular/core';
import { User } from '../../models/User';
import { PatientCard } from '../patient-card/patient-card';

@Component({
  selector: 'doctor-homepage',
  imports: [PatientCard],
  templateUrl: './doctor-homepage.html',
})

export class DoctorHomepage {

  patients = signal<User[]>([]);

  userId: number | null = 0

  constructor(private readonly ServiceDoctors: ServiceDoctors, private readonly PatientsService: PatientsService){
    this.userId = this.PatientsService.getUserId();
    this.getAllPatients()
  }

  getAllPatients(){
    this.ServiceDoctors.getAllDoctorPatients(this.userId).subscribe(allDoctorPatients => {
      this.patients.set(allDoctorPatients)
    })
  }

}

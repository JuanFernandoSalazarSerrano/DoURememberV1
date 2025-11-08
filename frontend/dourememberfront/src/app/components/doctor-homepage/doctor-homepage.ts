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

  doctorInfo!: User;

  userId: number | null = 0;

  doctorName: string = 'Mr. Memory';

  doctorImage: string | null = null;

  constructor(private readonly ServiceDoctors: ServiceDoctors, private readonly PatientsService: PatientsService){
    this.userId = this.PatientsService.getUserId();
    this.PatientsService.getAllUserInformation(this.userId).subscribe(userInfo => {
      this.doctorInfo = userInfo
      this.doctorName = this.doctorInfo.name
      this.doctorImage = this.doctorInfo.profilepicture
    })
    this.getAllPatients()
  }

  getAllPatients(){
    this.ServiceDoctors.getAllDoctorPatients(this.userId).subscribe(allDoctorPatients => {
      this.patients.set(allDoctorPatients)
    })
  }

}

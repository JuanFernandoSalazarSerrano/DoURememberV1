import { Component } from '@angular/core';
import { PatientsService } from './../../services/patientsService';
import { Router, RouterModule } from '@angular/router';
import { User } from "../../models/User"
import { Doctor } from "../../models/Doctor"
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { delay } from 'rxjs/operators';


@Component({
  selector: 'create-doctor',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './create-doctor.html',
})

export class CreateDoctor {

  user: User;

  constructor(private readonly patientsService: PatientsService, private readonly router: Router){
      this.user = new User();
  }

  onSubmit(): void {

    const { id, ...userWithoutId } = this.user;

    //1 create user


    this.patientsService.createPatient(userWithoutId as User)
      .pipe(delay(2000))
      .subscribe(() => {
        // 2 make user a doctor
        this.patientsService.createDoctor()
          .subscribe(() => {
            // 3 create doctor with data from user and add to doctors list
            const doctor = new Doctor();

            // fill the doctor instance with data from the created user
            doctor.doctorname = 'Dr. ' + this.user.name + ' ' + this.user.lastname;
            doctor.doctorlocation = this.user.medical_condition;
            doctor.doctorspecialties = this.user.carer;
            doctor.doctoremail = this.user.email;

            // remove id after assigning the fields so the object we send contains the updated values
            const { id, ...doctorWithoutId } = doctor;

            this.patientsService.createNewDoctor(doctorWithoutId as Doctor)
              .subscribe(_ => { this.router.navigate([`/login`]); });
          })
      })

  }

}

import { PatientsService } from './../../services/patientsService';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from "../../models/User"
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { Doctor } from '../../models/Doctor';


@Component({
  selector: 'signup',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.html'
})
export class Signup {

  user: User;

  constructor(private readonly patientsService: PatientsService, private readonly router: Router){
      this.user = new User();
  }

  onSubmit(): void {
    const { id, ...userWithoutId } = this.user;

    this.patientsService.createPatient(userWithoutId as User).subscribe(_ => {
      // wait 2 seconds, then create a new doctor (without id) and navigate after it's created
      setTimeout(() => {
        const doctor = new Doctor();
        // ensure there's no id in the body we send
        if ((doctor as any).id !== undefined) {
          delete (doctor as any).id;
        }

        this.patientsService.createNewDoctor(doctor).subscribe(
          () => {
            this.router.navigate([`/login`]);
          },
          () => {
            // on error, still navigate to login (adjust behavior if needed)
            this.router.navigate([`/login`]);
          }
        );
      }, 2000);
    });
  }

}

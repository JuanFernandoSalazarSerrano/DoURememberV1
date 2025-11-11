import { Component } from '@angular/core';
import { PatientsService } from './../../services/patientsService';
import { Router, RouterModule } from '@angular/router';
import { User } from "../../models/User"
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"


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
    this.patientsService.createPatient(userWithoutId as User).subscribe(_ => {this.router.navigate([`/login`]);}
    )
  }

}

import { Component, OnInit, signal } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { PatientsService } from './../../services/patientsService';
import { User } from '../../models/User';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'patient-edit-profile',
  imports: [RouterModule, FormsModule],
  templateUrl: './patient-edit-profile.html',
})
export class PatientEditProfile implements OnInit {

  userId: number | null = 0;

  dataOfUserToEdit = signal<User>({
      id: 0,
      profilepicture: '',
      name: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      role: '',
      medical_condition: '',
      carer: '',
      doctor : {id: 2 }
    })

  constructor(private readonly PatientsService: PatientsService, private readonly router: Router){
  this.userId = this.PatientsService.getUserId();
  }

  ngOnInit(): void {
  this.findUserById(this.userId);
  }

  findUserById(id : number | null){
  this.PatientsService.getAllUserInformation(id).subscribe(userInfo => {
  this.dataOfUserToEdit.set(userInfo)
      }
    )
  }

    onSubmit(): void {
    // Create new user (no id)

    this.PatientsService.updatePatient(this.dataOfUserToEdit()).subscribe();
    this.router.navigate([`/patient/${this.userId}`]);
  }
}


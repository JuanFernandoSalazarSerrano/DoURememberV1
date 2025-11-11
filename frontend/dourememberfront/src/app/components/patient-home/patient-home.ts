import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientsService } from './../../services/patientsService';
import { User } from '../../models/User';


@Component({
  selector: 'patient-home',
  imports: [RouterModule],
  templateUrl: './patient-home.html',
})
export class PatientHome implements OnInit{

    userId!: number | null;

    user = signal<User>({
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

    constructor(private readonly PatientsService: PatientsService){
    this.userId = this.PatientsService.getUserId()
    this.findUserById(this.userId);
  }

  ngOnInit(): void {
    this.findUserById(this.userId);
  }

  findUserById(id : number | null){
    this.PatientsService.getAllUserInformation(id).subscribe(userInfo => {
    this.user.set(userInfo)
      }
    )
  }
}

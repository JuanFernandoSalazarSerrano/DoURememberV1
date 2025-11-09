import { PatientsService } from './../../services/patientsService';
import { Component, OnInit, signal } from '@angular/core';
import { IndividualSession } from '../individual-session/individual-session';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'patient-sessions',
  imports: [IndividualSession],
  templateUrl: './patient-sessions.html'
})
export class PatientSessions implements OnInit{

  totalNumberOfPages = signal<number>(20);

  userId!: number | null;

  patient = signal<User>({
    id: null,
    profilepicture: '',
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    role: '',
    condition: '',
    carer: ''
  })

  constructor(private readonly patientService: PatientsService, private readonly route: ActivatedRoute){}


  ngOnInit(): void {

    if (this.totalNumberOfPages() === null || this.totalNumberOfPages() === undefined || this.totalNumberOfPages() === 20){

        this.route.paramMap.subscribe(params => {

        this.userId = +(params.get('id') || 0);

        console.log(this.userId)

        this.patientService.getAllUserInformation(this.userId).subscribe(patient => this.patient.set(patient))

        this.patientService.getAllUserSessionsById(this.userId).subscribe(pageable => {
          console.log(pageable)
          this.totalNumberOfPages.set(pageable.totalPages)

        })
      })
    }
  }
}

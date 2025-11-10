import { PatientsService } from './../../services/patientsService';
import { Component, OnInit, signal } from '@angular/core';
import { IndividualSession } from '../individual-session/individual-session';
import { User } from '../../models/User';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'patient-sessions',
  imports: [IndividualSession, RouterModule],
  templateUrl: './patient-sessions.html'
})
export class PatientSessions implements OnInit{

  totalNumberOfPages = signal<number>(1);

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

    if (this.totalNumberOfPages() === null || this.totalNumberOfPages() === undefined || this.totalNumberOfPages() === 1){

        this.route.paramMap.subscribe(params => {

        this.userId = +(params.get('id') || 0);

        this.patientService.getAllUserInformation(this.userId).subscribe(patient => this.patient.set(patient))

        this.patientService.findAllUserSessionsByUserIdPage(this.userId, 0).subscribe(pageable => {
          this.totalNumberOfPages.set(pageable.totalPages)
        })
      })
    }
  }
}

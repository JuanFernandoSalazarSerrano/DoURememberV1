import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { User } from '../models/User';
import { testUsers } from '../data/patients.data';

@Injectable({
  providedIn: 'root'
})

export class PatientsService{

  findAll(): Observable<User[]> {
    return of(testUsers);
  }
}

import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Doctor } from '../models/Doctor';

@Injectable({
  providedIn: 'root'
})

export class PatientsService{

  empty = 'nobody28'

  private readonly url: string = 'http://localhost:8080/api/v1/users'
    constructor(private readonly http: HttpClient){}

  getAllUserInformation(id: number | null): Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  createPatient(user: User): Observable<User>{
    console.log('1')
    return this.http.post<User>(this.url, user);
  }

    createDoctor(): Observable<any>{
    console.log('2')
    return this.http.post(`${this.url}/createDoctor`, this.empty);
  }



  getUserId(): number | null {
  const token = sessionStorage.getItem("token"); // 0. retrieve token
  if (!token) return null;

  const payloadBase64 = token.split(".")[1]; // part after first dot
  if (!payloadBase64) return null;

  // 1. decode Base64URL → 2. JSON
  const json = JSON.parse(
    atob(payloadBase64.replace(/-/g, "+").replace(/_/g, "/"))
  );

  // 3. get id
  return json.id ?? null;
}

  findAllUserSessionsByUserIdPage(userId: number, page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/findAllByUserId/${userId}/sessions/${page}`);
  }

  getAllUserSessionsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/getAllUserSessionsById/${id}`);
  }

  createNewDoctor(doctor: Doctor): Observable<Doctor> {
    console.log('3')
    return this.http.post<Doctor>(`${this.url}/createNewDoctor`, doctor);
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.url}/doctors`);
  }

}

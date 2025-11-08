import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServiceDoctors {

    private readonly url: string = 'http://localhost:8080/api/v1/users'
    constructor(private readonly http: HttpClient){}

    getAllDoctorPatients(id: number | null): Observable<any>{
    return this.http.get<any>(`${this.url}/getAllDoctorPatients/${id}`)
  }

}

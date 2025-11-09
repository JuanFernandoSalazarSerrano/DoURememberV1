import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PatientsService{

  private readonly url: string = 'http://localhost:8080/api/v1/users'
    constructor(private readonly http: HttpClient){}

  getAllUserInformation(id: number | null): Observable<any>{
    return this.http.get<any>(`${this.url}/${id}`)
  }

  getAllUserSessionsById(id: number | null): Observable<any>{
    return this.http.get<any>(`${this.url}/findAllByUserId/${id}/sessions/0`)
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

}

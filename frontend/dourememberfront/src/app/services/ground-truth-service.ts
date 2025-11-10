import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroundTruthService {

  private readonly url: string = 'http://localhost:8080/api/v1/groundtruth/sendUserAnswer'

  constructor(private readonly http: HttpClient){}

  sendUserAnswerToAiGroundTruthTest(userAnswer: string): Observable<string>{
    const body = { id: 1, userAnswer };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<string>(this.url, body, { headers });
  }
}

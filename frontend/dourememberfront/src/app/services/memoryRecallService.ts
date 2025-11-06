import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { MemoryRecallModel } from '../models/MemoryRecallModel';
import { HttpClient } from '@angular/common/http';
import { MemoryRecall } from '../components/memory-recall/memory-recall';

@Injectable({
  providedIn: 'root'
})

export class MemoryRecallService{

    private readonly url: string = 'http://localhost:8080/api/v1/users'
    constructor(private readonly http: HttpClient){}

    getAllUserMemoryRecalls(id: number | null): Observable<any>{
    return this.http.get<any>(`${this.url}/getAllUserMemoryRecalls/${id}`)
  }

    createMemoryRecall(memory: MemoryRecallModel): Observable<MemoryRecallModel>{
    return this.http.post<MemoryRecallModel>(`${this.url}/createMemoryRecall`,memory);
  }

}

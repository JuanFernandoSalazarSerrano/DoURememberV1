import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs';
import { MemoryRecallModel } from '../models/MemoryRecallModel';
import { memoryRecalls } from '../data/memoryrecall.data';

@Injectable({
  providedIn: 'root'
})

export class MemoryRecallService{

  findAll(): Observable<MemoryRecallModel[]> {
    return of(memoryRecalls);
  }
}

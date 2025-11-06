import { Component, OnInit } from '@angular/core';
import { TestMemoryRecallCard } from '../test-memory-recall/test-memory-recall-card';
import { MemoryRecallService } from '../../services/memoryRecallService';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';
import { PatientsService } from './../../services/patientsService';

@Component({
  selector: 'memory-recall',
  imports: [TestMemoryRecallCard, RouterModule],
  templateUrl: './memory-recall.html'
})

export class MemoryRecall implements OnInit {

memoryRecallsList = signal<MemoryRecallModel[]>([]);

userId!: number | null;


  constructor(
    private readonly PatientsService: PatientsService,
    private readonly serviceMemoryRecalls: MemoryRecallService,
    private readonly route: ActivatedRoute
  ){this.userId = this.PatientsService.getUserId()}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const user_id = +(params.get('id') || 0);

      console.log(user_id)

          this.serviceMemoryRecalls.getAllUserMemoryRecalls(user_id).subscribe(memoryRecallsOfuser => {
            console.log(memoryRecallsOfuser, 'xd')
            this.memoryRecallsList.set(memoryRecallsOfuser)
            console.log(this.memoryRecallsList(), 'xd2')
            })
          })
        }
}

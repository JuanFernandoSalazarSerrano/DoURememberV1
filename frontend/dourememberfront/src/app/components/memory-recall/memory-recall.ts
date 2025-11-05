import { Component, OnInit } from '@angular/core';
import { TestMemoryRecallCard } from '../test-memory-recall/test-memory-recall-card';
import { MemoryRecallService } from '../../services/memoryRecallService';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { ActivatedRoute, Router } from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'memory-recall',
  imports: [TestMemoryRecallCard],
  templateUrl: './memory-recall.html'
})

export class MemoryRecall implements OnInit {

memoryRecallsList = signal<MemoryRecallModel[]>([]);
  constructor(
    private readonly serviceMemoryRecalls: MemoryRecallService,
    private readonly route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      const user_id = +(params.get('id') || 0);

          this.serviceMemoryRecalls.getAllUserMemoryRecalls(user_id).subscribe(memoryRecallsOfuser => {
            console.log(memoryRecallsOfuser, 'xd')
            this.memoryRecallsList.set(memoryRecallsOfuser)
            console.log(this.memoryRecallsList(), 'xd2')
            })
          })
        }
}

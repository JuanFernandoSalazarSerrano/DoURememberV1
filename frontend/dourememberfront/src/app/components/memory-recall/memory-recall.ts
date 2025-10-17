import { Component, OnInit } from '@angular/core';
import { TestMemoryRecallCard } from '../test-memory-recall/test-memory-recall-card';
import { MemoryRecallService } from '../../services/memoryRecallService';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';

@Component({
  selector: 'memory-recall',
  imports: [TestMemoryRecallCard],
  templateUrl: './memory-recall.html'
})

export class MemoryRecall implements OnInit {

  memoryRecallsList!: MemoryRecallModel[];

  constructor(private readonly service: MemoryRecallService){}

  ngOnInit(): void {
    this.service.findAll().subscribe(memoryRecalls =>
      {this.memoryRecallsList = memoryRecalls}
    )
  }
}

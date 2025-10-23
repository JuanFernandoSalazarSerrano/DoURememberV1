import { Component, Input } from '@angular/core';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';

@Component({
  selector: 'memory-recall-in-chat',
  imports: [],
  templateUrl: './memory-recall-in-chat.html'
})
export class MemoryRecallInChat {

  @Input() memoryRecall!: MemoryRecallModel;

}

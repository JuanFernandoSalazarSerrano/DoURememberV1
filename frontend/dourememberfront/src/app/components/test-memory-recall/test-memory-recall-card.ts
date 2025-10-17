import { MemoryRecallPrestartModal } from '../memory-recall-prestart-modal/memory-recall-prestart-modal';
import { MemoryRecallModel } from './../../models/MemoryRecallModel';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'test-memory-recall',
  imports: [MemoryRecallPrestartModal],
  templateUrl: './test-memory-recall-card.html'
})
export class TestMemoryRecallCard {

  @Input() TestMemoryRecall!: MemoryRecallModel;


  showMemoryRecallModal: boolean = false;


  openMemoryRecallModal(){
    this.showMemoryRecallModal = !this.showMemoryRecallModal
  }

}

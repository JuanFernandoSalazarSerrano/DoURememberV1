import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-memory-recall-prestart-modal',
  imports: [CommonModule, RouterModule],
  templateUrl: './memory-recall-prestart-modal.html'})

export class MemoryRecallPrestartModal {

  @Input() memoryRecall!: MemoryRecallModel;


  @Output() closeModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  closeMemoryRecallModal(){
    this.closeModalEventEmitter.emit(false)
  }
}

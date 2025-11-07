import { MemoryRecallService } from './../../services/memoryRecallService';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { CommonModule } from '@angular/common';
import { PatientsService } from './../../services/patientsService';
import { RouterModule } from '@angular/router';
import { SharingData } from './../../services/sharing-data-service';


@Component({
  selector: 'app-memory-recall-prestart-modal',
  imports: [CommonModule, RouterModule],
  templateUrl: './memory-recall-prestart-modal.html'})

export class MemoryRecallPrestartModal {

  @Input() memoryRecall!: MemoryRecallModel;

  userId!: number | null;

  openInvite: boolean = false;

  constructor(private readonly PatientsService: PatientsService, private readonly MemoryRecallService: MemoryRecallService, private readonly SharingData: SharingData){
    this.userId = this.PatientsService.getUserId()
  }

  @Output() closeModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  closeMemoryRecallModal(){
    this.closeModalEventEmitter.emit()
  }

  @Output() openModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  openInviteMemoryRecall(){
    this.openModalEventEmitter.emit()
  }

  async deleteMemoryRecall(){
    this.MemoryRecallService.deleteMemoryRecall(this.memoryRecall.memoryrecallid).subscribe();
    await new Promise(resolve => setTimeout(resolve, 100));
    this.closeModalEventEmitter.emit()
    this.SharingData.CloseModalEventEmitter.emit()
  }

}

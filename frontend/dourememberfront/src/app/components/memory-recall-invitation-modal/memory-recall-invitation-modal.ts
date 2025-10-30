import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'memory-recall-invitation-modal',
  imports: [],
  templateUrl: './memory-recall-invitation-modal.html'
})
export class MemoryRecallInvitationModal {

  @Output() openModalEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  openInviteMemoryRecall(){
    this.openModalEventEmitter.emit()
  }

}

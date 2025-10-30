import { MemoryRecallPrestartModal } from '../memory-recall-prestart-modal/memory-recall-prestart-modal';
import { MemoryRecallModel } from './../../models/MemoryRecallModel';
import { Component, Input } from '@angular/core';
import { MemoryRecallInvitationModal } from '../memory-recall-invitation-modal/memory-recall-invitation-modal';


@Component({
  selector: 'test-memory-recall',
  imports: [MemoryRecallPrestartModal, MemoryRecallInvitationModal],
  templateUrl: './test-memory-recall-card.html'
})
export class TestMemoryRecallCard {

  @Input() TestMemoryRecall!: MemoryRecallModel;

  showMemoryRecallModal: boolean = false;

  openInvite: boolean = false;

  openMemoryRecallModal(){
    this.showMemoryRecallModal = !this.showMemoryRecallModal

  }
  openInviteMemoryRecall(){
    this.openInvite = !this.openInvite
    console.log(this.openInvite)
  }
}

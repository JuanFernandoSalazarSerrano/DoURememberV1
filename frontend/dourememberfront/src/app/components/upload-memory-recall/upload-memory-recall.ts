import { MemoryRecallService } from './../../services/memoryRecallService';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { Component, signal } from '@angular/core';
import { PatientsService } from './../../services/patientsService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'upload-memory-recall',
  imports: [FormsModule],
  templateUrl: './upload-memory-recall.html'

})

// USER ID PROBLEMS
export class UploadMemoryRecall {

    userId!: number | null;

    memoryRecall = new MemoryRecallModel();

  constructor(private readonly memoryRecallService: MemoryRecallService, private readonly PatientsService: PatientsService){
    this.userId = this.PatientsService.getUserId()
    this.memoryRecall.user.id = this.userId
}

  onSubmit(): void {


    const {memoryrecallid, ...memoryRecallwithoutId} = this.memoryRecall

    this.memoryRecallService.createMemoryRecall(memoryRecallwithoutId as MemoryRecallModel)
      .subscribe({
        next: (saved) => console.log('Saved:', saved),
        error: (err) => console.error(err)
      });

    console.log(this.memoryRecall);
  }
}

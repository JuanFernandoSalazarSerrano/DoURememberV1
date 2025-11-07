import { MemoryRecallService } from './../../services/memoryRecallService';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { Component } from '@angular/core';
import { PatientsService } from './../../services/patientsService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'upload-memory-recall',
  imports: [FormsModule],
  templateUrl: './upload-memory-recall.html'

})

// USER ID PROBLEMS
export class UploadMemoryRecall {

    userId!: number | null;

    memoryRecall = new MemoryRecallModel();

  constructor(private readonly memoryRecallService: MemoryRecallService, private readonly PatientsService: PatientsService, private router: Router){
    this.userId = this.PatientsService.getUserId()
    this.memoryRecall.user.id = this.userId
}

  async onSubmit(): Promise<void> {

    const {memoryrecallid, ...memoryRecallwithoutId} = this.memoryRecall

    this.memoryRecallService.createMemoryRecall(memoryRecallwithoutId as MemoryRecallModel)
      .subscribe({
        next: (saved) => console.log('Saved:', saved),
        error: (err) => console.error(err)
      });

    console.log(this.memoryRecall);

    await new Promise(resolve => setTimeout(resolve, 100));
    this.router.navigate([`/tests/memoryrecall/${this.userId}`]);
  }
}

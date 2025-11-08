import { SharingData } from './../../services/sharing-data-service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TestMemoryRecallCard } from '../test-memory-recall/test-memory-recall-card';
import { MemoryRecallService } from '../../services/memoryRecallService';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { signal } from '@angular/core';
import { PatientsService } from './../../services/patientsService';

@Component({
  selector: 'memory-recall',
  imports: [TestMemoryRecallCard, RouterModule],
  templateUrl: './memory-recall.html'
})

export class MemoryRecall implements OnInit {

  memoryRecallsList = signal<MemoryRecallModel[]>([]);

  userId!: number | null;

  refreshComponent: boolean = false;


    constructor(

      private readonly PatientsService: PatientsService,
      private readonly serviceMemoryRecalls: MemoryRecallService,
      private readonly route: ActivatedRoute,
      private readonly SharingData: SharingData

    ){this.userId = this.PatientsService.getUserId()
      this.refresh() //with this i subscribe to the observable and he keeps listening
    }

    ngOnInit(): void {

      this.route.paramMap.subscribe(params => {

        const user_id = +(params.get('id') || 0);

            this.serviceMemoryRecalls.getAllUserMemoryRecalls(user_id).subscribe(memoryRecallsOfuser => {
              this.memoryRecallsList.set(memoryRecallsOfuser)

              })
            })
          }


    refresh(){
      this.SharingData.CloseModalEventEmitter.subscribe(_ => {
        this.listenForNewMemoryRecallsChanges()
      })
    }

    listenForNewMemoryRecallsChanges(){

      this.serviceMemoryRecalls.getAllUserMemoryRecalls(this.userId).subscribe(memoryRecallsOfuser => {
              this.memoryRecallsList.set(memoryRecallsOfuser)

              })
    }
  }

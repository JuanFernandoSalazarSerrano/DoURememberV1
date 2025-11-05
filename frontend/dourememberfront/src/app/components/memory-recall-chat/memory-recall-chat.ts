import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { MessageBubble } from '../message-bubble/message-bubble';
import { FormsModule } from '@angular/forms';
import { GroundTruthService } from '../../services/ground-truth-service';
import { SseClient } from 'ngx-sse-client';
import { NgZone } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MemoryRecallService } from '../../services/memoryRecallService';
import { MemoryRecallInChat } from '../memory-recall-in-chat/memory-recall-in-chat';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-memory-recall-chat',
  imports: [MessageBubble, FormsModule, MemoryRecallInChat, RouterModule],
  templateUrl: './memory-recall-chat.html'
})

export class MemoryRecallChat {

  memoryRecallsInThisSession!: MemoryRecallModel[];

  memoryRecall!: MemoryRecallModel;

  userMessage: string = ''

  userMessageHistory: (string | MemoryRecallModel)[] = [];

  constructor(
    private readonly serviceMemoryRecalls: MemoryRecallService,
    private readonly router: Router,
    private readonly service: GroundTruthService,
    private readonly memoryRecallService: MemoryRecallService,
    private readonly sseClient: SseClient,
    private readonly ngZone: NgZone,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute){

    if (this.router.currentNavigation()?.extras.state) {
      this.memoryRecall = this.router.currentNavigation()?.extras.state!['memoryRecall'];
      this.userMessageHistory = [this.memoryRecall];
    }

    this.route.paramMap.subscribe(params => {

      const user_id = +(params.get('id') || 3);

          this.serviceMemoryRecalls.getAllUserMemoryRecalls(user_id).subscribe(memoryRecallsOfuser => {
            this.memoryRecallsInThisSession = memoryRecallsOfuser;
            })

  }
)

    // const headers = new HttpHeaders().set('Authorization', `Basic YWRtaW46YWRtaW4=`);

    // this.sseClient.stream('http://localhost:8080/api/v1/groundtruth/stream', { keepAlive: true, reconnectionDelay: 1000, responseType: 'event' }, { headers }).subscribe((event) => {
    //   if (event.type === 'error') {
    //     const errorEvent = event as ErrorEvent;
    //     console.error(errorEvent.error, errorEvent.message);
    //   } else {
    //     const messageEvent = event as MessageEvent;
    //     try {
    //       const payload = typeof messageEvent.data === 'string'
    //         ? JSON.parse(messageEvent.data)
    //         : messageEvent.data;

    //       const cleanedResponse = payload.aiResponse.replace(/^"|"$|\\(?!u)/g, '');
    //       const parsedJson = JSON.parse(cleanedResponse);
    //       const response = parsedJson as GroundTruthResponse;

    //       if (response && response.aiResponse !== undefined && response.aiResponse !== null) {
    //         // run inside Angular zone so change detection notices the update
    //         this.ngZone.run(() => {
    //           this.userMessageHistory = [...this.userMessageHistory, response.aiResponse];
    //           // force detection (use detectChanges if immediate update needed)
    //           this.cdr.markForCheck();
    //         });
    //       } else {
    //         console.warn('SSE payload missing aiResponse', payload);
    //       }
    //     } catch (err) {
    //       console.error('Failed to parse SSE data', messageEvent.data, err);
    //     }
    //   }
    // });
   }

  nextMemoryRecall(){

    this.findAndDeleteMemoryRecall(this.memoryRecall.memoryrecallid)

    if (this.memoryRecallsInThisSession.length !== 0) {
      const randomNumber = Math.floor(Math.random() * this.memoryRecallsInThisSession.length);
      this.memoryRecall = this.memoryRecallsInThisSession[randomNumber];
      this.userMessageHistory = [...this.userMessageHistory, this.memoryRecall];
    }

  }


  sendMessage(userAnswer: string){

    this.userMessageHistory.push(userAnswer, 'AI RESPONSE, NOT REAL FOR TESTING POURPUSES')

    this.userMessage = ''

    this.nextMemoryRecall()


    // this.service.sendUserAnswerToAiGroundTruthTest(

    //   `{
    //   "groundTruth": ${JSON.stringify(this.memoryRecall.groundTruthDescriptionComplete)},
    //   "groundTruthFacts": ${JSON.stringify(this.memoryRecall.groundTruthFacts)},
    //   "keyEntities": ${JSON.stringify(this.memoryRecall.keyEntities)},
    //   "userAnswer": ${JSON.stringify(userAnswer.replaceAll('\n', ''))},
    //   "matchingTolerances": {
    //     "synonymAllowance": true,
    //     "fuzzyStringThreshold": 0.75,
    //     "numericTolerancePercent": 10
    //   },
    //   "scoringWeights": {
    //     "presence": 0.4,
    //     "accuracy": 0.35,
    //     "omission": 0.15,
    //     "commission": 0.10
    //   }
    //   }`

    // ).subscribe(() => {
    //   this.nextMemoryRecall()
    //  }
    // )
  }

  findAndDeleteMemoryRecall(memoryRecallId: number) {
    this.memoryRecallsInThisSession = this.memoryRecallsInThisSession.filter(
      memoryRecall => memoryRecall.memoryrecallid !== memoryRecallId
    );
  }
}



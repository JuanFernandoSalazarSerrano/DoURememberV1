import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { MessageBubble } from '../message-bubble/message-bubble';
import { FormsModule } from '@angular/forms';
import { GroundTruthService } from '../../services/ground-truth-service';
import { SseClient } from 'ngx-sse-client';
import { HttpHeaders } from '@angular/common/http';
import { GroundTruthResponse } from '../../models/GroundTruthResponse';

@Component({
  selector: 'app-memory-recall-chat',
  imports: [MessageBubble, FormsModule],
  templateUrl: './memory-recall-chat.html'
})

export class MemoryRecallChat {

  memoryRecall!: MemoryRecallModel;

  userMessage: string = ''

  userMessageHistory: string[] = []

  constructor(
    private readonly router: Router,
    private readonly service: GroundTruthService,
    private readonly sseClient: SseClient){

    if(this.router.currentNavigation()?.extras.state){
      this.memoryRecall = this.router.currentNavigation()?.extras.state!['memoryRecall']}

      const headers = new HttpHeaders().set('Authorization', `Basic YWRtaW46YWRtaW4=`);

this.sseClient.stream('http://localhost:8080/api/v1/groundtruth/stream', { keepAlive: true, reconnectionDelay: 1000, responseType: 'event' }, { headers }).subscribe((event) => {
        if (event.type === 'error') {
          const errorEvent = event as ErrorEvent;
          console.error(errorEvent.error, errorEvent.message);
        } else {
          const messageEvent = event as MessageEvent;
          console.info(`SSE request with type "${messageEvent.type}" and data "${messageEvent.data}"`);
          try {
            const payload = typeof messageEvent.data === 'string'
              ? JSON.parse(messageEvent.data)
              : messageEvent.data;

                const cleanedResponse = payload.aiResponse.replace(/^"|"$|\\(?!u)/g, '');
                const parsedJson = JSON.parse(cleanedResponse);

              // typed assertion
            const response = parsedJson as GroundTruthResponse;
            // push only the aiResponse text to history
            if (response && response.aiResponse !== undefined && response.aiResponse !== null) {
                this.userMessageHistory = [...this.userMessageHistory, response.aiResponse];
            } else {
              console.warn('SSE payload missing aiResponse', payload);
            }
          } catch (err) {
            console.error('Failed to parse SSE data', messageEvent.data, err);
          }
        }
      });
    }

  sendMessage(userAnswer: string){

    this.userMessageHistory.push(userAnswer)

      this.userMessage = ''

    this.service.sendUserAnswerToAiGroundTruthTest(

      `{
      "groundTruth": ${JSON.stringify(this.memoryRecall.groundTruthDescriptionComplete)},
      "groundTruthFacts": ${JSON.stringify(this.memoryRecall.groundTruthFacts)},
      "keyEntities": ${JSON.stringify(this.memoryRecall.keyEntities)},
      "userAnswer": ${JSON.stringify(userAnswer.replaceAll('\n', ''))},
      "matchingTolerances": {
        "synonymAllowance": true,
        "fuzzyStringThreshold": 0.75,
        "numericTolerancePercent": 10
      },
      "scoringWeights": {
        "presence": 0.4,
        "accuracy": 0.35,
        "omission": 0.15,
        "commission": 0.10
      }
      }`

    ).subscribe(() => {
      this.userMessage = ''
     }
    )

  }
}

import { PatientsService } from './../../services/patientsService';
import { Component, signal } from "@angular/core"
import  { ActivatedRoute, Router } from "@angular/router"
import  { MemoryRecallModel } from "../../models/MemoryRecallModel"
import { MessageBubble } from "../message-bubble/message-bubble"
import { FormsModule } from "@angular/forms"
import  { GroundTruthService } from "../../services/ground-truth-service"
import  { SseClient } from "ngx-sse-client"
import  { MemoryRecallService } from "../../services/memoryRecallService"
import { MemoryRecallInChat } from "../memory-recall-in-chat/memory-recall-in-chat"
import { RouterModule } from "@angular/router"
import { ViewChild, type ElementRef, type AfterViewChecked } from "@angular/core"
import { HttpHeaders } from "@angular/common/http"
import { Subscription } from "rxjs"

@Component({
  selector: "app-memory-recall-chat",
  imports: [MessageBubble, FormsModule, MemoryRecallInChat, RouterModule],
  templateUrl: "./memory-recall-chat.html",
})
export class MemoryRecallChat implements AfterViewChecked {
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef
  private shouldScrollToBottom = false

  memoryRecallsInThisSession = signal<MemoryRecallModel[]>([])

  memoryRecall!: MemoryRecallModel

  userMessage = ""

  private sseSub?: Subscription;

  userMessageHistory = signal<(string | MemoryRecallModel)[]>([])

  constructor(
    private readonly serviceMemoryRecalls: MemoryRecallService,
    private readonly router: Router,
    private readonly service: GroundTruthService,
    private readonly sseClient: SseClient,
    private readonly route: ActivatedRoute,
    private readonly patientsService: PatientsService
  )
  {

    if (this.router.currentNavigation()?.extras.state) {
      this.memoryRecall = this.router.currentNavigation()?.extras.state!["memoryRecall"]
      this.userMessageHistory.set([this.memoryRecall])

    }

    this.route.paramMap.subscribe((params) => {
      const user_id = +(params.get("id") || 3)

      this.serviceMemoryRecalls.getAllUserMemoryRecalls(user_id).subscribe((memoryRecallsOfuser) => {
        this.memoryRecallsInThisSession.set(memoryRecallsOfuser)
      })
    })

    const headers = new HttpHeaders().set('Authorization', `Basic YWRtaW46YWRtaW4=`);
    this.sseSub = this.sseClient.stream('http://localhost:8080/api/v1/groundtruth/stream', { keepAlive: true, reconnectionDelay: 1000, responseType: 'event' }, { headers }).subscribe((event) => {

      if (event.type === 'error') {
        const errorEvent = event as ErrorEvent;
      } else {
        const messageEvent = event as MessageEvent;
        try {
          const payload = typeof messageEvent.data === 'string'
            ? JSON.parse(messageEvent.data)
            : messageEvent.data;

          console.log(6, 'Parsed JSON from SSE data', payload.aiResponse);
          if (payload && payload.aiResponse !== undefined && payload.aiResponse !== null) {
            this.userMessageHistory.set([...this.userMessageHistory(), payload.aiResponse]);
            this.nextMemoryRecall()
          } else {
            console.warn(8, 'SSE payload missing aiResponse', payload);
          }
        } catch (err) {
          console.error(9, 'Failed to parse SSE data', messageEvent.data, err);
        }
      }
    });
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom()
      this.shouldScrollToBottom = false
    }
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight
      }
    } catch (err) {
      console.error("Scroll to bottom failed:", err)
    }
  }

  nextMemoryRecall() {
    this.userMessage = ""

    this.findAndDeleteMemoryRecall(this.memoryRecall.memoryrecallid)

    if (this.memoryRecallsInThisSession().length !== 0) {
      const randomNumber = Math.floor(Math.random() * this.memoryRecallsInThisSession().length)
      this.memoryRecall = this.memoryRecallsInThisSession()[randomNumber]
      this.userMessageHistory.set([...this.userMessageHistory(), this.memoryRecall])
      this.shouldScrollToBottom = true
    }
    else{
      if(this.sseSub != undefined){
      this.sseSub.unsubscribe();
      this.sseSub = undefined;}
    }
  }



  sendMessage(userAnswer: string) {

    this.userMessage = ""

    this.userMessageHistory().push(userAnswer)



    this.shouldScrollToBottom = true

    // this.nextMemoryRecall()

    this.service.sendUserAnswerToAiGroundTruthTest(

      `{
      "userid":${JSON.stringify(this.patientsService.getUserId())},
      "groundTruth": ${JSON.stringify(this.memoryRecall.groundtruthdescriptioncomplete)},
      "groundTruthFacts": ${JSON.stringify(this.memoryRecall.groundtruthfacts)},
      "keyEntities": ${JSON.stringify(this.memoryRecall.keyentities)},
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

    ).subscribe(_ => {
     }
    )
  }

  findAndDeleteMemoryRecall(memoryRecallId: number) {
    this.userMessage = ""

    this.memoryRecallsInThisSession.set(
      this.memoryRecallsInThisSession().filter((memoryRecall) => memoryRecall.memoryrecallid !== memoryRecallId),
    )
  }
}

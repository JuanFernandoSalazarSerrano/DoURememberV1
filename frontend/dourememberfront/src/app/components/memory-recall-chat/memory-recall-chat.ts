import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryRecallModel } from '../../models/MemoryRecallModel';
import { MessageBubble } from '../message-bubble/message-bubble';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-memory-recall-chat',
  imports: [MessageBubble, FormsModule],
  templateUrl: './memory-recall-chat.html'
})

export class MemoryRecallChat {

  memoryRecall!: MemoryRecallModel;

  userMessage: string = ''

  userMessageHistory: string[] = []

  constructor(private readonly router: Router){
      if(this.router.currentNavigation()?.extras.state){
      this.memoryRecall = this.router.currentNavigation()?.extras.state!['memoryRecall']
    }
  }

  sendMessage(userMessage: string){
    this.userMessageHistory.push(userMessage)
    this.userMessage = ''
  }


}

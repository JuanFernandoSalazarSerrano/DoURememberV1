import { Component, Input } from '@angular/core';

@Component({
  selector: 'message-bubble',
  imports: [],
  templateUrl: './message-bubble.html',
})
export class MessageBubble {
  @Input() contentOfMessage!: string;
  @Input() indexOfMessage!: number;
  @Input() indexOfMessagePlus3!: number;
}

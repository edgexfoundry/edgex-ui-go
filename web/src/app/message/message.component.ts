import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  timer: any;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    // this.timer = setInterval(() => {this.messageService.clear() }, 3000)
  }

  close(msg: Message) {
    this.messageService.messages.splice(this.messageService.messages.indexOf(msg), 1)
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  timer: any;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
    this.timer = setInterval(() => { this.messageService.clear() }, 3000)
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}

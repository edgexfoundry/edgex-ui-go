import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from './message.service';
<<<<<<< HEAD
import { Message } from './message.service'
=======
>>>>>>> d1c0229... Add system message bus module and update some function

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  timer: any;

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
<<<<<<< HEAD
    // this.timer = setInterval(() => {this.messageService.clear() }, 3000)
  }

  close(msg: Message) {
    this.messageService.messages.splice(this.messageService.messages.indexOf(msg), 1)
=======
    this.timer = setInterval(() => { this.messageService.clear() }, 3000)
>>>>>>> d1c0229... Add system message bus module and update some function
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
<<<<<<< HEAD
=======

>>>>>>> d1c0229... Add system message bus module and update some function
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageService } from './message.service';
<<<<<<< HEAD
<<<<<<< HEAD
import { Message } from './message.service'
=======
>>>>>>> d1c0229... Add system message bus module and update some function
=======
import { Message } from './message.service'
>>>>>>> 7904af6... Update msg component for new message formater

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
<<<<<<< HEAD
=======
>>>>>>> 7904af6... Update msg component for new message formater
    // this.timer = setInterval(() => {this.messageService.clear() }, 3000)
  }

  close(msg: Message) {
    this.messageService.messages.splice(this.messageService.messages.indexOf(msg), 1)
<<<<<<< HEAD
=======
    this.timer = setInterval(() => { this.messageService.clear() }, 3000)
>>>>>>> d1c0229... Add system message bus module and update some function
=======
>>>>>>> 7904af6... Update msg component for new message formater
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> d1c0229... Add system message bus module and update some function
=======
>>>>>>> 7904af6... Update msg component for new message formater
}

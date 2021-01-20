import { Injectable } from '@angular/core';

export enum Type {
  success,
  danger,
  info
}

export interface Message {
  type?: Type,
  content: string,
  class?: string
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: Message[] = [];
  constructor() { }

  success(operation = 'operation', message?: string) {
<<<<<<< HEAD
    this.messages.push({ class: `alert alert-success shadow rounded alert-dismissible fade show`, content: `${operation} success! ${message ? message : ''}` });
  }

  errors(message: string) {
    this.messages.push({ class: `alert alert-danger shadow rounded alert-dismissible fade show`, content: message });
=======
    this.messages.push({ class: `alert alert-success shadow rounded`, content: `${operation} success! ${message ? message : ''}` });
  }

  error(message: string) {
    this.messages.push({ class: `alert alert-danger shadow rounded`, content: message });
>>>>>>> dd08687... update system message bud
  }

  clear() {
    this.messages.shift();
  }
}

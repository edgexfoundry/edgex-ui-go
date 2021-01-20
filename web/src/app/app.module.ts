import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
=======
=======
import { HttpClientModule } from '@angular/common/http';
>>>>>>> f21e84a... Add global httpclient module

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesssageComponent } from './message/messsage.component';
>>>>>>> d08a9c7... init scaffold
=======

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
>>>>>>> 3b9ffd7... Update app routing and import others module format

@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
<<<<<<< HEAD
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,
=======
    MesssageComponent
  ],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    AppRoutingModule
>>>>>>> d08a9c7... init scaffold
=======
    AppRoutingModule,
    HttpClientModule
>>>>>>> f21e84a... Add global httpclient module
=======
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    AppRoutingModule,
>>>>>>> 3b9ffd7... Update app routing and import others module format
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

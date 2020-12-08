import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
=======

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MesssageComponent } from './message/messsage.component';
>>>>>>> d08a9c7... init scaffold

@NgModule({
  declarations: [
    AppComponent,
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
    AppRoutingModule
>>>>>>> d08a9c7... init scaffold
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

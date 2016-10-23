import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';
import { LoginComponent } from './login.component';
import { DashboardComponent } from './superAdmin/dashboard.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule, HttpModule ],
  declarations: [ AppComponent, LoginComponent, DashboardComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }

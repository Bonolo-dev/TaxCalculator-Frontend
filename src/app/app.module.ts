import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { serverApiService } from './service/server-api.service';
import { HttpClientModule } from '@angular/common/http';
import { EarningType } from './model/earning-type';
import { FormsModule, ReactiveFormsModule , FormGroup, FormControl } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [serverApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntityModule } from './entity/entity.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // BrowserModule,
    // BrowserModule.withServerTransition({appId: 'ssr-stock'}),
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NgxWebstorageModule.forRoot(),
    EntityModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

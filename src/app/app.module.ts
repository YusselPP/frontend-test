import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GifSearchComponent } from './gif-search/gif-search.component';

@NgModule({
  declarations: [AppComponent, GifSearchComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

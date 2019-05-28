import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginRegComponentComponent } from './login-reg-component/login-reg-component.component';
import { AllSongsComponentComponent } from './all-songs-component/all-songs-component.component';
import { SongDetailComponentComponent } from './song-detail-component/song-detail-component.component';
import { UserDetailComponentComponent } from './user-detail-component/user-detail-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginRegComponentComponent,
    AllSongsComponentComponent,
    SongDetailComponentComponent,
    UserDetailComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegComponent } from './login-reg/login-reg.component';
import { AllSongsComponent } from './all-songs/all-songs.component';
import { SongDetailComponent } from './song-detail/song-detail.component'
import { NotFoundComponent } from './not-found/not-found.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const appRoutes: Routes = [
  { path: 'main', component: LoginRegComponent },
  { path: 'songs', component: AllSongsComponent },
  { path: 'songs/:id', component: SongDetailComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } //debugging
      )
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

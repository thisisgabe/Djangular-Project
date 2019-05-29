import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss']
})
export class AllSongsComponent implements OnInit {
  userName: string;
  userId: Number;

  mySongs: object[];

  addSongData: object = {
    title: '',
    artist: ''
  }

  errors: string[];

  constructor(private songService: SongsService) { 
    this.userName = 'Gabe';
    this.userId = 1;
  }

  ngOnInit() {
    this.getSongs();
  }

  addSong(){
    this.songService.createSong(this.addSongData)
    .subscribe(
      data => {
        console.log('added song to db');
        console.log(data);
        //get getSongs method
      },
      errors => {
        console.log('error adding song');
        console.log(errors);
        this.errors = errors;
      }
    )
  }

  getSongs(){
    this.songService.getSongs()
    .subscribe(
      data => {
        console.log('got all songs');
        this.mySongs = data;
        console.log(this.mySongs);
      },
      errors => {
        console.log('error getting songs');
        console.log(errors);
        this.errors = errors;
      }
    )
  }

}

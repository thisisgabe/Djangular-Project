import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { SongsService } from '../songs.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  songUserData: object = {
    song_id: ''
  };

  userName: string;
  userId: string;

  song_info: object = {}

  errors: string[];

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private songService: SongsService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    if (this.userId == null) {
      console.log('user not logged in');
      this.router.navigate(['main'])
    }
    else {
      this.userName = localStorage.getItem('first_name');
    }
    this.songUserData['song_id'] = this.route.snapshot.params['id'];
    console.log(this.songUserData['song_id']);
    this.getSongUsers();
  }

  getSongUsers(){
    this.songService.getSongUsers(this.songUserData)
      .subscribe(
        data => {
          console.log('got all songs');
          this.song_info = data;
          console.log(this.song_info);
        },
        errors => {
          console.log('error getting songs');
          console.log(errors);
          this.errors = errors;
        }
      )
  }

}

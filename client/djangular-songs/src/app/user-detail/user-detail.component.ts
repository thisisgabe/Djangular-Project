import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { UsersService } from '../users.service'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userPlaylistData: object = {
    user_id: ''
  };

  userName: string;
  userId: string;

  user_playlist: object = {}

  errors: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('user_id');
    if (this.userId == null) {
      console.log('user not logged in');
      this.router.navigate(['main'])
    }
    else {
      this.userName = localStorage.getItem('first_name');
    }
    this.userPlaylistData['user_id'] = this.route.snapshot.params['id'];
    console.log(this.userPlaylistData['user_id']);
    this.getUserPlaylist();
  }

  getUserPlaylist(){
    this.userService.getUserPlaylist(this.userPlaylistData)
    .subscribe(
      data =>{
        console.log('got playlist successfully');
        this.user_playlist = data;
        console.log(this.user_playlist)
      },
      errors => {
        console.log('error gettings playlist')
        this.errors = errors;
        console.log(this.errors);
      }
    )
  }

}

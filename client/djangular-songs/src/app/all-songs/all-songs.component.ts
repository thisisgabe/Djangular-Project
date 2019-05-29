import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component'

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.scss']
})
export class AllSongsComponent implements OnInit {
  userName: string;
  userId: Number;

  constructor() { 
    this.userName = 'Gabe';
    this.userId = 1;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.scss']
})
export class SongDetailComponent implements OnInit {
  songId: string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.songId = this.route.snapshot.params['id'];
    console.log(this.songId);
  }

}

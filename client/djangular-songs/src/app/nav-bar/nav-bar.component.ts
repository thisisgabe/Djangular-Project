import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() public firstName: string;
  @Input() public userId: Number;

  myName:string;
  myId: Number;

  constructor() { 
  }

  ngOnInit() {
    console.log(this.firstName);
    this.myName = this.firstName;
    this.myId = this.userId;
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() firstName: string;
  @Input() userId: Number;

  myName:string;

  constructor() { 
    this.myName = this.firstName;
  }

  ngOnInit() {
  }

}

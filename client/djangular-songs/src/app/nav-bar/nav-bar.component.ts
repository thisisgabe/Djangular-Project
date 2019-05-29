import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { 
  }

  ngOnInit() {
    console.log(this.firstName);
    this.myName = this.firstName;
    this.myId = this.userId;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['main'])
  }

}

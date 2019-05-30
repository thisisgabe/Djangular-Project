import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsersService } from '../users.service';


@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.scss']
})
export class LoginRegComponent implements OnInit {
  registerData: object = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordRepeat: ''
  }

  loginData: object = {
    email: '',
    password: ''
  }

  errors: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService) { }

  ngOnInit() {
  }

  submitRegister() {
    this.userService.createUser(this.registerData)
    .subscribe(
      (data: any) => {
        console.log('registration success!');
        console.log(data);
      },
      (errors) => {
        this.errors = errors.error;
        console.log(errors);
      }
    )
  }

  submitLogin() {
    this.userService.loginUser(this.loginData)
    .subscribe(
      (data: any) => {
        console.log('login success');
        console.log(data);
        localStorage.setItem('user_id', data.id);
        localStorage.setItem('first_name', data.first_name);
        localStorage.setItem('last_name', data.last_name);
        this.router.navigate(['songs'])
      },
      errors => {
        console.log('error logging in');
        this.errors = errors.error
        console.log(this.errors);
      }
    )
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = 'http://localhost:8000/users'
  constructor(private http: HttpClient) { }

  getUser() {

  }

  createUser(userData: object): void {
    let obs = this.http.post<object>(`${this.baseUrl}/create/`, userData);
    obs.subscribe(
      (data: any) => {
        localStorage.setItem('user_id', data.id);
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

  loginUser(loginData: object): void {
    let obs = this.http.post<object>(`${this.baseUrl}/login/`, loginData);
    obs.subscribe(
      (data: any) => {
        localStorage.setItem('user_id', data.id);
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

  logout(): void {
    localStorage.clear();
  }
}
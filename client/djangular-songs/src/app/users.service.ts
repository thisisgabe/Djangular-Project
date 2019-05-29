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
        console.log('registration success!')
        console.log(data)
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

  loginUser(loginData: object) {
    return this.http.post<object>(`${this.baseUrl}/login/`, loginData);
  }

  logout(): void {
    localStorage.clear();
  }
}
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

  //TODO: remove this logic, move to component and make this method
  //only return an observable
  createUser(userData: object) {
    return this.http.post<object>(`${this.baseUrl}/create/`, userData);
  }

  loginUser(loginData: object) {
    return this.http.post<object>(`${this.baseUrl}/login/`, loginData);
  }

  addSongToPlaylist(playlistData: object) {
    return this.http.post<object>(`${this.baseUrl}/songs/add/`, playlistData);
  }

  getUserPlaylist(userPlaylistData: object){
    return this.http.post<object>(`${this.baseUrl}/playlist/`, userPlaylistData)
  }


  logout(): void {
    localStorage.clear();
  }
}
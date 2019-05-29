import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  baseUrl: string = 'http://localhost:8000/songs'
  constructor(private http: HttpClient) { }

  createSong(addSongData: object): Observable<object> {
    return this.http.post<object>(`${this.baseUrl}/create/`, addSongData);
  }

  getSongs(): Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/list/`);
  }
}

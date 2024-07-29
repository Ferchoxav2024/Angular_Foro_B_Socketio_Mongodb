import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'YOUR_NEWSAPI_KEY';
  private apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl: string ='http://www.omdbapi.com/?apikey=1d233096';
    // ' http://www.omdbapi.com/?i=tt3896198&apikey=1d233096';
  constructor(private http: HttpClient) {}

  searchMovieByName(movieName: string, type?: string): Observable<any> {
    let url = `${this.apiUrl}&s=${movieName}`;
    return this.http.get<any>(url);
  }

  getMovieById(movieId: any): Observable<any> {
    let url = `${this.apiUrl}&i=${movieId}`;
    return this.http.get<any>(url);
  }

  searchMovieByTitleAndYear(movieName: string, year: string): Observable<any> {
    const encodedTitle = encodeURIComponent(movieName);
    let url = `${this.apiUrl}&s=${encodedTitle}&y=${year}`;
    console.log('Request URL:', url);
    // debugger;
    return this.http.get<any>(url).pipe(
      tap(response => console.log('Response:', response)));
  }
}

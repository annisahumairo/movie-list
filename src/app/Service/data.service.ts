import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../Model/movie';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url : string ='http://www.omdbapi.com/?apikey=faf7e5bb&s=Batman&page=1';
  constructor(private http : HttpClient) { }

  getLatestMovie (param:string): Observable<any>{
    return this.http.get<any>('http://www.omdbapi.com/?apikey=faf7e5bb&s='+param+'&page=1')
  }

  // getData():Observable<Movie>{
  //   return this.http.get<any>(this.url)
  // }
}

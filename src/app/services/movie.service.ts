import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { constants } from '../shared/constants';
import { Theater } from '../models/theater.model';

// interface AllMovieResponse {
//   movies: [Movie];
// }

@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  getAllMovies() {
    var temp = this.http.get<[Movie]>(constants.MOVIE_API_SERVICE_URL + '/all').pipe(catchError(this.handleError));
    temp.subscribe({
       next: (value) => {
        console.log(value);
    }  });
    return temp
  }

  getMovieByName(moviename: string) {
    console.log(moviename);
    var temp= this.http
      .get<[Movie]>(`${constants.MOVIE_API_SERVICE_URL}/movies/search/${moviename}`)
      .pipe(catchError(this.handleError));
      return temp;
  }
  

  
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}

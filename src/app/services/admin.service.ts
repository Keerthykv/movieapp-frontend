import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constants } from '../shared/constants';
import { Movie } from '../models/movie.model';

interface Shows {
  theaterId: string;
  showTime: string;
  totalSeats: number;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private http: HttpClient) {}

 
  deleteMovieById(moviename:string,id: string) {
    return this.http
      .delete(`${constants.MOVIE_API_SERVICE_URL}/${moviename}/delete/${id}`)
      .pipe(catchError(this.handleError));
  }
  updateMovie(movie:Movie){
    return this.http
      .put(`${constants.MOVIE_API_SERVICE_URL}/${movie.moviename}/update/`,movie)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { constants } from '../shared/constants';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  postTicketsByName(ticketData: any) {
    console.log(ticketData);
    return this.http.post<any>(`${constants.MOVIE_API_SERVICE_URL}/${ticketData.moviename}/add`, ticketData)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.error.message));
  }
}

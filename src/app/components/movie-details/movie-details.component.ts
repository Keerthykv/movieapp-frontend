import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Theater } from 'src/app/models/theater.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  isLoading: boolean = false;
  moviename: string | null = '';
  theatre: Movie[] = [];
  theatredetails: Theater[] = [];
  userSubscription: Subscription = new Subscription();
  seatsToBook: number = 1;

  // Static array for theater seats data
  movieTicket: Theater[] = [];
  allSeats: string[][] = []; // Predefined range of seat numbers

  theaterState: { selectedTickets: number; selectedSeats: string[] }[] = [];
  selectedTheatreIndex: number | null = null;

  constructor(
    private authenticationService: AuthenticationService,
    private movieService: MovieService,
    private bookingservice: BookingService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.moviename = this.activeRoute.snapshot.paramMap.get('moviename');
    console.log(this.moviename);

    if (this.moviename) {
      this.isLoading = true;
      this.movieService.getMovieByName(this.moviename.toLowerCase()).subscribe({
        next: (value) => {
          this.isLoading = false;
          this.theatre = value;
          this.theatre.forEach((movie, index) => {
            this.theaterState[index] = {
              selectedTickets: 0,
              selectedSeats: [],
            };
            let arr = [];
            for (
              let j = 0;
              j < movie.seatsBooked.length + movie.no_tickets;
              j++
            ) {
              arr.push(`${j}`);
            }
            this.allSeats[index] = arr;
          });
        },
        error: (errorMessage) => {
          this.isLoading = false;
          this.openSnackBar(errorMessage);
          this.router.navigate(['/home']);
        },
      });
    } else {
      this.openSnackBar('Movie name is undefined');
      this.router.navigate(['/home']);
    }
  }

  increaseTickets(index: number): void {
    if (
      this.theatre[index] &&
      this.theaterState[index].selectedTickets < this.theatre[index].no_tickets
    ) {
      this.theaterState[index].selectedTickets++;
    }
  }

  decreaseTickets(index: number): void {
    if (this.theaterState[index].selectedTickets > 0) {
      this.theaterState[index].selectedTickets--;
    }
  }

  toggleSeatSelection(index: number): void {
    if(this.theatre[index].no_tickets===0){
      this.openSnackBar(
        "Tickets for this movie has been SOLD OUT"
      );
    }
    else if (this.theaterState[index].selectedTickets <= 0) {
      this.openSnackBar(
        "Please select required number of movie tickets"
      );
      
    }
    
    else{
    this.selectedTheatreIndex =
      this.selectedTheatreIndex === index ? null : index;
    }
  }

  selectSeat(index: number, seat: string): void {
    const selectedSeats = this.theaterState[index].selectedSeats;
    const seatIndex = selectedSeats.indexOf(seat);
    console.log(selectedSeats);
    console.log(selectedSeats);
    console.log(this.theaterState[index].selectedTickets);
    if (
      selectedSeats.length === this.theaterState[index].selectedTickets &&
      seatIndex === -1
    ) {
      this.openSnackBar(
        `You have already selected ${this.theaterState[index].selectedSeats.length} tickets`
      );
    }
    if (selectedSeats.length === this.theaterState[index].selectedTickets) {
      if (seatIndex !== -1) {
        selectedSeats.splice(seatIndex, 1);
      }
    } else {
      if (seatIndex === -1) {
        selectedSeats.push(seat);
      } else {
        selectedSeats.splice(seatIndex, 1);
      }
    }
  }

  confirmBooking(index: number): void {
    const movie = this.theatre[index];
    const selectedSeats = this.theaterState[index].selectedSeats;
    const selectedTicketCount = this.theaterState[index].selectedTickets;
    const seatNumbers = selectedSeats.join(', ');

    if (selectedSeats.length > 0) {
      this.isLoading = true;
      this.bookingservice
        .postTicketsByName({
          moviename: movie.moviename,
          no_tickets: selectedTicketCount,
          theatre: movie.theatre,
          seat_no: selectedSeats,
        })
        .subscribe({
          complete: () => {
            this.isLoading = false;
            this.openSnackBar(
              `Booking Confirmed! Movie: ${movie.moviename}, Theatre: ${movie.theatre}, Seats: ${seatNumbers}`
            );
            this.theaterState[index].selectedSeats = []; // Clear the selected seats after booking
            this.router.navigate(['/home']);
          },
          error: (errorMsg) => {
            this.isLoading = false;
            this.openSnackBar(errorMsg);
          },
        });
    }
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000, // Increased duration to ensure Cypress can catch it
      panelClass: ['snackbar-class'] // Optional: Add a custom class for easier testing
    });
  }
  

  isSeatAvailable(seat: string, bookedSeats: string[]): boolean {
    return !bookedSeats.includes(seat);
  }
}

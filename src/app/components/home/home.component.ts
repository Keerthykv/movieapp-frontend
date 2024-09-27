import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  searchQuery: string = '';
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.movieService.getAllMovies().subscribe({
      next: (value) => {
        this.movies = this.filterUniqueMovies(value);
        this.filteredMovies = this.movies;
        this.isLoading = false;
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.openSnackBar(errorMessage);
      },
    });
  }

  filterUniqueMovies(movies: Movie[]): Movie[] {
    const uniqueMoviesMap = new Map<string, Movie>();
    movies.forEach(movie => {
      if (!uniqueMoviesMap.has(movie.moviename)) {
        uniqueMoviesMap.set(movie.moviename, movie);
      }
    });
    return Array.from(uniqueMoviesMap.values());
  }

  bookNow(moviename: string): void {
    console.log(`Booking movie with id: ${moviename}`);
    this.router.navigate([`details/${moviename}`]);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredMovies = this.movies;
    } else {
      this.isLoading = true;
      this.movieService.getMovieByName(this.searchQuery.toLowerCase()).subscribe({
        next: (movies) => {
          this.filteredMovies = this.filterUniqueMovies(movies.filter(movie =>
            movie.moviename.toLowerCase().includes(this.searchQuery.toLowerCase())
          ));
          console.log(this.filteredMovies)
          this.isLoading = false;
        },
        error: (errorMessage) => {
          this.isLoading = false;
          this.openSnackBar(errorMessage);
        },
      });
    }
  }
}

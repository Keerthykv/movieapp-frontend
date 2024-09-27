import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Movie } from 'src/app/models/movie.model';
import { AdminService } from 'src/app/services/admin.service';
import { MovieService } from 'src/app/services/movie.service';
import { EditMovieDialogComponent } from 'src/app/edit-movie-dialog/edit-movie-dialog.component';

@Component({
  selector: 'app-manage-movies',
  templateUrl: './manage-movies.component.html',
  styleUrls: ['./manage-movies.component.css'],
})
export class ManageMoviesComponent {
  isLoading: boolean = false;
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialog:MatDialog
  ) {}

  ngOnInit() {
    this.isLoading = true;
    localStorage.setItem('admin', "ADMIN");
    this.movieService.getAllMovies().subscribe({
      next: (value) => {
        this.movies = value;
        this.isLoading = false;
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.openSnackBar(errorMessage);
      },
    });
    
  }

  deleteMovie(id: string,moviename:string) {
    this.isLoading = true;
    this.adminService.deleteMovieById(moviename,id).subscribe({
      next: (value) => {
        this.isLoading = false;
        this.openSnackBar('Movie deleted successfully!');
        this.ngOnInit();
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.openSnackBar(errorMessage);
      },
    });
  }
  editMovie(movie: Movie) {
    const dialogRef = this.dialog.open(EditMovieDialogComponent, {
      width: '300px',
      data: { movie },
      panelClass:['dialog-class']
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the movie details with the result
        this.updateMovie(result);
      }
    });
  }
  updateMovie(updatedMovie: Movie) {
    this.isLoading = true;
    this.adminService.updateMovie(updatedMovie).subscribe({
      next: () => {
        this.isLoading = false;
        this.openSnackBar('Movie updated successfully!');
        this.ngOnInit();
      },
      error: (errorMessage) => {
        this.isLoading = false;
        this.openSnackBar(errorMessage);
      },
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: ['snackbar-class']
    });
  }
}

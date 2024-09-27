// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
// import { Movie } from '../models/movie.model';

// @Component({
//   selector: 'app-edit-movie-dialog',
//   templateUrl: './edit-movie-dialog.component.html',
// })
// export class EditMovieDialogComponent {
//   editForm: FormGroup;
//   //movie:Movie;
//   movie: any


//   constructor(
//     public dialogRef: MatDialogRef<EditMovieDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     private fb: FormBuilder
//   ) {
//     this.editForm = this.fb.group({
//       no_tickets: new FormControl('', [Validators.required]),
//       seat_no: new FormControl('', [Validators.required, this.seatValidator.bind(this)]),
//     });
//   }
//   ngOnInit(): void {
//     this.movie = this.data.movie;
//     console.log(this.movie.seatsBooked
//     );
//   }
// //   seatValidator(control: AbstractControl): { [key: string]: boolean } | null {
// //     const no_tickets = this.editForm?.get('no_tickets')?.value;
// //     const seat_no = control.value;
// //     const datavalue=this.data.movie.seatsBooked
// // console.log(datavalue)
// // // if(seat_no===this.data.movie.seatsBooked){
// // //   console.log("1")
// // // }

// //     if (seat_no && no_tickets && seat_no.split(',').length !== no_tickets) {
// //       return { 'seatMismatch': true };
// //     }
// //     return null;
// //   }

// seatValidator(): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     const no_tickets: number = this.editForm?.get('no_tickets')?.value;
//     const seat_no: string = control.value;
//     const datavalue: string[] = this.data.movie.seatsBooked;

//     if (seat_no && no_tickets) {
//       const seatArray: string[] = seat_no.split(',').map((seat: string) => seat.trim());
//       const bookedSeats: Set<string> = new Set(datavalue);

//       // Check if the number of selected seats matches the number of tickets
//       if (seatArray.length !== no_tickets) {
//         return { 'seatMismatch': true };
//       }

//       // Check if all selected seats are available
//       for (const seat of seatArray) {
//         console.log("outside");
//         if (!bookedSeats.has(seat)) {
//           console.log("inside");

//           return { 'seatUnavailable': true };
//         }
//       }
//     }

//     return null;
//   };
// }
//   onCancel(): void {
//     this.dialogRef.close();
//   }

//     onSave(): void {
//     if (this.editForm.valid) {
//       const updatedData = {
//         ...this.data.movie,
//         no_tickets: this.editForm.get('no_tickets')?.value,
//         seat_no: this.editForm.get('seat_no')?.value.split(',').map((seat: string) => seat.trim()),
//       };
//       this.dialogRef.close(updatedData);
//     }
//   }
// }

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-edit-movie-dialog',
  templateUrl: './edit-movie-dialog.component.html',
})
export class EditMovieDialogComponent {
  editForm: FormGroup;
  movie: Movie;

  constructor(
    public dialogRef: MatDialogRef<EditMovieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.movie = this.data.movie;

    this.editForm = this.fb.group({
      no_tickets: new FormControl('', [Validators.required]),
      seat_no: new FormControl('', [Validators.required, this.seatValidator]),
    });
  }

  ngOnInit(): void {
    console.log(this.movie.seatsBooked);
  }

  seatValidator = (control: AbstractControl): { [key: string]: boolean } | null => {
    const no_tickets: number = this.editForm?.get('no_tickets')?.value;
    const seat_no: string = control.value;
    const datavalue: string[] = this.movie.seatsBooked;

    if (seat_no && no_tickets) {
      const seatArray: string[] = seat_no.split(',').map((seat: string) => seat.trim());
      const bookedSeats: Set<string> = new Set(datavalue);

      // Check if the number of selected seats matches the number of tickets
      if (seatArray.length !== no_tickets) {
        return { 'seatMismatch': true };
      }

      // Check if all selected seats are available
      for (const seat of seatArray) {
        if (bookedSeats.has(seat)) {
          return { 'seatUnavailable': true };
        }
      }
    }

    return null;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedData = {
        ...this.data.movie,
        no_tickets: this.editForm.get('no_tickets')?.value,
        seat_no: this.editForm.get('seat_no')?.value.split(',').map((seat: string) => seat.trim()),
      };
      this.dialogRef.close(updatedData);
    }
  }
}

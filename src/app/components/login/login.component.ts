// import { Component } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Subscription } from 'rxjs';
// import { User } from 'src/app/models/user.model';
// import { AuthenticationService } from 'src/app/services/authentication.service';
// import { HeaderComponent } from 'src/app/shared/header/header.component';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
// })
// export class LoginComponent {
//   userSubscription: Subscription = new Subscription();
//   isLoading: boolean = false;
//   newuser = new BehaviorSubject<String | null>(null);

//   loginForm = new FormGroup({
//     loginId: new FormControl('', [Validators.required, ]),
//     password: new FormControl('', [
//       Validators.required,
//       Validators.minLength(8),
//     ]),
//   });

//   constructor(
//     private authenticationService: AuthenticationService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {}

//   ngOnInit() {
//     this.userSubscription = this.authenticationService.user.subscribe(
//       (user) => {
//         if(user?.loginId==="Admin"){
//           this.router.navigate(['./admin/manage-movies']);

//         }
//         if (user) {
//           this.router.navigate(['./home']);
//         }
//       }
//     );
//   }

//   ngOnDestroy() {
//     this.userSubscription.unsubscribe();
//   }

//   get loginId() {
//     return this.loginForm.get('loginId');
//   }

//   get password() {
//     return this.loginForm.get('password');
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       this.isLoading = true;
//       if(this.loginId?.value==='Admin'){
//         //localStorage.setItem('admin', "ADMIN");
//         this.isLoading=false;
//         this.newuser.next(localStorage.getItem('admin'));
//         this.router.navigate(['/admin/manage-movies']);
//         return;
//       }

//       this.authenticationService
//         .login({ loginId: this.loginId?.value, password: this.password?.value })
//         .subscribe({
//           next: (response: any) => {
//             // Extract user object from response
//             const user = response.user;
//             // Save user data to local storage
//             localStorage.setItem('user', JSON.stringify(user));
//             this.isLoading = false;
//             this.router.navigate(['./home']);
//           },
//           error: (errorMessage) => {
//             this.isLoading = false;
//             this.openSnackBar("Invalid username or password");
//           },
//         });
        
        
//     }
//   }

//   openSnackBar(msg: string) {
//     this.snackBar.open(msg, 'Ok', {
//       horizontalPosition: 'center',
//       verticalPosition: 'top',
//       duration: 2500,
//     });
//   }
// }
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userSubscription: Subscription = new Subscription();
  isLoading: boolean = false;

  loginForm = new FormGroup({
    loginId: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    //localStorage.removeItem('user');
    // this.userSubscription = this.authenticationService.user.subscribe((user) => {
    //   if (user?.loginId === 'Admin') {
    //     console.log("1")
    //     this.router.navigate(['./admin/manage-movies']);
    //   } else if (user) {
    //     this.router.navigate(['./home']);
    //   }
    // });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  get loginId() {
    return this.loginForm.get('loginId');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // if (this.loginId?.value === 'Admin'&& this.password?.value==='Admin@123') {
      //   localStorage.setItem('admin', 'ADMIN');
      //   this.isLoading = false;
      //   this.router.navigate(['/admin/manage-movies']);
      //   return;
      // }

      this.authenticationService
        .login({ loginId: this.loginId?.value, password: this.password?.value })
        .subscribe({
          next: (response: any) => {
            // Extract user object from response
            const user = response.user;
            // Save user data to local storage
            localStorage.setItem('user', JSON.stringify(user));
            let userid = user.loginId;
            console.log(userid)
            if(userid==="Admin"){
            this.isLoading = false;
            this.router.navigate(['./admin/manage-movies']);
            }else{
            this.isLoading = false;
            this.router.navigate(['./home']);
            }
          },
          error: (errorMessage) => {
            this.isLoading = false;
            this.openSnackBar('Invalid username or password');
          },
        });
    }
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Ok', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
    });
  }
}


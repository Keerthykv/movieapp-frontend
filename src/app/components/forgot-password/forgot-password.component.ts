import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  securityQuestions = constants.SECURITY_QUESTIONS;
  isLoading: boolean = false;

  forgotPasswordForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    emailid: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  userSubscription: Subscription = new Subscription();

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  get username() {
    return this.forgotPasswordForm.get('username');
  }

  get emailid() {
    return this.forgotPasswordForm.get('emailid');
  }

  get newPassword() {
    return this.forgotPasswordForm.get('newPassword');
  }

  ngOnInit() {
    this.userSubscription = this.authenticationService.user.subscribe(
      (user) => {
        if (user) {
          this.router.navigate(['./home']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.authenticationService
        .forgotPassword(this.username?.value, {
          email: this.emailid?.value,
          newPassword: this.newPassword?.value,
        })
        .subscribe({
          complete: () => {
            this.isLoading = false;
            this.openSnackBar('Your password has been reset successfully');
          },
          error: (errorMessage) => {
            this.isLoading = false;
            this.openSnackBar(errorMessage);
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

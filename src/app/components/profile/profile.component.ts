import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  loginId:string ="";
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  contactNumber: string = "";

  userSubscription: Subscription = new Subscription();
  constructor(private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Assign values to component properties
      this.loginId = user.loginId;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.contactNumber = user.contactNumber;
    } else {
      console.error('No user data found in local storage.');
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}

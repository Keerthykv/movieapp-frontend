import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userSubscription: Subscription = new Subscription();

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    console.log(this.isLoggedIn);
    console.log(this.isAdmin);

    this.userSubscription = this.authenticationService.user.subscribe(
      (response: { user: User } | null) => {
        console.log('Response received from subscription:', response);

        if (response && response.user) {
          const user = response.user;
          console.log('User object:', user);
          console.log('User loginId:', user.loginId);

          const uservalue = user.loginId;
          console.log('User loginId extracted:', uservalue);

          if (uservalue !== 'Admin') {
            this.isLoggedIn = true;
            this.isAdmin = false;
            console.log("1");
          } else {
            this.isAdmin = true;
            this.isLoggedIn = true;
            console.log("2");
          }
        } else {
          this.isLoggedIn = false;
          this.isAdmin = false;
        }
      }
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onLogout() {
    this.isLoggedIn = false;
    localStorage.removeItem('user');
    this.authenticationService.logout();
  }
}


// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { AuthenticationService } from 'src/app/services/authentication.service';
// import { ChangeDetectorRef } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent implements OnInit, OnDestroy {
//   isLoggedIn: boolean = false;
//   isAdmin: boolean = false;
//   userSubscription: Subscription = new Subscription();
//   routerSubscription: Subscription = new Subscription();

//   constructor(
//     private authenticationService: AuthenticationService,
//     private cdref: ChangeDetectorRef,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.userSubscription = this.authenticationService.user.subscribe((user) => {
//       console.log(user)
//       this.isLoggedIn = !!user;
      
//       this.isAdmin = user?.loginId === 'Admin';
//       this.cdref.detectChanges(); // Manually trigger change detection
//     });

//     this.routerSubscription = this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe(() => {

//         this.cdref.detectChanges(); // Trigger change detection on navigation
//       });
//   }

//   ngOnDestroy() {
//     this.userSubscription.unsubscribe();
//     this.routerSubscription.unsubscribe();
//   }

//   onLogout() {
//     this.authenticationService.logout();
//   }
// }


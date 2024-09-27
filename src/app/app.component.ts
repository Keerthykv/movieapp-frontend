import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.autoLogin();
  }
}
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router, NavigationEnd } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { filter } from 'rxjs/operators';
// import { AuthenticationService } from 'src/app/services/authentication.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit, OnDestroy {
//   routerSubscription: Subscription = new Subscription();

//   constructor(private router: Router, private authService: AuthenticationService) {}

//   ngOnInit() {
//     this.routerSubscription = this.router.events
//       .pipe(filter(event => event instanceof NavigationEnd))
//       .subscribe(() => {
//         // Trigger authentication check on every navigation
//         const user = localStorage.getItem('user');
//         const admin = localStorage.getItem('admin');
//         if (user) {
//           this.authService.login(JSON.parse(user));
//         } else if (admin === 'ADMIN') {
//           this.authService.login({
//             loginId: 'Admin',
//             password: 'Admin@123'
//           });
//         }
//       });
//   }

//   ngOnDestroy() {
//     this.routerSubscription.unsubscribe();
//   }
// }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { ProgressSpinnerComponent } from './shared/progress-spinner/progress-spinner.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ManageMoviesComponent } from './components/admin-services/manage-movies/manage-movies.component';
import { AuthInterceptorService } from './guards/auth-interceptor.service';
import { EditMovieDialogComponent } from './edit-movie-dialog/edit-movie-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HomeComponent,
    HeaderComponent,
    ProgressSpinnerComponent,
    ProfileComponent,
    MovieDetailsComponent,
    ManageMoviesComponent,
    EditMovieDialogComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

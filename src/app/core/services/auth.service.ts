import { AlertService } from '@ui-core-services/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, map, catchError, throwError, tap, of } from 'rxjs';
// import { Auth, AuthDetails, DecodedTokenDto, UserNameModel } from '../models/auth';
import {isPlatformBrowser} from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AuthDetails, AuthResponse, User, UserRoles } from '@ui-core-model/user';

const authUrl = `${environment.AUTH_SERVICE_URL}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //   this.authStatusListener.next(false);
  //   this.alertService.showError(errorMessage, "Unauthorized")
  //   throw new Error(errorMessage)
  // }
  // Save to local storage
  private token!: string;
  private tokenTimer!: any;
  private authStatusListener = new Subject<boolean>();

  private isProcessing = false;
  public processes = {
    loginUser: { isActive: false }
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService,
    // private dialogRef: MatDialog,
  ) { }

  get getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }


  get getUserId() {
    return localStorage.getItem('id');
  }

  get getUserName(): string | null {
    return localStorage.getItem('username');
  }

  get getRole(): string {
    return localStorage.getItem('user_role');
  }

  createBackOfficeUser(userDto: any): Observable<string> {
    return this.http.post<string>(`${authUrl}/create`, userDto)
      .pipe(map(res => {
        console.log('got response', res);
        return res;
      }));
  }
  
  
  getBackOfficeUsers():Observable<User[]> {
    return this.http.get<User[]>(`${authUrl}`);
  }

  deleteUser(username: String) {
    return this.http.delete<string>(`${authUrl}/${username}`);
  }

  public loginUser(authDetails: AuthDetails, returnUrl: string): Observable<boolean> {

    this.processes.loginUser.isActive = true;

    // Clearing all previous auth details
    this.token = '';
    this.authStatusListener.next(false);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    const router = this.router

    // Login at db
    return this.http
      .post<User>(`${authUrl}/login`, authDetails)
      .pipe(
        map((response) => {

          console.log(response)
          if (response) {
            this.authStatusListener.next(true);

            // const decodedString: DecodedTokenDto = this.decodeToken(response.access_token);

            // if (!internalRoles.some((role) => decodedString.auth.includes(role))) {
            //   const errorMessage = "Sorry You are Not Authorized to access this portal"

            //   this.authStatusListener.next(false);
            //   this.alertService.showError(errorMessage, "Unauthorized")

            //   throw new Error(errorMessage)
            // }

            // Save to local storage
            this.saveAuthData(
              response
            );

            // Continue to where user was headed
            if (returnUrl) {
              this.router.navigateByUrl(returnUrl);
              return true;
            }
            // Otherwise go to homepage
            router.navigateByUrl('/portal/dashboard');
            return true;
          }
          return false
        }),
        tap(data => {

          this.processes.loginUser.isActive = false;

        }),
        catchError((error) => {
          // this.authStatusListener.next(false);
          this.processes.loginUser.isActive = false;
          return throwError(() => error);
        })
      );
  }

  public logout() {
    this.token = '';
    this.authStatusListener.next(false);
    // this.dialogRef.closeAll();
    this.clearAuthData();
    clearTimeout(this.tokenTimer);

    this.alertService.showInfo("You have been logged out", "End of Session");

    this.router.navigateByUrl('/auth');
  }

  public forgotPassword(email: String) {
    return this.http.get<any>(`${authUrl}/users/forgot-password/${email}`, {      
      headers: new HttpHeaders({ "Origin": `${environment.ANALYTICS_SERVICE_URL}/auth` })
    });
  }

  public changePasswordToken(password: string, token: string) {
    return this.http.post<any>(`${authUrl}/users/change-password/${token}`, {
      password
    })
      .pipe(
        map(res => {
          console.log(res)
          if (res.status === 'success') {
            this.alertService.showSuccess(res.message);
            this.router.navigateByUrl('/portal/dashboard');
          }
          return res
        })
      );
  }

  // public getUserDetails(id: number): Observable<UserNameModel> {
  //   return this.http.get<UserNameModel>(`${authUrl}/users/${id}`);
  // }

  // public getProfile() {
  //   return this.http.get<User>(`${authUrl}/users/me`);
  // }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];

    return JSON.parse(window.atob(payload));
  }

  private saveAuthData(response: User) {
    // localStorage.setItem('first_name', user.firstName);
    // localStorage.setItem('last_name', user.lastName);
    localStorage.setItem('username', response.username);
    localStorage.setItem('id', `${response.id}`);
    localStorage.setItem('user_role', response.role);
  }

  private clearAuthData() {
      localStorage.removeItem('username');
      localStorage.removeItem('id');
      localStorage.removeItem('user_role');
  }
}

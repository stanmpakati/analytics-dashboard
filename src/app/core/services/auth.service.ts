import { AlertService } from '@ui-core-services/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, map, catchError, throwError, tap, of } from 'rxjs';
// import { Auth, AuthDetails, DecodedTokenDto, UserNameModel } from '../models/auth';
import {isPlatformBrowser} from '@angular/common';
// import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AuthDetails, AuthResponse, User } from '@ui-core-model/user';

const authUrl = `${environment.ANALYTICS_SERVICE_URL}`;

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

  // get getIsAuthenticated(): boolean {
  //   return this.authStatusListener
  // }

  get getToken(): string | null {
    // if(isPlatformBrowser(this.ssrService.platformId)){
    //   const access_token = localStorage.getItem('access_token')
    //   const token_type = localStorage.getItem('token_type')

    //   if (access_token && token_type) return `${token_type} ${access_token}`;

    //   return null;
    // }
    return null;
  }

  get getTokenSubString(): string | null {
    return localStorage.getItem('access_token');
  }

  get getUserId() {
    try {
      return this.decodeToken(this.getTokenSubString!).sub
    } catch {
      return '';
    }
  }

  get getFirstName(): string | null {
    return localStorage.getItem('first_name');
  }

  get getLastName(): string | null {
    return localStorage.getItem('last_name');
  }

  createBackOfficeUser(userDto: any): Observable<AuthDetails> {
    // throw new Error('Method not implemented.');
    return of();
  }
  
  
  getBackOfficeUsers(arg0: { page: number; perPage: number; }):Observable< { users: User[]; links: { totalObjects: number; }; }> {
    // throw new Error('Method not implemented.');
    return of();
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
      .post<AuthResponse>(`${authUrl}/users/signin`, authDetails)
      .pipe(
        map((response) => {
          this.token = response.access_token;

          if (response.access_token) {
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
              response.access_token,
              response.token_type,
              // response.user,
              2,
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

  private saveAuthData(access_token: string, token_type: string, expiration: number) {
    // localStorage.setItem('first_name', user.firstName);
    // localStorage.setItem('last_name', user.lastName);
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('token_type', token_type);
    localStorage.setItem('expiration_date', JSON.stringify(expiration));
  }

  private clearAuthData() {
      localStorage.removeItem('token_type');
      localStorage.removeItem('expiration_date');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_roles');
  }
}

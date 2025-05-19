import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { submitForm, User } from './submit.model';
import { Asset } from './models/asset/asset.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FormAPIsService {

  baseURL = environment.baseURL;

  constructor(private http: HttpClient) { }

  submitFormData(data: FormData): Observable<any> {
    const url = `${this.baseURL}create-mock`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  editFormData(data: FormData): Observable<any> {
    const url = `${this.baseURL}fetch-mock-single`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  updateFormData(formData: FormData): Observable<any> {
    const url = `${this.baseURL}update-mock`;  // Ensure baseURL is properly defined
    return this.http.post<any>(url, formData).pipe(
      catchError(this.handleError)  // Gracefully handle errors
    );
  }

  fetchAllData(data: any): Observable<any> {
    const url = `${this.baseURL}fetch-mock`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  deleteUser(id: number, accessId: any): Observable<any> {
    const payload = { id, accessId }; // Send id in the payload
    return this.http.post(`${this.baseURL}delete-mock`, payload);
  }

  deleteMultipleUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseURL}delete-selected-mock`, payload);
  }

  importData(data: any): Observable<any> {
    const url = `${this.baseURL}create-mock1`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  exportExcelData(payload: any) {
    const url = `${this.baseURL}download-excel`; // Tumhari API ka URL
    return this.http.post(url, payload, {
      responseType: 'blob',  // File ko blob format mein receive karna
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  login(credentials: { in: string; password: string }): Observable<any> {
    const url = `${this.baseURL}login`;
    return this.http.post<any>(url, credentials).pipe(
      catchError(this.handleError)
    );
  }

  register(registerUserDetail: { fn: any; ln: any; in: any; password: any; }): Observable<any> {
    const url = `${this.baseURL}register`;
    return this.http.post<any>(url, registerUserDetail).pipe(
      catchError(this.handleError)
    );
  }

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseURL}send-otp`, { in: email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.baseURL}get-otp`, { in: email, otp });
  }

  resetPassword(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseURL}reset-password`, { in: email, password });
  }

  assetsPort(filters: { station?: string; portType?: string; accessId: any }): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseURL}assets-port`, filters);
  }

  assetsStation(filters: { station?: string; portType?: string; accessId: any }): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseURL}assets-charging`, filters);
  }

  activeUsers(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseURL}active-user`, filters);
  }

  userDashData(data: any): Observable<{ data: User; message: string; success: boolean }> {
    const url = `${this.baseURL}fetch-mock-single-user`;
    return this.http.post<{ data: User; message: string; success: boolean }>(url, data)
      .pipe(catchError(this.handleError));
  }

  editUserData(data: any): Observable<any> {
    const url = `${this.baseURL}fetch-mock-single-user`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  updateUserData(formData: any): Observable<any> {
    const url = `${this.baseURL}update-mock-user`;
    return this.http.post<any>(url, formData).pipe(catchError(this.handleError));
  }

  // Asset Charging Stations Map APIs
  getStates(): Observable<{ states: { state: string }[] }> {
    const url = `${this.baseURL}charging-states`;
    return this.http.post<{ states: { state: string }[] }>(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  getCities(state: string): Observable<{ cities: { city: string }[] }> {
    const url = `${this.baseURL}charging-cities`;
    return this.http.post<{ cities: { city: string }[] }>(url, { state }).pipe(
      catchError(this.handleError)
    );
  }

  getAssets(state: string, city: string): Observable<any[]> {
    const url = `${this.baseURL}assets-charging`;
    return this.http.post<any[]>(url, { state, city }).pipe(
      catchError(this.handleError)
    );
  }

  // Asset Charging Ports Map APIs

  getStatesPort(): Observable<{ states: { state: string }[] }> {
    const url = `${this.baseURL}port-states`;
    return this.http.post<{ states: { state: string }[] }>(url, {}).pipe(
      catchError(this.handleError)
    );
  }

  getCitiesPort(state: string): Observable<{ cities: { city: string }[] }> {
    const url = `${this.baseURL}port-cities`;
    return this.http.post<{ cities: { city: string }[] }>(url, { state }).pipe(
      catchError(this.handleError)
    );
  }

  getAssetsPort(state: string, city: string): Observable<any[]> {
    const url = `${this.baseURL}assets-port`;
    return this.http.post<any[]>(url, { state, city }).pipe(
      catchError(this.handleError)
    );
  }

  getActiveUsers(state: string, city: string): Observable<any> {
    return this.http.post<any>(`${this.baseURL}active-user-asset`, { state, city }).pipe(
      catchError(this.handleError)
    );
  }




  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}

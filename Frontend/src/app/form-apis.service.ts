import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { submitForm } from './submit.model';

@Injectable({
  providedIn: 'root'
})

export class FormAPIsService {

  baseURL = 'http://localhost:8002/';
  // baseURL = 'http://50.6.202.250:8002/';
  

  constructor(private http: HttpClient) { }

  submitFormData(data: FormData): Observable<any> {
    const url = `${this.baseURL}api/admin/create-mock`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }

  editFormData(data: FormData): Observable<any> {
    const url = `${this.baseURL}api/admin/fetch-mock-single`;
    return this.http.post<any>(url, data).pipe(
      catchError(this.handleError)
    );
  }
  
  updateFormData(formData: FormData): Observable<any> {
    const url = `${this.baseURL}api/admin/update-mock`;  // Ensure baseURL is properly defined
    return this.http.post<any>(url, formData).pipe(
      catchError(this.handleError)  // Gracefully handle errors
    );
  }  

  fetchAllData(data: any): Observable<any> {
    const url = `${this.baseURL}api/admin/fetch-mock`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
  }

  deleteUser(id: number): Observable<any> {
    const payload = { id }; // Send id in the payload
    return this.http.post(`${this.baseURL}api/admin/delete-mock`, payload);
  }

  importData(data: any): Observable<any> {
    const url = `${this.baseURL}api/admin/create-mock1`;
    return this.http.post<any>(url, data).pipe(catchError(this.handleError));
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

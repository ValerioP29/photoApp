import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private apiUrl= 'https://jsonplaceholder.typicode.com/photos';


  constructor(private http: HttpClient) {}

  //metodo per ottenere tutte le foto
  getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>('https://jsonplaceholder.typicode.com/photos/invalid')// rimuovi e torna a funzionare
    .pipe(catchError(this.handleError))
  }
// cancella tramtie id
  deletePhoto (id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //gestione errori
  private handleError(error: HttpErrorResponse){
    console.error("Errore chiamata HTTP:", error)
    return throwError(() => new Error("Qualcosa è andato storto, riprova più tardi."));
  }
}


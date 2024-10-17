import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { LikeService } from '../../services/like.service';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrl: './photo-list.component.scss'
})
export class PhotoListComponent implements OnInit{
  photos: Photo[] = [];
  likedCount=0;
  errorMessage: string | null=null;


  constructor (private photoService: PhotoService, private likeService: LikeService){}

  ngOnInit(): void {
    this.loadPhotos();

    // Osserva i cambiamenti nel contatore dei "mi piace" e aggiorna il valore di 'likedCount'
    this.likeService.getLikedPhotosCount().subscribe({
      next: (count: number) => {
        this.likedCount = count;  // Aggiorna il contatore quando il valore cambia
      },
      error: (error: any) => {
        this.errorMessage = 'Errore nel recuperare il contatore di Mi Piace';
        console.error(error);
      }
    });
  }

  loadPhotos() {
    // Chiede al PhotoService di recuperare le foto
    this.photoService.getPhotos().subscribe({
      next: (data: Photo[]) => {
        this.photos = data;  // Popola l'array delle foto con i dati ricevuti
      },
      error: (error) => {
        this.errorMessage = 'Errore durante il recupero delle foto';
        console.error(error);
      }
    });
  }

  deletePhoto(id: number) {
    // Chiede al PhotoService di eliminare una foto tramite il suo ID
    this.photoService.deletePhoto(id).subscribe({
      next: () => {
        this.photos = this.photos.filter(photo => photo.id !== id);  // Rimuove la foto dall'array
        console.log('Photo deleted:', id); },
      error: (error) => {
        this.errorMessage = 'Errore durante la cancellazione della foto';
        console.error(error);
      }
    });
  }

  likePhoto(id: number) {
    console.log('Like button clicked for photo ID:', id);

    // Incrementa il contatore di "mi piace" per la foto specificata tramite il suo ID
    this.likeService.likePhoto(id);
  }
}

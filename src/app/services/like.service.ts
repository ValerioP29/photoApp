import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private likedPhotos = new Set<number>();
  private likeSubject = new BehaviorSubject<number>(0);

  likePhoto(photoId: number): void {
    if (!this.likedPhotos.has(photoId)) {
      this.likedPhotos.add(photoId);
      this.likeSubject.next(this.likedPhotos.size);
    }
  }

  unlikePhoto(photoId: number): void {
    if (this.likedPhotos.has(photoId)) {
      this.likedPhotos.delete(photoId);
      this.likeSubject.next(this.likedPhotos.size);
    }
  }

  getLikedPhotosCount() {
    return this.likeSubject.asObservable();
  }
}


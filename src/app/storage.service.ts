import { Injectable, NgZone } from '@angular/core';
import {
  Storage,
  ref,
  deleteObject,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  percentage,
  getDownloadURL,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  uploadPercent?: Observable<number>;
    public url:any;
constructor(private storage: Storage) { }

async upload(
  folder: string,
  name: string,
  file: File | null
): Promise<string> {

  const ext = file!.name.split('.').pop();
  const path = `${folder}/${name}.${ext}`; {

  if (file) {
    try {
      const storageRef = ref(this.storage, path);
      const task = uploadBytesResumable(storageRef, file);
      // this.uploadPercent = percentage(task);
      await task;
      this.url = await getDownloadURL(storageRef);
    } catch(e: any) {
      console.error(e);
    }   
  } else {
    // handle invalid file
  }
  return this.url;
}
}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Image } from '../domain/image';

@Injectable()
export class ImageService {

    constructor(private http: HttpClient) { }

    getImages() {
    return this.http.get<any>('assets/showcase/data/galleria.json')
      .toPromise()
      .then(res => <Image[]>res.data)
      .then(data => { return data; });
    }
}
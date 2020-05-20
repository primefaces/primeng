import {Component, OnInit, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { PhotoService } from '../../service/photoservice';import { Galleria } from 'primeng/galleria';

@Component({
    templateUrl: './galleriademo.html'
})
export class GalleriaDemo implements OnInit {
    
    images: any[];

    constructor(private photoService: PhotoService) { }

    responsiveOptions:any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    ngOnInit() {
        this.photoService.getImages().then(images => this.images = images);
    }
}
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ImageService } from '../../service/imageservice';

@Component({
    templateUrl: './galleriacirculardemo.html'
})
export class GalleriaCircularDemo implements OnInit {
    
    images: any[];

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

    constructor(private imageService: ImageService) { }

    ngOnInit() {
        this.imageService.getImages().then(images => this.images = images)
    }
}
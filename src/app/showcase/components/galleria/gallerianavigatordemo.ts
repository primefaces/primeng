import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { PhotoService } from '../../service/photoservice';
@Component({
    templateUrl: './gallerianavigatordemo.html'
})
export class GalleriaNavigatorDemo implements OnInit {
    
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

    constructor(private photoService: PhotoService) { }

    ngOnInit() {
        this.photoService.getImages().then(images =>{ 
            this.images = images
        })
    }
}
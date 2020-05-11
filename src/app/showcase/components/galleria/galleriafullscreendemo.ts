import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ImageService } from '../../service/imageservice';

@Component({
    templateUrl: './galleriafullscreendemo.html'
})
export class GalleriaFullscreenDemo implements OnInit {
    
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

    responsiveOptions2:any[] = [
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    displayBasic: boolean;

    displayBasic2: boolean;

    displayCustom: boolean;

    activeIndex: number = 0;

    constructor(private imageService: ImageService) { }

    ngOnInit() {
        this.imageService.getImages().then(images =>{ 
            this.images = images
        })
    }

    imageClick(index: number) {
        this.activeIndex = index;
        this.displayCustom = true;
    }
}
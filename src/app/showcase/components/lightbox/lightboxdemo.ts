import {Component} from '@angular/core';

@Component({
    templateUrl: './lightboxdemo.html'
})
export class LightboxDemo {

    images: any[];

    constructor() {
        this.images = [];
        this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos1.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos1_small.jpg', title:'Sopranos 1'});
        this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos2.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos2_small.jpg', title:'Sopranos 2'});
        this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos3.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos3_small.jpg', title:'Sopranos 3'});
        this.images.push({source:'assets/showcase/images/demo/sopranos/sopranos4.jpg', thumbnail: 'assets/showcase/images/demo/sopranos/sopranos4_small.jpg', title:'Sopranos 4'});
    }
}
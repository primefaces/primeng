import {Component} from '@angular/core';

@Component({
    templateUrl: 'showcase/demo/lightbox/lightboxdemo.html'
})
export class LightboxDemo {

    images: any[];

    constructor() {
        this.images = [];
        this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos1.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos1_small.jpg', title:'Sopranos 1'});
        this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos2.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos2_small.jpg', title:'Sopranos 2'});
        this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos3.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos3_small.jpg', title:'Sopranos 3'});
        this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos4.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos4_small.jpg', title:'Sopranos 4'});
    }
}
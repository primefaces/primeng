import {Component} from '@angular/core';
import {Lightbox} from '../../../components/lightbox/lightbox';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    templateUrl: 'showcase/demo/lightbox/lightboxdemo.html',
    directives: [Lightbox,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
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
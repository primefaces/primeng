import {Component} from 'angular2/core';
import {Galleria} from '../../../components/galleria/galleria';
import {GalleriaImages} from '../../../components/galleria/galleria';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/galleria/galleriademo.html',
    directives: [Galleria,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class GalleriaDemo {
    images: GalleriaImages[];
    
    constructor() {
        setTimeout(() => {
            this.images = [];
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria1.jpg', alt:'1', title:'Image 1'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria2.jpg', alt:'2', title:'Image 2'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria3.jpg', alt:'3', title:'Image 3'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria4.jpg', alt:'4', title:'Image 4'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria5.jpg', alt:'5', title:'Image 5'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria6.jpg', alt:'6', title:'Image 6'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria7.jpg', alt:'7', title:'Image 7'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria8.jpg', alt:'8', title:'Image 8'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria9.jpg', alt:'9', title:'Image 9'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria10.jpg', alt:'10', title:'Image 10'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria11.jpg', alt:'11', title:'Image 11'});
            this.images.push({source:'showcase/resources/demo/images/galleria/galleria12.jpg', alt:'12', title:'Image 12'});
        }, 2050);
    }
    
    update() {
        this.images = [];
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria2.jpg', alt:'2', title:'Image 2'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria6.jpg', alt:'6', title:'Image 6'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria11.jpg', alt:'11', title:'Image 11'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria5.jpg', alt:'5', title:'Image 5'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria4.jpg', alt:'4', title:'Image 4'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria12.jpg', alt:'12', title:'Image 12'});
    }
}
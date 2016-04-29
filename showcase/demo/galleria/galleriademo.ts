import {Component} from 'angular2/core';
import {Galleria} from '../../../components/galleria/galleria';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/galleria/galleriademo.html',
    directives: [Galleria,TabView,TabPanel,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class GalleriaDemo {
    
    images: any[];
    
    constructor() {
        this.images = [];
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria1.jpg', alt:'Description for Image 1', title:'Title 1'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria2.jpg', alt:'Description for Image 2', title:'Title 2'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria3.jpg', alt:'Description for Image 3', title:'Title 3'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria4.jpg', alt:'Description for Image 4', title:'Title 4'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria5.jpg', alt:'Description for Image 5', title:'Title 5'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria6.jpg', alt:'Description for Image 6', title:'Title 6'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria7.jpg', alt:'Description for Image 7', title:'Title 7'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria8.jpg', alt:'Description for Image 8', title:'Title 8'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria9.jpg', alt:'Description for Image 9', title:'Title 9'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria10.jpg', alt:'Description for Image 10', title:'Title 10'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria11.jpg', alt:'Description for Image 11', title:'Title 11'});
        this.images.push({source:'showcase/resources/demo/images/galleria/galleria12.jpg', alt:'Description for Image 12', title:'Title 12'});
        
        setTimeout(() => {
            
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
import {Component} from 'angular2/core';
import {Galleria} from '../../components/galleria/galleria';
import {TabView} from '../../components/tabview/tabview';
import {TabPanel} from '../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: '/app/demo/galleria/galleriademo.component.html',
    directives: [Galleria,TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class GalleriaDemoComponent {

    images: string[] = ['galleria1.jpg', 'galleria2.jpg', 'galleria3.jpg', 'galleria4.jpg', 'galleria5.jpg', 'galleria6.jpg', 'galleria7.jpg', 'galleria8.jpg',
        'galleria9.jpg', 'galleria10.jpg', 'galleria11.jpg', 'galleria12.jpg'];
}
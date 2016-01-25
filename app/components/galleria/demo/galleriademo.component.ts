import {Component} from 'angular2/core';
import {GalleriaComponent} from '../galleria.component';
import {TabViewComponent} from '../../tabview/tabview.component';
import {TabPanelComponent} from '../../tabview/tabpanel.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: '/app/components/galleria/demo/galleriademo.component.html',
    directives: [GalleriaComponent,TabViewComponent,TabPanelComponent,ROUTER_DIRECTIVES]
})
export class GalleriaDemoComponent {

    images: string[] = ['galleria1.jpg', 'galleria2.jpg', 'galleria3.jpg', 'galleria4.jpg', 'galleria5.jpg', 'galleria6.jpg', 'galleria7.jpg', 'galleria8.jpg',
        'galleria9.jpg', 'galleria10.jpg', 'galleria11.jpg', 'galleria12.jpg'];
}
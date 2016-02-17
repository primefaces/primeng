import {Component} from 'angular2/core';
import {Lightbox} from '../../../components/lightbox/lightbox';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/lightbox/lightboxdemo.html',
    directives: [Lightbox,TabView,TabPanel,ROUTER_DIRECTIVES]
})
export class LightboxDemo {

    images: string[] = ['sopranos1', 'sopranos2', 'sopranos3', 'sopranos4'];
}
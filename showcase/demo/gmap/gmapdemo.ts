import {Component,OnInit} from 'angular2/core';
import {GMap} from '../../../components/gmap/gmap';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {ROUTER_DIRECTIVES} from 'angular2/router';

declare var google: any;

@Component({
    templateUrl: 'showcase/demo/gmap/gmapdemo.html',
    directives: [GMap,TabPanel,TabView,Button,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class GMapDemo implements OnInit {

    options: any;
    
    markers: any[];
    
    ngOnInit() {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 13
        };
        
        this.markers = [
            new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
            new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
            new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"})
        ];
    }
}
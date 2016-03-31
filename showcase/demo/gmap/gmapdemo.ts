import {Component,OnInit} from 'angular2/core';
import {GMap} from '../../../components/gmap/gmap';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {Dialog} from '../../../components/dialog/dialog';
import {InputText} from '../../../components/inputtext/inputtext';
import {Footer} from '../../../components/common/footer';
import {ROUTER_DIRECTIVES} from 'angular2/router';

declare var google: any;

@Component({
    templateUrl: 'showcase/demo/gmap/gmapdemo.html',
    directives: [GMap,TabPanel,TabView,Button,Dialog,InputText,Footer,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class GMapDemo implements OnInit {

    options: any;
    
    markers: any[];
    
    dialogVisible: boolean;
    
    markerTitle: string;
    
    selectedPosition: any;
    
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
    
    handleMapClick(event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
        console.log(this.selectedPosition);
    }
    
    addMarker() {
        this.markers.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle}));
        this.markerTitle = null;
        this.dialogVisible = false;
    }
    
    clear() {
        this.markers = [];
    }
}
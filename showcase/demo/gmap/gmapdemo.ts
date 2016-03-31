import {Component,OnInit} from 'angular2/core';
import {GMap} from '../../../components/gmap/gmap';
import {CodeHighlighter} from '../../../components/codehighlighter/codehighlighter';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {Dialog} from '../../../components/dialog/dialog';
import {Growl} from '../../../components/growl/growl';
import {InputText} from '../../../components/inputtext/inputtext';
import {Footer} from '../../../components/common/footer';
import {Message} from '../../../components/api/message';
import {ROUTER_DIRECTIVES} from 'angular2/router';

declare var google: any;

@Component({
    templateUrl: 'showcase/demo/gmap/gmapdemo.html',
    directives: [GMap,TabPanel,TabView,Button,Dialog,InputText,Growl,Footer,CodeHighlighter,ROUTER_DIRECTIVES]
})
export class GMapDemo implements OnInit {

    options: any;
    
    overlays: any[];
    
    dialogVisible: boolean;
    
    markerTitle: string;
    
    selectedPosition: any;
    
    msgs: Message[] = [];

    ngOnInit() {
        this.options = {
            center: {lat: 36.890257, lng: 30.707417},
            zoom: 12
        };
        
        this.add();
    }
    
    handleMapClick(event) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    }
    
    handleOverlayClick(event) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Overlay Selected', detail: event.overlay.getTitle ? event.overlay.getTitle() : 'Shape'});
    }
    
    addMarker() {
        this.overlays.push(new google.maps.Marker({position:{lat: this.selectedPosition.lat(), lng: this.selectedPosition.lng()}, title:this.markerTitle}));
        this.markerTitle = null;
        this.dialogVisible = false;
    }
    
    add() {
        if(!this.overlays||!this.overlays.length) {
            this.overlays = [
                new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
                new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
                new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
                new google.maps.Polygon({paths: [
                    {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
                ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
                new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
            ];
        }
    }
    
    clear() {
        this.overlays = [];
    }
}
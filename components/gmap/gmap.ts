import {Component,ElementRef,OnInit,AfterViewInit,DoCheck,OnDestroy,Input,Output,EventEmitter,IterableDiffers} from 'angular2/core';

declare var google: any;

@Component({
    selector: 'p-gmap',
    template: `<div [attr.style]="style" [attr.class]="styleClass"></div>`
})
export class GMap implements AfterViewInit,DoCheck {

    @Input() style: string;
        
    @Input() styleClass: string;
    
    @Input() options: any;
    
    @Input() markers: any[];
    
    differ: any;
    
    map: any;

    constructor(private el: ElementRef,differs: IterableDiffers) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        
        if(this.markers) {
            for(let marker of this.markers) {
                marker.setMap(this.map);
            }
        }
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.markers);
        
        if(changes) {
            changes.forEachRemovedItem((record) => {record.item.setMap(null)});
            changes.forEachRemovedItem((record) => {record.item.setMap(this.map)});
        }
    }

}
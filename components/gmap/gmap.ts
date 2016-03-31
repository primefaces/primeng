import {Component,ElementRef,OnInit,AfterViewInit,OnDestroy,Input,Output,EventEmitter} from 'angular2/core';

declare var google: any;

@Component({
    selector: 'p-gmap',
    template: `<div [attr.style]="style" [attr.class]="styleClass"></div>`
})
export class GMap implements AfterViewInit {

    @Input() style: string;
        
    @Input() styleClass: string;
    
    @Input() options: any;
    
    @Input() markers: any[];

    constructor(private el: ElementRef) {}
    
    map: any;

    ngAfterViewInit() {
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        
        if(this.markers) {
            for(let marker of this.markers) {
                marker.setMap(this.map);
            }
        }
    }

}
import {Component,ElementRef,OnInit,AfterViewInit,DoCheck,OnDestroy,Input,Output,EventEmitter,IterableDiffers,ChangeDetectorRef,NgZone} from 'angular2/core';

declare var google: any;

@Component({
    selector: 'p-gmap',
    template: `<div [attr.style]="style" [attr.class]="styleClass"></div>`
})
export class GMap implements AfterViewInit,DoCheck {

    @Input() style: string;
        
    @Input() styleClass: string;
    
    @Input() options: any;
    
    @Input() overlays: any[];
    
    @Output() onMapClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onOverlayClick: EventEmitter<any> = new EventEmitter();
    
    differ: any;
    
    map: any;

    constructor(private el: ElementRef,differs: IterableDiffers, private cd: ChangeDetectorRef, private zone:NgZone) {
        this.differ = differs.find([]).create(null);
    }

    ngAfterViewInit() {
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        
        if(this.overlays) {
            for(let overlay of this.overlays) {
                overlay.setMap(this.map);
                
                overlay.addListener('click', (event) => {
                    console.log('click');
                    this.zone.run(() => {
                        this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: overlay
                        });
                    });
                });
            }
        }
        
        this.map.addListener('click', (event) => {
            this.zone.run(() => {
                this.onMapClick.emit(event);
            });
        });
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.overlays);
        
        if(changes) {
            changes.forEachRemovedItem((record) => {record.item.setMap(null)});
            changes.forEachAddedItem((record) => {
                record.item.setMap(this.map);
                
                record.item.addListener('click', (event) => {
                    this.zone.run(() => {
                        this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item
                        });
                    });
                });
            });
        }
    }

}
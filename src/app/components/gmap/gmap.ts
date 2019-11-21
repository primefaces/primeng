import {NgModule,Component,ElementRef,OnInit,AfterViewChecked,DoCheck,OnDestroy,Input,Output,EventEmitter,IterableDiffers,ChangeDetectorRef,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';

declare var google: any;

@Component({
    selector: 'p-gmap',
    template: `<div [ngStyle]="style" [class]="styleClass"></div>`
})
export class GMap implements AfterViewChecked,DoCheck {

    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Input() options: any;
    
    @Input() overlays: any[];
    
    @Output() onMapClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onOverlayClick: EventEmitter<any> = new EventEmitter();

    @Output() onOverlayDblClick: EventEmitter<any> = new EventEmitter();
    
    @Output() onOverlayDragStart: EventEmitter<any> = new EventEmitter();
    
    @Output() onOverlayDrag: EventEmitter<any> = new EventEmitter();
    
    @Output() onOverlayDragEnd: EventEmitter<any> = new EventEmitter();
    
    @Output() onMapReady: EventEmitter<any> = new EventEmitter();

    @Output() onMapDragEnd: EventEmitter<any> = new EventEmitter();
   
    @Output() onZoomChanged: EventEmitter<any> = new EventEmitter();

    differ: any;
    
    map: any;

    constructor(public el: ElementRef,differs: IterableDiffers, public cd: ChangeDetectorRef, public zone:NgZone) {
        this.differ = differs.find([]).create(null);
    }
    
    ngAfterViewChecked() {
        if(!this.map && this.el.nativeElement.offsetParent) {
            this.initialize();
        }
    }
    
    initialize() {
        this.map = new google.maps.Map(this.el.nativeElement.children[0], this.options);
        this.onMapReady.emit({
            map: this.map
        });
        
        if(this.overlays) {
            for(let overlay of this.overlays) {
                overlay.setMap(this.map);
                this.bindOverlayEvents(overlay);
            }
        }
        
        this.map.addListener('click', (event) => {
            this.zone.run(() => {
                this.onMapClick.emit(event);
            });
        });

        this.map.addListener('dragend', (event) => {
            this.zone.run(() => {
                this.onMapDragEnd.emit(event);
            });
        });

        this.map.addListener('zoom_changed', (event) => {
            this.zone.run(() => {
                this.onZoomChanged.emit(event);
            });
        });
    }
    
    bindOverlayEvents(overlay: any) {
        overlay.addListener('click', (event) => {
            this.zone.run(() => {
                this.onOverlayClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: this.map
                });
            });
        });

        overlay.addListener('dblclick', (event) => {
            this.zone.run(() => {
                this.onOverlayDblClick.emit({
                    originalEvent: event,
                    'overlay': overlay,
                    map: this.map
                });
            });
        });
        
        if(overlay.getDraggable()) {
            this.bindDragEvents(overlay);
        }
    }
    
    ngDoCheck() {
        let changes = this.differ.diff(this.overlays);
        
        if(changes && this.map) {
            changes.forEachRemovedItem((record) => {
                google.maps.event.clearInstanceListeners(record.item);
                record.item.setMap(null);
            });

            changes.forEachAddedItem((record) => {
                record.item.setMap(this.map);
                record.item.addListener('click', (event) => {
                    this.zone.run(() => {
                        this.onOverlayClick.emit({
                            originalEvent: event,
                            overlay: record.item,
                            map: this.map
                        });
                    });
                });
                
                if(record.item.getDraggable()) {
                    this.bindDragEvents(record.item);
                }
            });
        }
    }
    
    bindDragEvents(overlay) {
        overlay.addListener('dragstart', (event) => {
            this.zone.run(() => {
                this.onOverlayDragStart.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
        
        overlay.addListener('drag', (event) => {
            this.zone.run(() => {
                this.onOverlayDrag.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
        
        overlay.addListener('dragend', (event) => {
            this.zone.run(() => {
                this.onOverlayDragEnd.emit({
                    originalEvent: event,
                    overlay: overlay,
                    map: this.map
                });
            });
        });
    }
    
    getMap() {
        return this.map;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [GMap],
    declarations: [GMap]
})
export class GMapModule { }
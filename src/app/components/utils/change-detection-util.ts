import { NgZone, Injectable } from '@angular/core';

@Injectable()
export class ChangeDetectionUtil{

    constructor(private zone: NgZone){}

    addEventOutsideAngularChangeDetection<K extends keyof DocumentEventMap>(type: K, target: any, event: Function){
        this.zone.runOutsideAngular(() => {
            target.addEventListener(type, event);
        })
    }

    addEventsOutsideAngularChangeDetection(events: { type: any, value: Function }[], target: any){
        events.forEach(event => {
            this.addEventOutsideAngularChangeDetection(event.type, target, event.value)
        })
    }
}
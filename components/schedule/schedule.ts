import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter,ContentChild,TemplateRef} from 'angular2/core';
import {SelectItem} from '../api/selectitem';

@Component({
    selector: 'p-schedule',
    template: `
        <div></div>
    `
})
export class Schedule {

    initialized: boolean;

    @Input() events: any;

    @Input() style: string;

    @Input() styleClass: string;
    
    stopNgOnChangesPropagation: boolean;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        jQuery(this.el.nativeElement.children[0]).fullCalendar({
            theme: true
        });
        this.initialized = true;
    }

    ngOnChanges(changes: { [key: string]: SimpleChange}) {
        /*if (this.initialized) {
            for (var key in changes) {
                if (key == 'value' && this.stopNgOnChangesPropagation) {
                    this.stopNgOnChangesPropagation = false;
                    continue;
                }

                jQuery(this.el.nativeElement.children[0].children[0].children[0]).puilistbox('option', key, changes[key].currentValue);
            }
        }*/
    }

    ngOnDestroy() {
        jQuery(this.el.nativeElement.children[0]).fullCalendar('destroy');
        this.initialized = false;
    }

}
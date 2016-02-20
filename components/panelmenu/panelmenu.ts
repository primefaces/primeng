import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [attr.class]="styleClass" [attr.style]="style" [ngClass]="{'ui-panelmenu ui-widget':true}">
            <ng-content></ng-content>
        </div>
    `
})
export class PanelMenu {

    @Input() stateful: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: JQuery;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).children('div');
        this.menuElement.puipanelmenu({
            enhanced: true,
            stateful: this.stateful
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puipanelmenu('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puipanelmenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    }

}

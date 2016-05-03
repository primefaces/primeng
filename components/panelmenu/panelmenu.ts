import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from '@angular/core';

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [attr.style]="style" [ngClass]="{'ui-panelmenu ui-widget':true}">
            <ng-content></ng-content>
        </div>
    `
})
export class PanelMenu {

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).children('div');
        this.menuElement.puipanelmenu({
            enhanced: true
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

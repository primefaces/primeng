import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-breadcrumb',
    template: `
        <div [class]="styleClass" [attr.style]="style" [ngClass]="{'ui-breadcrumb ui-widget ui-widget-header ui-helper-clearfix ui-corner-all':true}">
            <ng-content></ng-content>
        </div>
    `
})
export class Breadcrumb {

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > ul');
        this.menuElement.puibreadcrumb({
            enhanced: true
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puibreadcrumb('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puibreadcrumb('destroy');
        this.initialized = false;
        this.menuElement = null;
    }
}
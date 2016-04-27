import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-menu',
    template: `
        <div [class]="styleClass" [attr.style]="style" [ngClass]="{'ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}">
            <ng-content></ng-content>
        </div>
    `
})
export class Menu {

    @Input() popup: boolean;

    @Input() trigger: any;

    @Input() my: string;

    @Input() at: string;

    @Input() triggerEvent: string;

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > ul');
        this.menuElement.puimenu({
            enhanced: true,
            popup: this.popup,
            trigger: this.trigger ? jQuery(this.trigger): null,
            my: this.my,
            at: this.at,
            triggerEvent: this.triggerEvent
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puimenu('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puimenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    }

}
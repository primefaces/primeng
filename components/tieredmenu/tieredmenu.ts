import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-tieredMenu',
    template: `
        <div [attr.class]="styleClass" [attr.style]="style" [ngClass]="{'ui-tieredmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}">
            <ng-content></ng-content>
        </div>
    `
})
export class TieredMenu {

    @Input() popup: boolean;

    @Input() trigger: any;

    @Input() my: string;

    @Input() at: string;

    @Input() triggerEvent: string;

    @Input() autoDisplay: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > ul');
        this.menuElement.puitieredmenu({
            enhanced: true,
            popup: this.popup,
            trigger: this.trigger ? jQuery(this.trigger): null,
            my: this.my,
            at: this.at,
            autoDisplay: this.autoDisplay,
            triggerEvent: this.triggerEvent
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puitieredmenu('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puitieredmenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    }

}
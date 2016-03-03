import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-megaMenu',
    template: `
        <div [attr.class]="styleClass" [attr.style]="style"
            [ngClass]="{'ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-megamenu-vertical': orientation == 'vertical'}">
            <div tabindex="0" class="ui-helper-hidden-accessible"></div>
            <ng-content></ng-content>
        </div>
    `
})
export class MegaMenu {

    @Input() autoDisplay: boolean;

    @Input() orientation: string;

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).children('div');
        this.menuElement.puimegamenu({
            enhanced: true,
            autoDisplay: this.autoDisplay,
            orientation: this.orientation
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puimegamenu('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puimegamenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    }

}
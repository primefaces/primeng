import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-contextMenu',
    template: `
        <div [class]="styleClass" [attr.style]="style" [ngClass]="{'ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-contextmenu ui-menu-dynamic ui-shadow':true}">
            <ng-content></ng-content>
        </div>
    `
})
export class ContextMenu {
    
    @Input() global: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: any;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > ul');
        this.menuElement.puicontextmenu({
            target: this.global ? document : null,
            enhanced: true
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puicontextmenu('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puicontextmenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    }
    
    show(event) {
        this.menuElement.puicontextmenu('show', event);
    }

}
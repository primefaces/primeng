import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-slideMenu',
    template: `
        <div [attr.class]="styleClass" [attr.style]="style" [ngClass]="{'ui-menu ui-slidemenu ui-widget ui-widget-content ui-corner-all':true}">
            <div class="ui-slidemenu-wrapper">
                <div class="ui-slidemenu-content">
                    <ng-content></ng-content>
                </div>
                <div class="ui-slidemenu-backward ui-widget-header ui-corner-all">
                    <span class="fa fa-fw fa-caret-left"></span>{{backLabel}}
                </div>
            </div>
        </div>
    `
})
export class SlideMenu {

    @Input() popup: boolean;

    @Input() trigger: any;

    @Input() my: string;

    @Input() at: string;

    @Input() triggerEvent: string;

    @Input() backLabel: string = 'Back';

    @Input() style: string;

    @Input() styleClass: string;

    initialized: boolean;

    menuElement: JQuery;

    constructor(private el: ElementRef) {
        this.initialized = false;
    }

    ngAfterViewInit() {
        this.menuElement = jQuery(this.el.nativeElement).find('> div > div > div > ul');
        this.menuElement.puislidemenu({
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
                this.menuElement.puislidemenu('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puislidemenu('destroy');
        this.initialized = false;
        this.menuElement = null;
    }

}
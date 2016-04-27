import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from 'angular2/core';

@Component({
    selector: 'p-menubar',
    template: `
        <div [class]="styleClass" [attr.style]="style" [ngClass]="{'ui-menubar ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true}">
            <ng-content></ng-content>
        </div>
    `
})
export class Menubar {

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
        this.menuElement.puimenubar({
            enhanced: true,
            autoDisplay: this.autoDisplay
        });
        this.initialized = true;
    }

    ngOnChanges(changes: {[key: string]: SimpleChange}) {
        if (this.initialized) {
            for (var key in changes) {
                this.menuElement.puimenubar('option', key, changes[key].currentValue);
            }
        }
    }

    ngOnDestroy() {
        this.menuElement.puimenubar('destroy');
        this.initialized = false;
        this.menuElement = null;
    }

}
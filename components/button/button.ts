import { NgModule, Directive, ElementRef, AfterViewInit, OnDestroy, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';
import { DomHandler } from '../dom/domhandler';
import { CommonModule } from '@angular/common';

@Directive({
    selector: '[pButton]',
    host: {
        '[class.ui-state-hover]': 'hover&&!isDisabled()',
        '[class.ui-state-focus]': 'focus',
        '[class.ui-state-active]': 'active',
        '[class.ui-state-disabled]': 'isDisabled()'
    },
    providers: [DomHandler]
})
export class Button implements AfterViewInit, OnDestroy {

    @Input() icon: string;

    @Input() iconPos: string = 'left';

    @Input() cornerStyleClass: string = 'ui-corner-all';

    public _label: string;

    public hover: boolean;

    public focus: boolean;

    public active: boolean;

    public initialized: boolean;

    private iconElement: HTMLElement;
    private labelElement: HTMLElement;

    constructor(public el: ElementRef, public domHandler: DomHandler) { }

    ngAfterViewInit() {
        this.domHandler.addMultipleClasses(this.el.nativeElement, this.getStyleClass());
        if (this.icon) {
            this.iconElement = document.createElement("span");
            this.el.nativeElement.appendChild(this.iconElement);
        }

        this.labelElement = document.createElement("span");
        this.labelElement.className = 'ui-button-text ui-c';
        this.labelElement.appendChild(document.createTextNode(this.label || 'ui-button'));
        this.el.nativeElement.appendChild(this.labelElement);
        this.initialized = true;
        this.applyIconStyle();
    }

    ngOnChanges(changes: SimpleChanges) {
        //console.log(changes);
        this.applyIconStyle(changes);
    }


    applyIconStyle(changes?: SimpleChanges) {
        if (this.initialized) {
            if (this.iconElement) {
                if ((changes) && (changes['iconPos'])) {
                    this.domHandler.removeClass(this.el.nativeElement, 'ui-button-text-icon-' + changes['iconPos'].previousValue);
                    this.domHandler.addClass(this.el.nativeElement, 'ui-button-text-icon-' + changes['iconPos'].currentValue);
                }
                let iconPosClass = (this.iconPos == 'right') ? 'ui-button-icon-right' : 'ui-button-icon-left';
                this.iconElement.className = iconPosClass + ' ui-c fa fa-fw ' + this.icon;
            }
        }
    }

    @HostListener('mouseenter', ['$event'])
    onMouseenter(e: Event) {
        this.hover = true;
    }

    @HostListener('mouseleave', ['$event'])
    onMouseleave(e: Event) {
        this.hover = false;
        this.active = false;
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(e: Event) {
        this.active = true;
    }

    @HostListener('mouseup', ['$event'])
    onMouseUp(e: Event) {
        this.active = false;
    }

    @HostListener('focus', ['$event'])
    onFocus(e: Event) {
        this.focus = true;
    }

    @HostListener('blur', ['$event'])
    onBlur(e: Event) {
        this.focus = false;
    }

    isDisabled() {
        return this.el.nativeElement.disabled;
    }

    getStyleClass(): string {
        let styleClass = 'ui-button ui-widget ui-state-default ' + this.cornerStyleClass;
        if (this.icon) {
            if (this.label != null && this.label != undefined) {
                if (this.iconPos == 'left')
                    styleClass = styleClass + ' ui-button-text-icon-left';
                else
                    styleClass = styleClass + ' ui-button-text-icon-right';
            }
            else {
                styleClass = styleClass + ' ui-button-icon-only';
            }
        }
        else {
            styleClass = styleClass + ' ui-button-text-only';
        }

        return styleClass;
    }

    @Input() get label(): string {
        return this._label;
    }

    set label(val: string) {
        this._label = val;

        if (this.initialized) {
            this.domHandler.findSingle(this.el.nativeElement, '.ui-button-text').textContent = this._label;
        }
    }

    ngOnDestroy() {
        while (this.el.nativeElement.hasChildNodes()) {
            this.el.nativeElement.removeChild(this.el.nativeElement.lastChild);
        }

        this.initialized = false;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Button],
    declarations: [Button]
})
export class ButtonModule { }
import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Directive, ElementRef, Inject, Input, NgModule, OnDestroy, Renderer2, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';

type BadgeDirectiveIconPosition = 'left' | 'right' | 'top' | 'bottom';
type BadgeSize = 'large' | 'xlarge';

@Directive({
    selector: '[pBadge]',
    host: {
        class: 'p-element'
    }
})
export class BadgeDirective implements AfterViewInit, OnDestroy {
    /**
     * Icon position of the component.
     */
    @Input() iconPos: BadgeDirectiveIconPosition = 'left';
    /**
     * When specified, disables the component.
     */
    @Input('badgeDisabled') get disabled(): boolean {
        return this._disabled;
    }
    set disabled(val: boolean) {
        this._disabled = val;
    }
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     */
    @Input() public get size(): BadgeSize | undefined {
        return this._size;
    }
    set size(val: BadgeSize) {
        this._size = val;

        if (this.initialized) {
            this.setSizeClasses();
        }
    }

    public _value: string;

    public initialized: boolean;

    private id: string;

    private _disabled: boolean = false;

    private _size: BadgeSize;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, private renderer: Renderer2) {}

    ngAfterViewInit() {
        this.id = UniqueComponentId() + '_badge';
        let el = this.el.nativeElement.nodeName.indexOf('-') != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;

        if (this._disabled) {
            return null;
        }

        let badge = this.document.createElement('span');
        badge.id = this.id;
        badge.className = 'p-badge p-component';

        if (this.severity) {
            DomHandler.addClass(badge, 'p-badge-' + this.severity);
        }

        this.setSizeClasses(badge);

        if (this.value != null) {
            this.renderer.appendChild(badge, this.document.createTextNode(this.value));

            if (String(this.value).length === 1) {
                DomHandler.addClass(badge, 'p-badge-no-gutter');
            }
        } else {
            DomHandler.addClass(badge, 'p-badge-dot');
        }

        DomHandler.addClass(el, 'p-overlay-badge');
        this.renderer.appendChild(el, badge);

        this.initialized = true;
    }
    /**
     * Value to display inside the badge.
     *
     */
    @Input() get value(): string | null | undefined {
        return this._value;
    }

    set value(val: string) {
        if (val !== this._value) {
            this._value = val;

            if (this.initialized) {
                let badge = document.getElementById(this.id);

                if (this._value) {
                    if (DomHandler.hasClass(badge, 'p-badge-dot')) DomHandler.removeClass(badge, 'p-badge-dot');

                    if (String(this._value).length === 1) {
                        DomHandler.addClass(badge, 'p-badge-no-gutter');
                    } else {
                        DomHandler.removeClass(badge, 'p-badge-no-gutter');
                    }
                } else if (!this._value && !DomHandler.hasClass(badge, 'p-badge-dot')) {
                    DomHandler.addClass(badge, 'p-badge-dot');
                }

                badge.innerHTML = '';
                this.renderer.appendChild(badge, document.createTextNode(this._value));
            }
        }
    }
    /**
     * Severity type of the badge.
     */
    @Input() severity: 'success' | 'info' | 'warning' | 'danger' | null | undefined;

    private setSizeClasses(element?: HTMLElement): void {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        if (this._size) {
            if (this._size === 'large') {
                DomHandler.addClass(badge, 'p-badge-lg');
                DomHandler.removeClass(badge, 'p-badge-xl');
            }

            if (this._size === 'xlarge') {
                DomHandler.addClass(badge, 'p-badge-xl');
                DomHandler.removeClass(badge, 'p-badge-lg');
            }
        } else {
            DomHandler.removeClass(badge, 'p-badge-lg');
            DomHandler.removeClass(badge, 'p-badge-xl');
        }
    }

    ngOnDestroy() {
        this.initialized = false;
    }
}

@Component({
    selector: 'p-badge',
    template: ` <span *ngIf="!badgeDisabled" [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">{{ value }}</span> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./badge.css'],
    host: {
        class: 'p-element'
    }
})
export class Badge {
    /**
     * Class of the element.
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     */
    @Input() style: CSSStyleDeclaration | undefined;
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     */
    @Input() size: BadgeSize | undefined;
    /**
     * Severity type of the badge.
     */
    @Input() severity: 'success' | 'info' | 'warning' | 'danger' | null | undefined;
    /**
     * Value to display inside the badge.
     *
     */
    @Input() value: string | null | undefined;
    /**
     * When specified, disables the component.
     */
    @Input() badgeDisabled: boolean = false;

    containerClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.value != undefined && String(this.value).length === 1,
            'p-badge-lg': this.size === 'large',
            'p-badge-xl': this.size === 'xlarge',
            'p-badge-info': this.severity === 'info',
            'p-badge-success': this.severity === 'success',
            'p-badge-warning': this.severity === 'warning',
            'p-badge-danger': this.severity === 'danger'
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Badge, BadgeDirective, SharedModule],
    declarations: [Badge, BadgeDirective]
})
export class BadgeModule {}

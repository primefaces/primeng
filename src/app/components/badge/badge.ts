import { CommonModule, DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Directive, ElementRef, Inject, Input, NgModule, Renderer2, OnChanges, SimpleChanges, ViewEncapsulation, booleanAttribute } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
/**
 * Badge Directive is directive usage of badge component.
 * @group Components
 */
@Directive({
    selector: '[pBadge]',
    host: {
        class: 'p-element'
    }
})
export class BadgeDirective implements OnChanges, AfterViewInit {
    /**
     * When specified, disables the component.
     * @group Props
     */
    @Input('badgeDisabled') public disabled: boolean;
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    @Input() public badgeSize: 'large' | 'xlarge';
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     * @deprecated use badgeSize instead.
     */
    @Input() public set size(value: 'large' | 'xlarge') {
        this._size = value;
        console.warn('size property is deprecated and will removed in v18, use badgeSize instead.');
    }
    get size() {
        return this._size;
    }
    _size: 'large' | 'xlarge';
    /**
     * Severity type of the badge.
     * @group Props
     */
    @Input() public severity: 'success' | 'info' | 'warning' | 'danger' | null | undefined;
    /**
     * Value to display inside the badge.
     * @group Props
     */
    @Input() public value: string | number;

    private id!: string;

    private get activeElement(): HTMLElement {
        return this.el.nativeElement.nodeName.indexOf('-') != -1 ? this.el.nativeElement.firstChild : this.el.nativeElement;
    }

    private get canUpdateBadge(): boolean {
        return this.id && !this.disabled;
    }

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, private renderer: Renderer2) {}

    public ngOnChanges({ value, size, severity, disabled }: SimpleChanges): void {
        if (disabled) {
            this.toggleDisableState();
        }

        if (!this.canUpdateBadge) {
            return;
        }

        if (severity) {
            this.setSeverity(severity.previousValue);
        }

        if (size) {
            this.setSizeClasses();
        }

        if (value) {
            this.setValue();
        }
    }

    public ngAfterViewInit(): void {
        this.id = UniqueComponentId() + '_badge';
        this.renderBadgeContent();
    }

    private setValue(element?: HTMLElement): void {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        if (this.value != null) {
            if (DomHandler.hasClass(badge, 'p-badge-dot')) {
                DomHandler.removeClass(badge, 'p-badge-dot');
            }

            if (this.value && String(this.value).length === 1) {
                DomHandler.addClass(badge, 'p-badge-no-gutter');
            } else {
                DomHandler.removeClass(badge, 'p-badge-no-gutter');
            }
        } else {
            if (!DomHandler.hasClass(badge, 'p-badge-dot')) {
                DomHandler.addClass(badge, 'p-badge-dot');
            }

            DomHandler.removeClass(badge, 'p-badge-no-gutter');
        }

        badge.innerHTML = '';
        const badgeValue = this.value != null ? String(this.value) : '';
        this.renderer.appendChild(badge, this.document.createTextNode(badgeValue));
    }

    private setSizeClasses(element?: HTMLElement): void {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        if (this.badgeSize || this.size) {
            if (this.badgeSize === 'large' || this.size === 'large') {
                DomHandler.addClass(badge, 'p-badge-lg');
                DomHandler.removeClass(badge, 'p-badge-xl');
            }

            if (this.badgeSize === 'xlarge' || this.size === 'xlarge') {
                DomHandler.addClass(badge, 'p-badge-xl');
                DomHandler.removeClass(badge, 'p-badge-lg');
            }
        } else {
            DomHandler.removeClass(badge, 'p-badge-lg');
            DomHandler.removeClass(badge, 'p-badge-xl');
        }
    }

    private renderBadgeContent(): void {
        if (this.disabled) {
            return null;
        }

        const el = this.activeElement;
        const badge = this.document.createElement('span');
        badge.id = this.id;
        badge.className = 'p-badge p-component';

        this.setSeverity(null, badge);
        this.setSizeClasses(badge);
        this.setValue(badge);
        DomHandler.addClass(el, 'p-overlay-badge');
        this.renderer.appendChild(el, badge);
    }

    private setSeverity(oldSeverity?: 'success' | 'info' | 'warning' | 'danger' | null, element?: HTMLElement): void {
        const badge = element ?? this.document.getElementById(this.id);

        if (!badge) {
            return;
        }

        if (this.severity) {
            DomHandler.addClass(badge, `p-badge-${this.severity}`);
        }

        if (oldSeverity) {
            DomHandler.removeClass(badge, `p-badge-${oldSeverity}`);
        }
    }

    private toggleDisableState(): void {
        if (!this.id) {
            return;
        }

        if (this.disabled) {
            const badge = this.activeElement?.querySelector(`#${this.id}`);

            if (badge) {
                this.renderer.removeChild(this.activeElement, badge);
            }
        } else {
            this.renderBadgeContent();
        }
    }
}
/**
 * Badge is a small status indicator for another element.
 * @group Components
 */
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
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     */
    @Input() badgeSize: 'large' | 'xlarge' | undefined;
    /**
     * Severity type of the badge.
     * @group Props
     */
    @Input() severity: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    /**
     * Value to display inside the badge.
     * @group Props
     */
    @Input() value: string | number | null | undefined;
    /**
     * When specified, disables the component.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) badgeDisabled: boolean = false;
    /**
     * Size of the badge, valid options are "large" and "xlarge".
     * @group Props
     * @deprecated use badgeSize instead.
     */
    @Input() public set size(value: 'large' | 'xlarge') {
        this._size = value;
        console.warn('size property is deprecated and will removed in v18, use badgeSize instead.');
    }
    get size() {
        return this._size;
    }
    _size: 'large' | 'xlarge';

    containerClass() {
        return {
            'p-badge p-component': true,
            'p-badge-no-gutter': this.value != undefined && String(this.value).length === 1,
            'p-badge-lg': this.badgeSize === 'large' || this.size === 'large',
            'p-badge-xl': this.badgeSize === 'xlarge' || this.size === 'xlarge',
            [`p-badge-${this.severity}`]: this.severity
        };
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Badge, BadgeDirective, SharedModule],
    declarations: [Badge, BadgeDirective]
})
export class BadgeModule {}

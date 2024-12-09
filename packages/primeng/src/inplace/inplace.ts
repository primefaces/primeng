import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, inject, Input, NgModule, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonModule } from 'primeng/button';
import { TimesIcon } from 'primeng/icons';
import { InplaceStyle } from './style/inplacestyle';

@Component({
    selector: 'p-inplacedisplay, p-inplaceDisplay',
    imports: [],
    template: '<ng-content></ng-content>'
})
export class InplaceDisplay {}

@Component({
    selector: 'p-inplacecontent, p-inplaceContent',
    imports: [],
    template: '<ng-content></ng-content>'
})
export class InplaceContent {}
/**
 * Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.
 * @group Components
 */
@Component({
    selector: 'p-inplace',
    imports: [ButtonModule, TimesIcon, SharedModule, NgStyle, NgClass, NgTemplateOutlet],
    template: `
        <div [ngClass]="{ 'p-inplace p-component': true, 'p-inplace-closable': closable }" [ngStyle]="style" [class]="styleClass" [attr.aria-live]="'polite'">
            @if (!active) {
                <div class="p-inplace-display" (click)="onActivateClick($event)" tabindex="0" role="button" (keydown)="onKeydown($event)" [ngClass]="{ 'p-disabled': disabled }">
                    <ng-content select="[pInplaceDisplay]"></ng-content>
                    <ng-container *ngTemplateOutlet="displayTemplate"></ng-container>
                </div>
            }
            @if (active) {
                <div class="p-inplace-content">
                    <ng-content select="[pInplaceContent]"></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate; context: { closeCallback: onDeactivateClick.bind(this) }"></ng-container>
                    @if (closable) {
                        @if (closeIcon) {
                            <button type="button" [icon]="closeIcon" pButton pRipple (click)="onDeactivateClick($event)" [attr.aria-label]="closeAriaLabel"></button>
                        }
                        @if (!closeIcon) {
                            <button type="button" pButton pRipple [ngClass]="'p-button-icon-only'" (click)="onDeactivateClick($event)" [attr.aria-label]="closeAriaLabel">
                                @if (!closeicon) {
                                    <TimesIcon />
                                }
                                <ng-template *ngTemplateOutlet="closeicon"></ng-template>
                            </button>
                        }
                    }
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [InplaceStyle]
})
export class Inplace extends BaseComponent {
    /**
     * Whether the content is displayed or not.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) active: boolean | undefined = false;
    /**
     * Displays a button to switch back to display mode.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) closable: boolean | undefined = false;
    /**
     * When present, it specifies that the element should be disabled.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) disabled: boolean | undefined = false;
    /**
     * Allows to prevent clicking.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) preventClick: boolean | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Icon to display in the close button.
     * @group Props
     */
    @Input() closeIcon: string | undefined;
    /**
     * Establishes a string value that labels the close button.
     * @group Props
     */
    @Input() closeAriaLabel: string | undefined;
    /**
     * Callback to invoke when inplace is opened.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onActivate: EventEmitter<Event> = new EventEmitter<Event>();
    /**
     * Callback to invoke when inplace is closed.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    @Output() onDeactivate: EventEmitter<Event> = new EventEmitter<Event>();

    hover!: boolean;

    @ContentChild('display') displayTemplate: TemplateRef<any> | undefined;
    /**
     * Display template of the element.
     * @group Templates
     */
    @ContentChild('content') contentTemplate: TemplateRef<any> | undefined;
    /**
     * Content template of the element.
     * @group Templates
     */
    @ContentChild('closeicon') closeicon: TemplateRef<any> | undefined;
    /**
     * Close icon template of the element.
     * @group Templates
     */

    _componentStyle = inject(InplaceStyle);

    onActivateClick(event: MouseEvent) {
        if (!this.preventClick) this.activate(event);
    }

    onDeactivateClick(event: MouseEvent) {
        if (!this.preventClick) this.deactivate(event);
    }
    /**
     * Activates the content.
     * @param {Event} event - Browser event.
     * @group Method
     */
    activate(event?: Event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
            this.cd.markForCheck();
        }
    }
    /**
     * Deactivates the content.
     * @param {Event} event - Browser event.
     * @group Method
     */
    deactivate(event?: Event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
            this.cd.markForCheck();
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.activate(event);
            event.preventDefault();
        }
    }
}

@NgModule({
    imports: [Inplace, InplaceContent, InplaceDisplay, SharedModule],
    exports: [Inplace, InplaceContent, InplaceDisplay, SharedModule]
})
export class InplaceModule {}

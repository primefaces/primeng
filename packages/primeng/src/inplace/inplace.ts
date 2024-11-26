import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, inject, Input, NgModule, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonModule } from 'primeng/button';
import { TimesIcon } from 'primeng/icons';
import { InplaceStyle } from './style/inplacestyle';

@Component({
    selector: 'p-inplacedisplay, p-inplaceDisplay',
    standalone: true,
    imports: [CommonModule],
    template: '<ng-content></ng-content>'
})
export class InplaceDisplay {}

@Component({
    selector: 'p-inplacecontent, p-inplaceContent',
    standalone: true,
    imports: [CommonModule],
    template: '<ng-content></ng-content>'
})
export class InplaceContent {}
/**
 * Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.
 * @group Components
 */
@Component({
    selector: 'p-inplace',
    standalone: true,
    imports: [CommonModule, ButtonModule, TimesIcon, SharedModule],
    template: `
        <div [ngClass]="{ 'p-inplace p-component': true, 'p-inplace-closable': closable }" [ngStyle]="style" [class]="styleClass" [attr.aria-live]="'polite'">
            <div class="p-inplace-display" (click)="onActivateClick($event)" tabindex="0" role="button" (keydown)="onKeydown($event)" [ngClass]="{ 'p-disabled': disabled }" *ngIf="!active">
                <ng-content select="[pInplaceDisplay]"></ng-content>
                <ng-container *ngTemplateOutlet="displayTemplate"></ng-container>
            </div>
            <div class="p-inplace-content" *ngIf="active">
                <ng-content select="[pInplaceContent]"></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { closeCallback: onDeactivateClick.bind(this) }"></ng-container>

                <ng-container *ngIf="closable">
                    <button *ngIf="closeIcon" type="button" [icon]="closeIcon" pButton pRipple (click)="onDeactivateClick($event)" [attr.aria-label]="closeAriaLabel"></button>
                    <button *ngIf="!closeIcon" type="button" pButton pRipple [ngClass]="'p-button-icon-only'" (click)="onDeactivateClick($event)" [attr.aria-label]="closeAriaLabel">
                        <TimesIcon *ngIf="!closeIconTemplate" />
                        <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                    </button>
                </ng-container>
            </div>
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
    @ContentChild('closeicon') closeIconTemplate: TemplateRef<any> | undefined;
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

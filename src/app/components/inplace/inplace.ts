import { CommonModule } from '@angular/common';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    NgModule,
    Output,
    QueryList,
    TemplateRef,
    ViewEncapsulation,
    booleanAttribute,
    inject,
} from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TimesIcon } from 'primeng/icons/times';
import { BaseComponent } from 'primeng/basecomponent';
import { InplaceStyle } from './style/inplacestyle';

@Component({
    selector: 'p-inplacedisplay, p-inplaceDisplay',
    template: '<ng-content></ng-content>',
})
export class InplaceDisplay {}

@Component({
    selector: 'p-inplacecontent, p-inplaceContent',
    template: '<ng-content></ng-content>',
})
export class InplaceContent {}
/**
 * Inplace provides an easy to do editing and display at the same time where clicking the output displays the actual content.
 * @group Components
 */
@Component({
    selector: 'p-inplace',
    template: `
        <div
            [ngClass]="{ 'p-inplace p-component': true, 'p-inplace-closable': closable }"
            [ngStyle]="style"
            [class]="styleClass"
            [attr.aria-live]="'polite'"
        >
            @if (!active) {
                <div
                    class="p-inplace-display"
                    (click)="onActivateClick($event)"
                    tabindex="0"
                    role="button"
                    (keydown)="onKeydown($event)"
                    [ngClass]="{ 'p-disabled': disabled }"
                >
                    <ng-content select="[pInplaceDisplay]"></ng-content>
                    <ng-container *ngTemplateOutlet="displayTemplate"></ng-container>
                </div>
            } @else {
                <div class="p-inplace-content">
                    <ng-content select="[pInplaceContent]"></ng-content>
                    <ng-container
                        *ngTemplateOutlet="contentTemplate; context: { closeCallback: onDeactivateClick.bind(this) }"
                    ></ng-container>
                    @if (closable) {
                        @if (closeIcon) {
                            <button
                                type="button"
                                [icon]="closeIcon"
                                pButton
                                (click)="onDeactivateClick($event)"
                                [attr.aria-label]="closeAriaLabel"
                            ></button>
                        } @else {
                            <button
                                type="button"
                                pButton
                                [ngClass]="'p-button-icon-only'"
                                (click)="onDeactivateClick($event)"
                                [attr.aria-label]="closeAriaLabel"
                            >
                                @if (!closeIconTemplate) {
                                    <TimesIcon />
                                }
                                <ng-template *ngTemplateOutlet="closeIconTemplate"></ng-template>
                            </button>
                        }
                    }
                </div>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,

    providers: [InplaceStyle],
})
export class Inplace extends BaseComponent implements AfterContentInit {
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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    hover!: boolean;

    displayTemplate: TemplateRef<any> | undefined;

    contentTemplate: TemplateRef<any> | undefined;

    closeIconTemplate: TemplateRef<any> | undefined;

    _componentStyle = inject(InplaceStyle);

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'display':
                    this.displayTemplate = item.template;
                    break;

                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

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
    imports: [CommonModule, ButtonModule, SharedModule, TimesIcon],
    exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule, SharedModule],
    declarations: [Inplace, InplaceDisplay, InplaceContent],
})
export class InplaceModule {}

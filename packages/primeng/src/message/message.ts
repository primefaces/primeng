import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, inject, Input, NgModule, Output, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { CheckIcon, ExclamationTriangleIcon, InfoCircleIcon, TimesCircleIcon, TimesIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { MessageStyle } from './style/messagestyle';

/**
 * Message groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-message',
    standalone: true,
    imports: [CommonModule, CheckIcon, ExclamationTriangleIcon, TimesIcon, InfoCircleIcon, TimesCircleIcon, Ripple, SharedModule],
    template: `
        @if (visible()) {
            <div
                class="p-message p-component"
                [attr.aria-live]="'polite'"
                [ngClass]="containerClass"
                [attr.role]="'alert'"
                [@messageAnimation]="{
                    value: 'visible()',
                    params: {
                        showTransitionParams: showTransitionOptions,
                        hideTransitionParams: hideTransitionOptions
                    }
                }"
            >
                <div class="p-message-content">
                    @if (iconTemplate) {
                        <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
                    }
                    @if (icon) {
                        <i class="p-message-icon" [ngClass]="icon"></i>
                    }

                    <div *ngIf="!escape; else escapeOut">
                        <span *ngIf="!escape" [ngClass]="cx('text')" [innerHTML]="text"></span>
                    </div>

                    <ng-template #escapeOut>
                        <span *ngIf="escape && text" [ngClass]="cx('text')">{{ text }}</span>
                    </ng-template>

                    @if (containerTemplate) {
                        <ng-container *ngTemplateOutlet="containerTemplate; context: { closeCallback: close.bind(this) }"></ng-container>
                    } @else {
                        <span [ngClass]="cx('text')">
                            <ng-content></ng-content>
                        </span>
                    }
                    @if (closable) {
                        <button pRipple type="button" class="p-message-close-button" (click)="close($event)">
                            @if (closeIcon) {
                                <i class="p-message-close-icon" [ngClass]="closeIcon"></i>
                            }
                            @if (closeIconTemplate) {
                                <ng-container *ngTemplateOutlet="closeIconTemplate"></ng-container>
                            }
                            @if (!closeIconTemplate && !closeIcon) {
                                <TimesIcon styleClass="p-message-close-icon" />
                            }
                        </button>
                    }
                </div>
            </div>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MessageStyle],
    animations: [
        trigger('messageAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'translateY(-25%)' }), animate('{{showTransitionParams}}')]),
            transition(':leave', [
                animate(
                    '{{hideTransitionParams}}',
                    style({
                        height: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        opacity: 0
                    })
                )
            ])
        ])
    ]
})
export class Message extends BaseComponent {
    /**
     * Severity level of the message.
     * @defaultValue 'info'
     * @group Props
     */
    @Input() severity: string | 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined | null = 'info';
    /**
     * Text content.
     * @group Props
     */
    @Input() text: string | undefined;
    /**
     * Whether displaying messages would be escaped or not.
     * @deprecated Use content projection instead '<p-message>Content</p-message>'.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) escape: boolean = true;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Whether the message can be closed manually using the close icon.
     * @group Props
     * @defaultValue false
     */
    @Input({ transform: booleanAttribute }) closable: boolean = false;
    /**
     * Icon to display in the message.
     * @group Props
     * @defaultValue undefined
     */
    @Input() icon: string | undefined;
    /**
     * Icon to display in the message close button.
     * @group Props
     * @defaultValue undefined
     */
    @Input() closeIcon: string | undefined;
    /**
     * Delay in milliseconds to close the message automatically.
     * @defaultValue undefined
     */
    @Input() life: number | undefined;
    /**
     * Transition options of the show animation.
     * @defaultValue '300ms ease-out'
     * @group Props
     */
    @Input() showTransitionOptions: string = '300ms ease-out';
    /**
     * Transition options of the hide animation.
     * @defaultValue '200ms cubic-bezier(0.86, 0, 0.07, 1)'
     * @group Props
     */
    @Input() hideTransitionOptions: string = '200ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Defines the size of the component.
     * @group Props
     */
    @Input() size: 'large' | 'small' | undefined;
    /**
     * Specifies the input variant of the component.
     * @group Props
     */
    @Input() variant: 'outlined' | 'text' | 'simple' | undefined;
    /**
     * Emits when the message is closed.
     * @param {{ originalEvent: Event }} event - The event object containing the original event.
     * @group Emits
     */
    @Output() onClose: EventEmitter<{ originalEvent: Event }> = new EventEmitter<{ originalEvent: Event }>();

    get containerClass(): string {
        const variantClass = this.variant === 'outlined' ? 'p-message-outlined' : this.variant === 'simple' ? 'p-message-simple' : '';
        const sizeClass = this.size === 'small' ? 'p-message-sm' : this.size === 'large' ? 'p-message-lg' : '';

        return `p-message-${this.severity} ${variantClass} ${sizeClass}`.trim() + (this.styleClass ? ' ' + this.styleClass : '');
    }
    visible = signal<boolean>(true);

    _componentStyle = inject(MessageStyle);

    /**
     * Custom template of the message container.
     * @group Templates
     */
    @ContentChild('container') containerTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of the message icon.
     * @group Templates
     */
    @ContentChild('icon') iconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of the close icon.
     * @group Templates
     */
    @ContentChild('closeicon') closeIconTemplate: TemplateRef<any> | undefined;

    ngOnInit() {
        super.ngOnInit();
        if (this.life) {
            setTimeout(() => {
                this.visible.set(false);
            }, this.life);
        }
    }
    /**
     * Closes the message.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public close(event: Event) {
        this.visible.set(false);
        this.onClose.emit({ originalEvent: event });
    }
}

@NgModule({
    imports: [Message, SharedModule],
    exports: [Message, SharedModule]
})
export class MessageModule {}

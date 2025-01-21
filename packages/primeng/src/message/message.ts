import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, EventEmitter, inject, Input, NgModule, Output, QueryList, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { TimesIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { MessageStyle } from './style/messagestyle';

/**
 * Message groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-message',
    standalone: true,
    imports: [CommonModule, TimesIcon, Ripple, SharedModule],
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
                    @if (iconTemplate || _iconTemplate) {
                        <ng-container *ngTemplateOutlet="iconTemplate || iconTemplate"></ng-container>
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

                    @if (containerTemplate || _containerTemplate) {
                        <ng-container *ngTemplateOutlet="containerTemplate || containerTemplate; context: { closeCallback: close.bind(this) }"></ng-container>
                    } @else {
                        <span [ngClass]="cx('text')">
                            <ng-content></ng-content>
                        </span>
                    }
                    @if (closable) {
                        <button pRipple type="button" class="p-message-close-button" (click)="close($event)" [attr.aria-label]="closeAriaLabel">
                            @if (closeIcon) {
                                <i class="p-message-close-icon" [ngClass]="closeIcon"></i>
                            }
                            @if (closeIconTemplate || _closeIconTemplate) {
                                <ng-container *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-container>
                            }
                            @if (!closeIconTemplate && !_closeIconTemplate && !closeIcon) {
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
export class Message extends BaseComponent implements AfterContentInit {
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

    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

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
    @ContentChild('container', { descendants: false }) containerTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of the message icon.
     * @group Templates
     */
    @ContentChild('icon', { descendants: false }) iconTemplate: TemplateRef<any> | undefined;

    /**
     * Custom template of the close icon.
     * @group Templates
     */
    @ContentChild('closeicon', { descendants: false }) closeIconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _containerTemplate: TemplateRef<any> | undefined;

    _iconTemplate: TemplateRef<any> | undefined;

    _closeIconTemplate: TemplateRef<any> | undefined;

    ngOnInit() {
        super.ngOnInit();
        if (this.life) {
            setTimeout(() => {
                this.visible.set(false);
            }, this.life);
        }
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'container':
                    this._containerTemplate = item.template;
                    break;

                case 'icon':
                    this._iconTemplate = item.template;
                    break;

                case 'closeicon':
                    this._closeIconTemplate = item.template;
                    break;
            }
        });
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

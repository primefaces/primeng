import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ContentChild, ContentChildren, EventEmitter, inject, InjectionToken, input, Input, NgModule, Output, QueryList, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionOptions } from '@primeuix/motion';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TimesIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { Ripple } from 'primeng/ripple';
import { MessagePassThrough } from 'primeng/types/message';
import { MessageStyle } from './style/messagestyle';

const MESSAGE_INSTANCE = new InjectionToken<Message>('MESSAGE_INSTANCE');

/**
 * Message groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-message',
    standalone: true,
    imports: [CommonModule, TimesIcon, Ripple, SharedModule, Bind, MotionModule],
    template: `
        <div [pBind]="ptm('content')" [class]="cx('content')" [attr.data-p]="dataP">
            @if (iconTemplate || _iconTemplate) {
                <ng-container *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-container>
            }
            @if (icon) {
                <i [pBind]="ptm('icon')" [class]="cn(cx('icon'), icon)" [attr.data-p]="dataP"></i>
            }

            @if (containerTemplate || _containerTemplate) {
                <ng-container *ngTemplateOutlet="containerTemplate || _containerTemplate; context: { closeCallback: closeCallback }"></ng-container>
            } @else {
                <div *ngIf="!escape; else escapeOut">
                    <span [pBind]="ptm('text')" *ngIf="!escape" [ngClass]="cx('text')" [innerHTML]="text" [attr.data-p]="dataP"></span>
                </div>

                <ng-template #escapeOut>
                    <span [pBind]="ptm('text')" *ngIf="escape && text" [ngClass]="cx('text')" [attr.data-p]="dataP">{{ text }}</span>
                </ng-template>

                <span [pBind]="ptm('text')" [ngClass]="cx('text')" [attr.data-p]="dataP">
                    <ng-content></ng-content>
                </span>
            }
            @if (closable) {
                <button [pBind]="ptm('closeButton')" pRipple type="button" [class]="cx('closeButton')" (click)="close($event)" [attr.aria-label]="closeAriaLabel" [attr.data-p]="dataP">
                    @if (closeIcon) {
                        <i [pBind]="ptm('closeIcon')" [class]="cn(cx('closeIcon'), closeIcon)" [ngClass]="closeIcon" [attr.data-p]="dataP"></i>
                    }
                    @if (closeIconTemplate || _closeIconTemplate) {
                        <ng-container *ngTemplateOutlet="closeIconTemplate || _closeIconTemplate"></ng-container>
                    }
                    @if (!closeIconTemplate && !_closeIconTemplate && !closeIcon) {
                        <svg [pBind]="ptm('closeIcon')" data-p-icon="times" [class]="cx('closeIcon')" [attr.data-p]="dataP" />
                    }
                </button>
            }
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MessageStyle, { provide: MESSAGE_INSTANCE, useExisting: Message }, { provide: PARENT_INSTANCE, useExisting: Message }],
    hostDirectives: [Bind],
    host: {
        '[attr.data-p]': 'dataP',
        role: 'alert',
        'aria-live': 'polite',
        '[class]': 'cn(cx("root"), styleClass)',
        '[animate.enter]': '"p-message-enter-active"',
        '[animate.leave]': '"p-message-leave-active"',
        '[class.p-message-leave-active]': '!visible()'
    }
})
export class Message extends BaseComponent<MessagePassThrough> {
    _componentStyle = inject(MessageStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    $pcMessage: Message | undefined = inject(MESSAGE_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Severity level of the message.
     * @defaultValue 'info'
     * @group Props
     */
    @Input() severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined | null = 'info';
    /**
     * Text content.
     * @deprecated since v20.0.0. Use content projection instead '<p-message>Content</p-message>'.
     * @group Props
     */
    @Input() text: string | undefined;
    /**
     * Whether displaying messages would be escaped or not.
     * @deprecated since v20.0.0. Use content projection instead '<p-message>Content</p-message>'.
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
     * @deprecated since v21.0.0, use `motionOptions` instead.
     */
    @Input() showTransitionOptions: string = '300ms ease-out';
    /**
     * Transition options of the hide animation.
     * @defaultValue '200ms cubic-bezier(0.86, 0, 0.07, 1)'
     * @group Props
     * @deprecated since v21.0.0, use `motionOptions` instead.
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
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Emits when the message is closed.
     * @param {{ originalEvent: Event }} event - The event object containing the original event.
     * @group Emits
     */
    @Output() onClose: EventEmitter<{ originalEvent: Event }> = new EventEmitter<{ originalEvent: Event }>();

    get closeAriaLabel() {
        return this.config.translation.aria ? this.config.translation.aria.close : undefined;
    }

    visible = signal<boolean>(true);

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

    closeCallback = (event: Event) => {
        this.close(event);
    };

    onInit() {
        if (this.life) {
            setTimeout(() => {
                this.visible.set(false);
            }, this.life);
        }
    }

    onAfterContentInit() {
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

    get dataP() {
        return this.cn({
            outlined: this.variant === 'outlined',
            simple: this.variant === 'simple',
            [this.severity as string]: this.severity,
            [this.size as string]: this.size
        });
    }
}

@NgModule({
    imports: [Message, SharedModule],
    exports: [Message, SharedModule]
})
export class MessageModule {}

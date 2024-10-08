import { CommonModule } from '@angular/common';
import {
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
    signal,
} from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { MessageStyle } from './style/messagestyle';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { animate, style, transition, trigger } from '@angular/animations';
import { TimesIcon } from 'primeng/icons/times';
/**
 * Message groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-message',
    standalone: true,
    imports: [
        CommonModule,
        SharedModule,
        ButtonModule,
        CheckIcon,
        ExclamationTriangleIcon,
        TimesIcon,
        InfoCircleIcon,
        TimesCircleIcon,
        Ripple,
    ],
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
                        hideTransitionParams: hideTransitionOptions,
                    },
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
                        <ng-container *ngTemplateOutlet="containerTemplate; context: { closeCallback: close.bind($event) }"></ng-container>
                    } @else {
                        <ng-content></ng-content>
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
                        opacity: 0,
                    }),
                ),
            ]),
        ]),
    ],
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
     * Emits when the message is closed.
     * @param {{ originalEvent: Event }} event - The event object containing the original event.
     * @group Emits
     */
    @Output() onClose: EventEmitter<{ originalEvent: Event }> = new EventEmitter<{ originalEvent: Event }>();

    get containerClass(): string {
        return `p-message-${this.severity}` + `${this.styleClass ? ' ' + this.styleClass : ''}`;
    }

    visible = signal<boolean>(true);

    _componentStyle = inject(MessageStyle);

    containerTemplate!: TemplateRef<any> | undefined;

    iconTemplate!: TemplateRef<any> | undefined;

    closeIconTemplate!: TemplateRef<any> | undefined;

    get _defaultIcon() {
        return this.severity ? this.severity : 'info';
    }

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
     * @param {Event} event Browser event.
     * @group Method
     */
    public close(event) {
        this.visible.set(false);
        this.onClose.emit({ originalEvent: event });
    }

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'container':
                    this.containerTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                default:
                    this.containerTemplate = item.template;
                    break;
            }
        });
    }
}

@NgModule({
    imports: [Message],
    exports: [Message, SharedModule],
})
export class MessageModule {}

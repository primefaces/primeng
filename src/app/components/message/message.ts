import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input,
    NgModule,
    ViewEncapsulation,
    booleanAttribute,
    inject,
} from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { CheckIcon } from 'primeng/icons/check';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { MessageStyle } from './style/messagestyle';
import { ButtonModule } from 'primeng/button';
/**
 * Message groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-message',
    template: `
        <div aria-live="polite" [ngClass]="cx('root')" [ngStyle]="style" [class]="styleClass">
            @switch (icon) { @case ('success') {
            <CheckIcon [styleClass]="cx('icon')" />
            } @case ('error') {
            <TimesCircleIcon [styleClass]="cx('icon')" />
            } @case ('warn') {
            <ExclamationTriangleIcon [styleClass]="cx('icon')" />
            } @default {
            <InfoCircleIcon [styleClass]="cx('icon')" />
            } }
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" [ngClass]="cx('text')" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" [ngClass]="cx('text')">{{ text }}</span>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [MessageStyle],
})
export class Message extends BaseComponent {
    /**
     * Severity level of the message.
     * @group Props
     */
    @Input() severity: string | 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined | null;
    /**
     * Text content.
     * @group Props
     */
    @Input() text: string | undefined;
    /**
     * Whether displaying messages would be escaped or not.
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

    @Input({ transform: booleanAttribute }) closable: boolean = true;

    @Input() closeIcon: string | undefined;

    _componentStyle = inject(MessageStyle);

    get icon() {
        return this.severity ? this.severity : 'info';
    }
}

@NgModule({
    imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon, ButtonModule],
    exports: [Message],
    declarations: [Message],
})
export class MessageModule {}

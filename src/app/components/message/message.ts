import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckIcon } from 'primeng/icons/check';
import { InfoCircleIcon } from 'primeng/icons/infocircle';
import { TimesCircleIcon } from 'primeng/icons/timescircle';
import { ExclamationTriangleIcon } from 'primeng/icons/exclamationtriangle';

@Component({
    selector: 'p-message',
    template: `
        <div
            aria-live="polite"
            class="p-inline-message p-component p-inline-message"
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{
                'p-inline-message-info': severity === 'info',
                'p-inline-message-warn': severity === 'warn',
                'p-inline-message-error': severity === 'error',
                'p-inline-message-success': severity === 'success',
                'p-inline-message-icon-only': this.text == null
            }"
        >
            <CheckIcon *ngIf="icon === 'success'" [styleClass]="'p-inline-message-icon'" />
            <InfoCircleIcon *ngIf="icon === 'info'" [styleClass]="'p-inline-message-icon'" />
            <TimesCircleIcon *ngIf="icon === 'error'" [styleClass]="'p-inline-message-icon'" />
            <ExclamationTriangleIcon *ngIf="icon === 'warn'" [styleClass]="'p-inline-message-icon'" />
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{ text }}</span>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./message.css'],
    host: {
        class: 'p-element'
    }
})
export class UIMessage {
    @Input() severity: string;

    @Input() text: string;

    @Input() escape: boolean = true;

    @Input() style: any;

    @Input() styleClass: string;

    get icon() {
        if (this.severity && this.severity.trim()) {
            return this.severity;
        } else {
            return 'info';
        }
    }
}

@NgModule({
    imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon],
    exports: [UIMessage],
    declarations: [UIMessage]
})
export class MessageModule {}

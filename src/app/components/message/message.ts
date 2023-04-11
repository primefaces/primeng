import { NgModule, Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckIcon } from 'primeng/icon/check';
import { InfoCircleIcon } from 'primeng/icon/infocircle';
import { TimesCircleIcon } from 'primeng/icon/timescircle';
import { ExclamationTriangleIcon } from 'primeng/icon/exclamationtriangle';

@Component({
    selector: 'p-message',
    template: `
        <div
            aria-live="polite"
            class="p-inline-message p-component p-inline-message"
            *ngIf="severity"
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
            <CheckIcon *ngIf="severity === 'success'" [ngClass]="'p-inline-message-icon'"/>
            <InfoCircleIcon *ngIf="severity === 'info'" [ngClass]="'p-inline-message-icon'"/>
            <TimesCircleIcon *ngIf="severity === 'error'" [ngClass]="'p-inline-message-icon'"/>
            <ExclamationTriangleIcon *ngIf="severity === 'warn'" [ngClass]="'p-inline-message-icon'"/>
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
}

@NgModule({
    imports: [CommonModule, CheckIcon, InfoCircleIcon, TimesCircleIcon, ExclamationTriangleIcon],
    exports: [UIMessage],
    declarations: [UIMessage]
})
export class MessageModule {}

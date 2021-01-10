import {NgModule,Component,Input,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-message',
    template: `
        <div aria-live="polite" class="p-inline-message p-component p-inline-message" *ngIf="severity" [ngStyle]="style" [class]="styleClass"
        [ngClass]="{'p-inline-message-info': (severity === 'info'),
                'p-inline-message-warn': (severity === 'warn'),
                'p-inline-message-error': (severity === 'error'),
                'p-inline-message-success': (severity === 'success'),
                'p-inline-message-icon-only': this.text == null}">
            <span class="p-inline-message-icon" [ngClass]="icon"></span>
            <div *ngIf="!escape; else escapeOut">
                <span *ngIf="!escape" class="p-inline-message-text" [innerHTML]="text"></span>
            </div>
            <ng-template #escapeOut>
                <span *ngIf="escape" class="p-inline-message-text">{{text}}</span>
            </ng-template>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./message.css']
})
export class UIMessage {

    @Input() severity: string;

    @Input() text: string;

    @Input() escape: boolean = true;

    @Input() style: any;

    @Input() styleClass: string;

    get icon(): string {
        let icon: string = null;

        if (this.severity) {
            switch(this.severity) {
                case 'success':
                    icon = 'pi pi-check';
                break;

                case 'info':
                    icon = 'pi pi-info-circle';
                break;

                case 'error':
                    icon = 'pi pi-times-circle';
                break;

                case 'warn':
                    icon = 'pi pi-exclamation-triangle';
                break;

                default:
                    icon = 'pi pi-info-circle';
                break;
            }
        }

        return icon;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [UIMessage],
    declarations: [UIMessage]
})
export class MessageModule { }

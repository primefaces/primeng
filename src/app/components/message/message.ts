import {NgModule,Component,Input,Output,EventEmitter,Optional} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'p-message',
    template: `
        <div aria-live="polite" class="ui-message ui-widget ui-corner-all" *ngIf="severity&&text"
        [ngClass]="{'ui-messages-info': (severity === 'info'),
                'ui-messages-warn': (severity === 'warn'),
                'ui-messages-error': (severity === 'error'),
                'ui-messages-success': (severity === 'success')}">
            <span class="ui-message-icon" [ngClass]="icon"></span>
            <span class="ui-message-detail">{{text}}</span>
        </div>
    `
})
export class UIMessage {

    @Input() severity: string;
    
    @Input() text: string;
    
    get icon(): string {
        let icon: string = null;
        
        if(this.severity) {
            switch(this.severity) {
                case 'success':
                    icon = 'fa fa-fw fa-check';
                break;
                
                case 'info':
                    icon = 'fa fa-fw fa-info-circle';
                break;
                
                case 'error':
                    icon = 'fa fa-fw fa-close';
                break;
                
                case 'warn':
                    icon = 'fa fa-fw fa-warning';
                break;
                
                case 'success':
                    icon = 'fa fa-fw fa-check';
                break;
                
                default:
                    icon = 'fa fa-fw fa-info-circle';
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
import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../common/api';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all" style="display:block"
                    [ngClass]="{'ui-messages-info':(value[0].severity === 'info'),
                    'ui-messages-warn':(value[0].severity === 'warn'),
                    'ui-messages-error':(value[0].severity === 'error'),
                    'ui-messages-success':(value[0].severity === 'success')}">
            <a href="#" class="ui-messages-close" (click)="clear($event)" *ngIf="closable">
                <i class="fa fa-close"></i>
            </a>
            <span class="ui-messages-icon fa fa-fw fa-2x" [ngClass]="icon"></span>
            <ul>
                <li *ngFor="let msg of value">
                    <span class="ui-messages-summary">{{msg.summary}}</span>
                    <span class="ui-messages-detail">{{msg.detail}}</span>
                </li>
            </ul>
        </div>
    `
})
export class Messages {

    @Input() value: Message[];

    @Input() closable: boolean = true;
    
    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    hasMessages() {
        return this.value && this.value.length > 0;
    }

    getSeverityClass() {
        return this.value[0].severity;
    }

    clear(event) {
        this.value = [];
        this.valueChange.emit(this.value);

        event.preventDefault();
    }
    
    get icon(): string {
        let icon: string = null;
        if(this.hasMessages()) {
            let msg = this.value[0];
            switch(msg.severity) {
                case 'success':
                    icon = 'fa-check';
                break;
                
                case 'info':
                    icon = 'fa-info-circle';
                break;
                
                case 'error':
                    icon = 'fa-close';
                break;
                
                case 'warn':
                    icon = 'fa-warning';
                break;
                
                case 'success':
                    icon = 'fa-check';
                break;
                
                default:
                    icon = 'fa-info-circle';
                break;
            }
        }
        
        return icon;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Messages],
    declarations: [Messages]
})
export class MessagesModule { }
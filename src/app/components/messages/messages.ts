import {NgModule,Component,Input,Output,EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Message} from '../common/message';
import {trigger,state,style,transition,animate} from '@angular/animations';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all" style="display:block"
                    [ngClass]="{'ui-messages-info':(getSeverityClass() === 'info'),
                    'ui-messages-warn':(getSeverityClass() === 'warn'),
                    'ui-messages-error':(getSeverityClass() === 'error'),
                    'ui-messages-success':(getSeverityClass() === 'success')}"
                    [@slideIn]="hasMessages() ? '*' : 'void'"><div class ="ui-messages-container">
            <a href="#" class="ui-messages-close" (click)="clear($event)" *ngIf="closable">
                <i class="fa fa-close"></i>
            </a>
            <span class="ui-messages-icon fa fa-fw fa-2x" [ngClass]="icon"></span>
            <ul>
                <li *ngFor="let msg of value">
                    <span class="ui-messages-summary">{{getSummary()}}</span>
                    <span class="ui-messages-detail">{{getDetail()}}</span>
                </li>
            </ul>
        </div></div>
    `,
    animations: [
      trigger('slideIn', [
      state('*', style({ height : '*' })),
      state('void', style({ height: '0' })),
      transition('* => void', [
          style({ height: '*' }),
          animate(200, style({ height: '0' }))
      ]),
      transition('void => *', [
          style({ height: '0' }),
          animate(200 , style({ height: '*' }))
      ])
    ])
  ]
})
export class Messages {

    @Input() value: Message[];

    @Input() closable: boolean = true;
    
    @Output() valueChange: EventEmitter<Message[]> = new EventEmitter<Message[]>();

    hasMessages() {
        return this.value && this.value.length > 0;
    }
    
    getSeverityClass() {
      if(this.value && this.value[0])
        return this.value[0].severity;
      else
        return null;
    }
    
    getSummary() {
      if(this.value && this.value[0])
        return this.value[0].summary;
      else
        return null;
    }
    
    getDetail() {
      if(this.value && this.value[0])
        return this.value[0].detail;
      else
        return null;
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
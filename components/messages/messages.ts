import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange} from '@angular/core';
import {Message} from '../common';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all" style="display:block"
                    [ngClass]="{'ui-messages-info':(value[0].severity === 'info'),'ui-messages-warn':(value[0].severity === 'warn'),'ui-messages-error':(value[0].severity === 'error')}">
            <a href="#" class="ui-messages-close" (click)="clear($event)" *ngIf="closable">
                <i class="fa fa-close"></i>
            </a>
            <span class="ui-messages-icon fa fa-2x fa-info-circle"></span>
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

    hasMessages() {
        return this.value && this.value.length > 0;
    }

    getSeverityClass() {
        return this.value[0].severity;
    }

    clear(event) {
        this.value.splice(0, this.value.length);

        event.preventDefault();
    }
}
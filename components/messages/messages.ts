/// <reference path="../../typedefinition/primeui.d.ts" />

import {Component,ElementRef,AfterViewInit,OnDestroy,OnChanges,Input,Output,SimpleChange,EventEmitter} from 'angular2/core';
import {Message} from '../api/message';

@Component({
    selector: 'p-messages',
    template: `
        <div *ngIf="hasMessages()" class="pui-messages ui-widget ui-corner-all" style="display:block"
                    [ngClass]="{'pui-messages-info':(value[0].severity === 'info'),'pui-messages-warn':(value[0].severity === 'warn'),'pui-messages-error':(value[0].severity === 'error')}">
            <a href="#" class="pui-messages-close" (click)="clear($event)" *ngIf="closable">
                <i class="fa fa-close"></i>
            </a>
            <span class="pui-messages-icon fa fa-2x fa-info-circle"></span>
            <ul>
                <li *ngFor="#msg of value">
                    <span class="pui-messages-summary">{{msg.summary}}</span>
                    <span class="pui-messages-detail">{{msg.detail}}</span>
                </li>
            </ul>
        </div>
    `
})
export class Messages {

    @Input() value: Message[];

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Input() closable: boolean = true;

    hasMessages() {
        return this.value && this.value.length > 0;
    }

    getSeverityClass() {
        return this.value[0].severity;
    }

    clear(event) {
        this.valueChange.next([]);

        event.preventDefault();
    }
}
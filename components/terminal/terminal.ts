import {NgModule,Component,AfterViewInit,AfterViewChecked,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-terminal',
    template: `
        <div [ngClass]="'ui-terminal ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div *ngIf="welcomeMessage">{{welcomeMessage}}</div>
            <div class="ui-terminal-content">
                <div *ngFor="let command of commands">
                    <span>{{prompt}}</span>
                    <span class="ui-terminal-command">{{command.text}}</span>
                    <div>{{command.response}}</div>
                </div>
            </div>
            <div>
                <span class="ui-terminal-content-prompt">{{prompt}}</span>
                <input #in type="text" [(ngModel)]="command" class="ui-terminal-input" autocomplete="off" (keydown)="handleCommand($event,container)" autofocus>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class Terminal implements AfterViewInit,AfterViewChecked {

    @Input() welcomeMessage: string;

    @Input() prompt: string;
        
    @Input() style: any;
        
    @Input() styleClass: string;
    
    @Output() responseChange: EventEmitter<any> = new EventEmitter();

    @Output() handler: EventEmitter<any> = new EventEmitter();
        
    commands: any[] = [];
    
    command: string;
    
    container: any;
    
    commandProcessed: boolean;
    
    constructor(protected el: ElementRef, protected domHandler: DomHandler) {}
    
    ngAfterViewInit() {
        this.container = this.domHandler.find(this.el.nativeElement, '.ui-terminal')[0];
    }
    
    ngAfterViewChecked() {
        if(this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }
                
    @Input()
    set response(value: string) {
        if(value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }
    
    handleCommand(event,container) {
        if(event.keyCode == 13) {
            this.commands.push({text: this.command});                    
            this.handler.emit({originalEvent: event, command: this.command});
            this.command = '';
        }
    }
    
    focus(element) {
        element.focus();
    }
    
}

@NgModule({
    imports: [CommonModule,FormsModule],
    exports: [Terminal],
    declarations: [Terminal]
})
export class TerminalModule { }
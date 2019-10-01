import {NgModule,Component,AfterViewInit,AfterViewChecked,OnDestroy,Input,Output,EventEmitter,ElementRef} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {TerminalService} from './terminalservice';
import {Subscription}   from 'rxjs';

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
                <input #in type="text" [(ngModel)]="command" class="ui-terminal-input" autocomplete="off" (keydown)="handleCommand($event)" autofocus>
            </div>
        </div>
    `
})
export class Terminal implements AfterViewInit,AfterViewChecked,OnDestroy {

    @Input() welcomeMessage: string;

    @Input() prompt: string;
        
    @Input() style: any;
        
    @Input() styleClass: string;
            
    commands: any[] = [];
    
    command: string;
    
    container: Element;
    
    commandProcessed: boolean;
    
    subscription: Subscription;

    commandSubscription: Subscription;
    
    constructor(public el: ElementRef, public terminalService: TerminalService) {
        this.commandSubscription = terminalService.bufferCommandHandler.subscribe(command =>{
            this.commands.push({text: command});
        })
        this.subscription = terminalService.responseHandler.subscribe(response => {
            this.commands[this.commands.length - 1].response = response;
            this.command = '';
            this.commandProcessed = true;
        });
    }
    
    ngAfterViewInit() {
        this.container = DomHandler.find(this.el.nativeElement, '.ui-terminal')[0];
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
    
    handleCommand(event: KeyboardEvent) {
        if(event.keyCode == 13) {
            this.terminalService.sendCommand(this.command);
        }
    }
    
    focus(element: HTMLElement) {
        element.focus();
    }
    
    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }

        if(this.commandSubscription) {
            this.commandSubscription.unsubscribe();
        }
    }
    
}

@NgModule({
    imports: [CommonModule,FormsModule],
    exports: [Terminal],
    declarations: [Terminal]
})
export class TerminalModule { }
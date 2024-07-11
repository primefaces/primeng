import { NgModule, Component, AfterViewInit, AfterViewChecked, OnDestroy, Input, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { TerminalService } from './terminalservice';
import { Subscription } from 'rxjs';
import { BaseComponent } from 'primeng/basecomponent';
import { TerminalStyle } from './style/terminalstyle';

/**
 * Terminal is a text based user interface.
 * @group Components
 */
@Component({
    selector: 'p-terminal',
    template: `
        <div [ngClass]="'p-terminal p-component'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div class="p-terminal-welcome-message" *ngIf="welcomeMessage">{{ welcomeMessage }}</div>
            <div class="p-terminal-command-list">
                <div class="p-terminal-command" *ngFor="let command of commands">
                    <span class="p-terminal-prompt-label">{{ prompt }}</span>
                    <span class="p-terminal-command-value">{{ command.text }}</span>
                    <div class="p-terminal-command-response" [attr.aria-live]="'polite'">{{ command.response }}</div>
                </div>
            </div>
            <div class="p-terminal-prompt">
                <span class="p-terminal-prompt-label">{{ prompt }}</span>
                <input #in type="text" [(ngModel)]="command" class="p-terminal-prompt-value" autocomplete="off" (keydown)="handleCommand($event)" autofocus />
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    },
    providers: [TerminalStyle]
})
export class Terminal extends BaseComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
    /**
     * Initial text to display on terminal.
     * @group Props
     */
    @Input() welcomeMessage: string | undefined;
    /**
     * Prompt text for each command.
     * @group Props
     */
    @Input() prompt: string | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;

    commands: any[] = [];

    command!: string;

    container!: Element;

    commandProcessed!: boolean;

    subscription: Subscription;

    _componentStyle = inject(TerminalStyle);

    constructor(public terminalService: TerminalService) {
        super();
        this.subscription = terminalService.responseHandler.subscribe((response) => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.container = DomHandler.find(this.el.nativeElement, '.p-terminal')[0];
    }

    ngAfterViewChecked() {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }

    @Input()
    set response(value: string) {
        if (value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }

    handleCommand(event: KeyboardEvent) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    }

    focus(element: HTMLElement) {
        element.focus();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [Terminal],
    declarations: [Terminal]
})
export class TerminalModule {}

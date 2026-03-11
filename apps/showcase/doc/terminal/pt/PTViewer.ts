import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TerminalModule, TerminalService } from 'primeng/terminal';

@Component({
    selector: 'terminal-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, TerminalModule],
    providers: [TerminalService],
    template: `
        <app-docptviewer [docs]="docs">
            <div>
                <p>
                    Enter "<strong>date</strong>" to display the current date, "<strong>greet {{ '{0}' }}</strong
                    >" for a message and "<strong>random</strong>" to get a random number.
                </p>
                <p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $" aria-label="PrimeNG Terminal Service"></p-terminal>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer implements OnInit, OnDestroy {
    docs = [
        {
            data: getPTOptions('Terminal'),
            key: 'Terminal'
        }
    ];

    subscription: any;

    constructor(private terminalService: TerminalService) {}

    ngOnInit() {
        this.terminalService.commandHandler.subscribe((command) => this.commandHandler(command));
    }

    commandHandler(text: string) {
        let response;
        let argsIndex = text.indexOf(' ');
        let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

        switch (command) {
            case 'date':
                response = 'Today is ' + new Date().toDateString();
                break;

            case 'greet':
                response = 'Hola ' + text.substring(argsIndex + 1);
                break;

            case 'random':
                response = Math.floor(Math.random() * 100);
                break;

            default:
                response = 'Unknown command: ' + command;
        }

        this.terminalService.sendResponse(response);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

import { Component, Input, OnDestroy } from '@angular/core';
import { TerminalService } from 'primeng/terminal';
import { Subscription } from 'rxjs';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Commands are processed using observables via the <i>TerminalService</i>. Import this service into your component and subscribe to <i>commandHandler</i> to process commands by sending replies with <i>sendResponse</i> function.</p>
        </app-docsectiontext>
        <div class="card">
            <p>Enter "<strong>date</strong>" to display the current date, "<strong>greet &#123;0&#125;</strong>" for a message and "<strong>random</strong>" to get a random number.</p>
            <p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $"></p-terminal>
        </div>
        <app-code [code]="code" selector="terminal-basic-demo"></app-code>
    </section>`,
    providers: [TerminalService]
})
export class BasicDoc implements OnDestroy {
    @Input() id: string;

    @Input() title: string;

    subscription: Subscription;

    constructor(private terminalService: TerminalService) {
        this.subscription = this.terminalService.commandHandler.subscribe((command) => {
            let response = command === 'date' ? new Date().toDateString() : 'Unknown command: ' + command;
            this.terminalService.sendResponse(response);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    code: Code = {
        basic: `
<p>Enter "<strong>date</strong>" to display the current date, "<strong>greet &#123;0&#125;</strong>" for a message and "<strong>random</strong>" to get a random number.</p>
<p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $"></p-terminal>`,
        html: `
<div class="card">
    <p>Enter "<strong>date</strong>" to display the current date, "<strong>greet {0}</strong>" for a message and "<strong>random</strong>" to get a random number.</p>
    <p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $"></p-terminal>
</div>`,
        typescript: `
import { Component, OnDestroy } from '@angular/core';
import { TerminalService } from '../../../components/terminal/terminalservice';
import { Subscription } from 'rxjs';

@Component({
    selector: 'terminal-basic-demo',
    templateUrl: './terminal-basic-demo.html',
    providers: [TerminalService]
})
export class TerminalBasicDemo implements OnDestroy {
    subscription: Subscription;

    constructor(private terminalService: TerminalService) {
        this.subscription = this.terminalService.commandHandler.subscribe((command) => {
            let response = command === 'date' ? new Date().toDateString() : 'Unknown command: ' + command;
            this.terminalService.sendResponse(response);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}`
    };
}

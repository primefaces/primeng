import {Component,OnDestroy} from '@angular/core';
import {TerminalService} from '../../../components/terminal/terminalservice';
import {Subscription}   from 'rxjs';

@Component({
    templateUrl: './terminaldemo.html',
    providers: [TerminalService]
})
export class TerminalDemo implements OnDestroy {

    subscription: Subscription;

    constructor(private terminalService: TerminalService) {
        this.subscription = this.terminalService.commandHandler.subscribe(command => this.handleCommand(command));
    }

    handleCommand(command: string) {
        let response: string;

        switch (command) {
            case 'clear':
            case 'cls':
                this.terminalService.sendClear();
                break;
            case 'date':
                response = new Date().toDateString();
                break;
            default:
                response = `Unknown command: ${command}`;
        }

        if (response) {
            this.terminalService.sendResponse(response);
        }

    }

    ngOnDestroy() {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}

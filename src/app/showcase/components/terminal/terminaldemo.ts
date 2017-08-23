import {Component} from '@angular/core';
import {TerminalService} from '../../../components/terminal/terminalservice';

@Component({
    templateUrl: './terminaldemo.html',
    providers: [TerminalService]
})
export class TerminalDemo {
    
    constructor(private terminalService: TerminalService) {
        this.terminalService.commandHandler.subscribe(command => {
            let response = (command === 'date') ? new Date().toDateString() : 'Unknown command: ' + command;
            this.terminalService.sendResponse(response);
        });
    }
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TerminalService {

    private commandSource = new Subject<string>();
    private responseSource = new Subject<string>();
    private systemCommands = new Subject<string>();

    commandHandler = this.commandSource.asObservable();
    responseHandler = this.responseSource.asObservable();
    systemCommandHandler = this.systemCommands.asObservable();

    sendCommand(command: string) {
        if(command) {
            this.commandSource.next(command);
        }
    }

    sendResponse(response: string) {
        if(response) {
            this.responseSource.next(response);
        }
    }

    sendClear() {
        this.systemCommands.next('clear');
    }
}

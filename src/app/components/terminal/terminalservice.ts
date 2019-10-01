import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TerminalService {
    
    private commandSource = new Subject<string>();
    private bufferCommandSource = new Subject<string>();
    private responseSource = new Subject<string>();
    
    commandHandler = this.commandSource.asObservable();
    bufferCommandHandler = this.bufferCommandSource.asObservable();
    responseHandler = this.responseSource.asObservable();
    
    sendCommand(command: string) {
        if(command) {
            this.bufferCommandSource.next(command);
            this.commandSource.next(command);
        }
    }
    
    sendResponse(response: string) {
        if(response) {
            this.responseSource.next(response);
        }
    }
}
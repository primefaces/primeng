import { Observable } from 'rxjs/Observable';
export declare class TerminalService {
    private commandSource;
    private responseSource;
    commandHandler: Observable<string>;
    responseHandler: Observable<string>;
    sendCommand(command: string): void;
    sendResponse(response: string): void;
}

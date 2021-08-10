export declare class TerminalService {
    private commandSource;
    private responseSource;
    commandHandler: import("rxjs").Observable<string>;
    responseHandler: import("rxjs").Observable<string>;
    sendCommand(command: string): void;
    sendResponse(response: string): void;
}

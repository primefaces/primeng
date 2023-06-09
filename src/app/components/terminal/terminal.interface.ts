/**
 * Defines Terminal service options.
 * @group Interface
 */
export interface TerminalService {
    /**
     * Emits command value.
     * @param {string} command - Command value.
     */
    sendCommand: (command: string) => void;
    /**
     * Emits response value.
     * @param {string} response - Response value.
     */
    sendResponse: (response: string) => void;
}
import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-terminal {
    height: ${dt('terminal.height')};
    overflow: auto;
    background: ${dt('terminal.background')};
    color: ${dt('terminal.color')};
    border: 1px solid ${dt('terminal.border.color')};
    padding: ${dt('terminal.padding')};
    border-radius: ${dt('terminal.border.radius')};
}

.p-terminal-prompt {
    display: flex;
    align-items: center;
}

.p-terminal-prompt-value {
    flex: 1 1 auto;
    border: 0 none;
    background: transparent;
    color: inherit;
    padding: 0;
    outline: 0 none;
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
}

.p-terminal-prompt-label {
    margin-right: ${dt('terminal.prompt.gap')};
}

.p-terminal-input::-ms-clear {
    display: none;
}

.p-terminal-command-response {
    margin: ${dt('terminal.command.response.margin')};
}
`;

const classes = {
    root: 'p-terminal p-component',
    welcomeMessage: 'p-terminal-welcome-message',
    commandList: 'p-terminal-command-list',
    command: 'p-terminal-command',
    commandValue: 'p-terminal-command-value',
    commandResponse: 'p-terminal-command-response',
    prompt: 'p-terminal-prompt',
    promptLabel: 'p-terminal-prompt-label',
    promptValue: 'p-terminal-prompt-value'
};

@Injectable()
export class TerminalStyle extends BaseStyle {
    name = 'terminal';

    theme = theme;

    classes = classes;
}

/**
 *
 * Terminal is a text based user interface.
 *
 * [Live Demo](https://www.primeng.org/terminal)
 *
 * @module terminalstyle
 *
 */
export enum TerminalClasses {
    /**
     * Class name of the root element
     */
    root = 'p-terminal',
    /**
     * Class name of the welcome message element
     */
    welcomeMessage = 'p-terminal-welcome-message',
    /**
     * Class name of the command list element
     */
    commandList = 'p-terminal-command-list',
    /**
     * Class name of the command element
     */
    command = 'p-terminal-command',
    /**
     * Class name of the command value element
     */
    commandValue = 'p-terminal-command-value',
    /**
     * Class name of the command response element
     */
    commandResponse = 'p-terminal-command-response',
    /**
     * Class name of the prompt element
     */
    prompt = 'p-terminal-prompt',
    /**
     * Class name of the prompt label element
     */
    promptLabel = 'p-terminal-prompt-label',
    /**
     * Class name of the prompt value element
     */
    promptValue = 'p-terminal-prompt-value'
}

export interface TerminalStyle extends BaseStyle {}

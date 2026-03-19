import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
    .p-commandmenu {
        display: flex;
        flex-direction: column;
        border: 1px solid var(--p-content-border-color);
        border-radius: var(--p-content-border-radius);
        background: var(--p-content-background);
        color: var(--p-content-color);
        overflow: hidden;
    }

    .p-commandmenu-header {
        padding: 0.5rem 0.75rem;
        border-bottom: 1px solid var(--p-content-border-color);
    }

    .p-commandmenu-input {
        width: 100%;
        padding: 0.5rem 0.75rem;
        border: none;
        outline: none;
        background: transparent;
        color: inherit;
        font-family: inherit;
        font-size: 1rem;
    }

    .p-commandmenu-input::placeholder {
        color: var(--p-text-muted-color);
    }

    .p-commandmenu .p-listbox {
        border: 0;
        border-radius: 0;
        background: transparent;
    }

    .p-commandmenu .p-listbox-list-container {
        max-height: 18rem;
    }

    .p-commandmenu-empty {
        padding: 0.5rem 0.75rem;
        text-align: center;
        color: var(--p-text-muted-color);
    }

    .p-commandmenu-footer {
        padding: 0.5rem 0.75rem;
        border-top: 1px solid var(--p-content-border-color);
    }
`;

const classes = {
    root: 'p-commandmenu p-component',
    header: 'p-commandmenu-header',
    input: 'p-commandmenu-input',
    empty: 'p-commandmenu-empty',
    footer: 'p-commandmenu-footer'
};

@Injectable()
export class CommandMenuStyle extends BaseStyle {
    name = 'commandmenu';

    style = style;

    classes = classes;
}

/**
 *
 * CommandMenu is a search-driven command palette component.
 *
 * [Live Demo](https://www.primeng.org/commandmenu/)
 *
 * @module commandmenustyle
 *
 */
export enum CommandMenuClasses {
    /**
     * Class name of the root element
     */
    root = 'p-commandmenu',
    /**
     * Class name of the header element
     */
    header = 'p-commandmenu-header',
    /**
     * Class name of the input element
     */
    input = 'p-commandmenu-input',
    /**
     * Class name of the empty message element
     */
    empty = 'p-commandmenu-empty',
    /**
     * Class name of the footer element
     */
    footer = 'p-commandmenu-footer'
}

export interface CommandMenuStyleType extends BaseStyle {}

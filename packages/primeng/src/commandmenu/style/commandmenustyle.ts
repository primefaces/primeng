import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const style = /*css*/ `
    .p-commandmenu {
        position: relative;
        overflow: hidden;
        border: 1px solid light-dark(var(--p-surface-200), var(--p-surface-700));
        background-color: light-dark(var(--p-surface-0), var(--p-surface-950));
        border-radius: 0.5rem;
        max-width: 36rem;
        height: 25rem;
        display:flex;
        flex-direction: column;
    }

    .p-commandmenu-header {
        border-bottom: 1px solid light-dark(var(--p-surface-200), var(--p-surface-700));
        padding: 0.375rem 1.125rem;
    }

    .p-commandmenu-input{
        width: 100%;
        outline:none;
        padding: 0.375rem 0;
        font-size: 1rem;
        background-color: transparent;
    }

    .p-commandmenu-footer {
        background-color: light-dark(var(--p-surface-50), var(--p-surface-900));
        border-top: 1px solid light-dark(var(--p-surface-200), var(--p-surface-700));
        padding: 0.625rem 1.125rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .p-commandmenu-empty{
        text-align: center;
        padding: 2rem 0;
        color: light-dark(var(--p-surface-500), var(--p-surface-400));
    }

    /* For PrimeNG */
    .p-commandmenu .p-listbox {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 0;
        border-radius: 0;
        background: transparent;
    }

    .p-commandmenu .p-listbox-list-container {
        flex: 1;
        overflow: auto;
    }

    .p-commandmenu .p-commandmenu-footer {
        display: block;
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

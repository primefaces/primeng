import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const css = /*css*/ `
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`;

@Injectable({
    providedIn: 'root'
})
export class BaseIconStyle extends BaseStyle {
    name = 'baseicon';

    css = css;
}
/**
 *
 * [Live Demo](https://www.primeng.org/)
 *
 * @module baseiconstyle
 *
 */

export enum BaseIconClasses {
    root = 'p-icon'
}

export interface BaseIconStyle extends BaseStyle {}

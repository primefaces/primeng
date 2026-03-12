import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = `

    .p-inputcolor{
        display:block
    }

    .p-inputcolor-area{
        display: block;
        position: relative;
        aspect-ratio: 4 / 3;
        border-radius: 0.5rem;
        background: var(--area-background);
        touch-action: none;
        forced-color-adjust: none;
    }

    .p-inputcolor-area-thumb{
        display: block;
        width: 1rem;
        height: 1rem;
        position: absolute;
        z-index: 1;
        border-radius: 999px;
        touch-action: none;
        forced-color-adjust: none;
        cursor: pointer;
        transform: translate(-50%, -50%);
        top: var(--thumb-position-top)    ;
        left: var(--thumb-position-left);
        background: var(--thumb-background);
        outline: none;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 3px solid white;
        transition: border 0.1s ease-in-out;
    }

    .p-inputcolor-area-background{
        display: block;
        position: absolute;
        inset: 0;
        z-index: 0;
        border-radius: inherit;
        pointer-events: none;
        background: var(--area-gradient);
        user-select: none;
        touch-action: none;
        forced-color-adjust: none;
        box-shadow: inset 0 0 0 1px light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.15));
    }

    .p-inputcolor-slider{
        display: block;
        position:relative;
        border-radius: 0.25rem;
        forced-color-adjust: none;
        touch-action: none;
    }

    .p-inputcolor-slider-horizontal{
        height: 1rem;
        width: auto;
        touch-action: pan-x;
    }

    .p-inputcolor-slider-vertical{
        height: auto;
        width: 1rem;
        touch-action: pan-y;
    }

    .p-inputcolor-slider-thumb{
        display: block;
        position: relative;
        width: 1rem;
        height: 1rem;
        position: absolute;
        z-index: 1;
        border-radius: 999px;
        outline: none;
        touch-action: none;
        background: var(--slider-thumb-background);
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        border: 3px solid white;
        transition: border 0.1s ease-in-out;
    }

    .p-inputcolor-slider-thumb:has(:focus-visible),
    .p-inputcolor-area-thumb:focus-visible{
        border: 2px solid rgba(255,255,255);
        outline: 2px solid rgba(255,255,255,0.3);
        outline-offset: 2px;
    }

    .p-inputcolor-slider-track{
        display: block;
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        user-select: none;
        touch-action: none;
        box-shadow: inset 0 0 0 1px light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.15));
        background: var(--slider-background);
    }

    .p-inputcolor-slider input {
        clip-path:inset(50%);
        overflow:hidden;
        white-space:nowrap;
        border:0;
        padding:0;
        width:100%;
        height:100%;
        margin:-1px;
        position:fixed;top:0;left:0;
    }

    .p-inputcolor-transparency-grid{
        display: block;
        position: absolute;
        inset: 0;
        z-index: 0;
        background: conic-gradient(var(--p-surface-100) 0deg, var(--p-surface-100) 25%, transparent 0deg, transparent 50%, var(--p-surface-100) 0deg, var(--p-surface-100) 75%, transparent 0deg);
        background-size: 0.5rem 0.5rem;
        background-color: rgb(255, 255, 255);
        border-radius: inherit;
        pointer-events: none;
        user-select: none;
        touch-action: none;
    }

    .p-inputcolor-swatch{
        display: block;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.375rem;
        position: relative;
    }

    .p-inputcolor-swatch-background{
        display: block;
        background: var(--swatch-background);
        box-shadow: inset 0 0 0 1px light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.15));
        position: absolute;
        inset: 0;
        z-index: 0;
        border-radius: inherit;
        pointer-events: none;
        user-select: none;
        touch-action: none;
        forced-color-adjust: none;
    }

`;

const classes = {
    root: ({ instance }) => [
        'p-inputcolor p-component',
        {
            'p-disabled': instance.$disabled()
        }
    ],
    area: 'p-inputcolor-area',
    areaThumb: ({ instance }) => ['p-inputcolor-area-thumb', { 'p-disabled': instance.$pc?.$disabled() }],
    areaBackground: 'p-inputcolor-area-background',
    slider: ({ instance }) => ['p-inputcolor-slider', `p-inputcolor-slider-${instance.orientation()}`],
    sliderThumb: ({ instance }) => ['p-inputcolor-slider-thumb', { 'p-disabled': instance.$pc?.$disabled() }],
    sliderTrack: 'p-inputcolor-slider-track',
    transparencyGrid: 'p-inputcolor-transparency-grid',
    swatch: 'p-inputcolor-swatch',
    swatchBackground: 'p-inputcolor-swatch-background',
    eyeDropper: 'p-inputcolor-eyedropper',
    input: 'p-inputcolor-input'
};

@Injectable()
export class InputColorStyle extends BaseStyle {
    name = 'inputcolor';

    style = theme;

    classes = classes;
}

export enum InputColorClasses {
    root = 'p-inputcolor',
    area = 'p-inputcolor-area',
    areaBackground = 'p-inputcolor-area-background',
    areaThumb = 'p-inputcolor-area-thumb',
    slider = 'p-inputcolor-slider',
    sliderTrack = 'p-inputcolor-slider-track',
    sliderThumb = 'p-inputcolor-slider-thumb',
    swatch = 'p-inputcolor-swatch',
    swatchBackground = 'p-inputcolor-swatch-background',
    transparencyGrid = 'p-inputcolor-transparency-grid',
    input = 'p-inputcolor-input',
    eyeDropper = 'p-inputcolor-eyedropper'
}

export interface InputColorStyle extends BaseStyle {}

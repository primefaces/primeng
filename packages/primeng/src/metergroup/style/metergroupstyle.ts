import { Injectable } from '@angular/core';
import { style } from '@primeuix/styles/metergroup';
import { BaseStyle } from 'primeng/base';

const classes = {
    root: ({ instance }) => [
        'p-metergroup p-component',
        {
            'p-metergroup-horizontal': instance.orientation === 'horizontal',
            'p-metergroup-vertical': instance.orientation === 'vertical'
        }
    ],
    meters: 'p-metergroup-meters',
    meter: 'p-metergroup-meter',
    labelList: ({ instance }) => [
        'p-metergroup-label-list',
        {
            'p-metergroup-label-list-vertical': instance.labelOrientation === 'vertical',
            'p-metergroup-label-list-horizontal': instance.labelOrientation === 'horizontal'
        }
    ],
    label: 'p-metergroup-label',
    labelIcon: 'p-metergroup-label-icon',
    labelMarker: 'p-metergroup-label-marker',
    labelText: 'p-metergroup-label-text'
};

@Injectable()
export class MeterGroupStyle extends BaseStyle {
    name = 'metergroup';

    theme = style;

    classes = classes;
}

/**
 *
 * MeterGroup is a group of process status indicators.
 *
 * [Live Demo](https://www.primeng.org/metergroup)
 *
 * @module metergroupstyle
 *
 */
export enum MeterGroupClasses {
    /**
     * Class name of the root element
     */
    root = 'p-metergroup',
    /**
     * Class name of the meters element
     */
    meters = 'p-metergroup-meters',
    /**
     * Class name of the meter element
     */
    meter = 'p-metergroup-meter',
    /**
     * Class name of the label list element
     */
    labelList = 'p-metergroup-label-list',
    /**
     * Class name of the label element
     */
    label = 'p-metergroup-label',
    /**
     * Class name of the label icon element
     */
    labelIcon = 'p-metergroup-label-icon',
    /**
     * Class name of the label marker element
     */
    labelMarker = 'p-metergroup-label-marker',
    /**
     * Class name of the label text element
     */
    labelText = 'p-metergroup-label-text'
}

export interface MeterGroupStyle extends BaseStyle {}

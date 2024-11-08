import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-metergroup {
    display: flex;
    gap: ${dt('metergroup.gap')};
}

.p-metergroup-meters {
    display: flex;
    background: ${dt('metergroup.meters.background')};
    border-radius: ${dt('metergroup.border.radius')};
}

.p-metergroup-label-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.p-metergroup-label {
    display: inline-flex;
    align-items: center;
    gap: ${dt('metergroup.label.gap')};
}

.p-metergroup-label-marker {
    display: inline-flex;
    width: ${dt('metergroup.label.marker.size')};
    height: ${dt('metergroup.label.marker.size')};
    border-radius: 100%;
}

.p-metergroup-label-icon {
    font-size: ${dt('metergroup.label.icon.size')};
    width: ${dt('metergroup.label.icon.size')};
    height: ${dt('metergroup.label.icon.size')};
}

.p-metergroup-horizontal {
    flex-direction: column;
}

.p-metergroup-label-list-horizontal {
    gap: ${dt('metergroup.label.list.horizontal.gap')};
}

.p-metergroup-horizontal .p-metergroup-meters {
    height: ${dt('metergroup.meters.size')};
}

.p-metergroup-horizontal .p-metergroup-meter:first-of-type {
    border-top-left-radius: ${dt('metergroup.border.radius')};
    border-bottom-left-radius: ${dt('metergroup.border.radius')};
}

.p-metergroup-horizontal .p-metergroup-meter:last-of-type {
    border-top-right-radius: ${dt('metergroup.border.radius')};
    border-bottom-right-radius: ${dt('metergroup.border.radius')};
}

.p-metergroup-vertical {
    flex-direction: row;
}

.p-metergroup-label-list-vertical {
    flex-direction: column;
    gap: ${dt('metergroup.label.list.vertical.gap')};
}

.p-metergroup-vertical .p-metergroup-meters {
    flex-direction: column;
    width: ${dt('metergroup.meters.size')};
    height: 100%;
}

.p-metergroup-vertical .p-metergroup-label-list {
    align-items: start;
}

.p-metergroup-vertical .p-metergroup-meter:first-of-type {
    border-top-left-radius: ${dt('metergroup.border.radius')};
    border-top-right-radius: ${dt('metergroup.border.radius')};
}
.p-metergroup-vertical .p-metergroup-meter:last-of-type {
    border-bottom-left-radius: ${dt('metergroup.border.radius')};
    border-bottom-right-radius: ${dt('metergroup.border.radius')};
}
`;

const classes = {
    root: ({ props }) => [
        'p-metergroup p-component',
        {
            'p-metergroup-horizontal': props.orientation === 'horizontal',
            'p-metergroup-vertical': props.orientation === 'vertical'
        }
    ],
    meters: 'p-metergroup-meters',
    meter: 'p-metergroup-meter',
    labelList: ({ props }) => [
        'p-metergroup-label-list',
        {
            'p-metergroup-label-list-vertical': props.labelOrientation === 'vertical',
            'p-metergroup-label-list-horizontal': props.labelOrientation === 'horizontal'
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

    theme = theme;

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

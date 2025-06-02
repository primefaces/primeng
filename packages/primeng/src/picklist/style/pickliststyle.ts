import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { style } from '@primeuix/styles/picklist';

const classes = {
    root: ({ instance }) => ['p-picklist p-component', instance.styleClass],
    sourceControls: 'p-picklist-controls p-picklist-source-controls',
    sourceListContainer: 'p-picklist-list-container p-picklist-source-list-container',
    transferControls: 'p-picklist-controls p-picklist-transfer-controls',
    targetListContainer: 'p-picklist-list-container p-picklist-target-list-container',
    targetControls: 'p-picklist-controls p-picklist-target-controls'
};

@Injectable()
export class PickListStyle extends BaseStyle {
    name = 'picklist';

    theme = style;

    classes = classes;
}

/**
 *
 * PickList is used to reorder items between different lists.
 *
 * [Live Demo](https://www.primeng.org/picklist)
 *
 * @module pickliststyle
 *
 */

export enum PickListClasses {
    /**
     * Class name of the root element
     */
    root = 'p-picklist',
    /**
     * Class name of the source controls element
     */
    sourceControls = 'p-picklist-source-controls',
    /**
     * Class name of the source list container element
     */
    sourceListContainer = 'p-picklist-source-list-container',
    /**
     * Class name of the transfer controls element
     */
    transferControls = 'p-picklist-transfer-controls',
    /**
     * Class name of the target list container element
     */
    targetListContainer = 'p-picklist-target-list-container',
    /**
     * Class name of the target controls element
     */
    targetControls = 'p-picklist-target-controls'
}

export interface PickListStyle extends BaseStyle {}

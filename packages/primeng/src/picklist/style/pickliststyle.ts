import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-picklist {
    display: flex;
    gap: ${dt('picklist.gap')};
}

.p-picklist-controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: ${dt('picklist.controls.gap')};
}

.p-picklist-list-container {
    flex: 1 1 50%;
}

.p-picklist .p-listbox {
    height: 100%;
}
`;

const classes = {
    root: 'p-picklist p-component',
    sourceControls: 'p-picklist-controls p-picklist-source-controls',
    sourceListContainer: 'p-picklist-list-container p-picklist-source-list-container',
    transferControls: 'p-picklist-controls p-picklist-transfer-controls',
    targetListContainer: 'p-picklist-list-container p-picklist-target-list-container',
    targetControls: 'p-picklist-controls p-picklist-target-controls'
};

@Injectable()
export class PickListStyle extends BaseStyle {
    name = 'picklist';

    theme = theme;

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

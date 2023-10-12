import { MenuItem } from './menuitem';

/**
 * StepItem provides all the properties from MenuItem, plus some custom ones.
 * @group Interface
 */
export interface StepItem extends MenuItem {
    /**
     * Id of the controlled element. Allows to set the aria-controls attribute for the step. Note that the id of the controlled element must be set manually in the controlled element.
     */
    ariaControls?: string;
}

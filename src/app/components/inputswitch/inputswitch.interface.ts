import { InputSwitch } from './inputswitch';
/**
 * Custom change event.
 * @see {@link InputSwitch.onChange}
 */
export interface InputSwitchOnChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Checked state.
     */
    checked: boolean;
}

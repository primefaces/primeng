import { InputSwitch } from './inputswitch';
/**
 * Custom change event.
 * @see {@link InputSwitch.onChange}
 * @group Events
 */
export interface InputSwitchChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Checked state.
     */
    checked: boolean;
}

import { ToggleSwitch } from './toggleswitch';
/**
 * Custom change event.
 * @see {@link ToggleSwitch.onChange}
 * @group Events
 */
export interface ToggleSwitchChangeEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Checked state.
     */
    checked: boolean;
}

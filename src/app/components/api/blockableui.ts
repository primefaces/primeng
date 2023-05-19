/**
 * Represents a blockable user interface element.
 */
export interface BlockableUI {
    /**
     * Retrieves the blockable element associated with the UI.
     * @returns The HTML element that can be blocked.
     */
    getBlockableElement(): HTMLElement;
}

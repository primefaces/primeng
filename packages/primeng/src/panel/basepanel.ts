import { Directive, EventEmitter, Input, Output, booleanAttribute, signal } from '@angular/core';
import { uuid } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { PanelAfterToggleEvent, PanelBeforeToggleEvent } from './panel';

@Directive({
    standalone: true
})
export class BasePanel extends BaseComponent {
    /**
     * Id of the component.
     */
    @Input() id: string | undefined = uuid('pn_id_');
    /**
     * Defines if content of panel can be expanded and collapsed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) toggleable: boolean | undefined;

    /**
     * Header text of the panel.
     * @group Props
     */
    @Input('header') _header: string | undefined;

    /**
     * Internal collapsed state
     */
    _collapsed: boolean | undefined;

    /**
     * Defines the initial state of panel content, supports one or two-way binding as well.
     * @group Props
     */
    @Input({ transform: booleanAttribute })
    get collapsed(): boolean | undefined {
        return this._collapsed;
    }
    set collapsed(value: boolean | undefined) {
        this._collapsed = value;
    }

    /**
     * Style class of the component.
     * @group Props
     * @deprecated since v20.0.0, use `class` instead.
     */
    @Input() styleClass: string | undefined;

    /**
     * Position of the icons.
     * @group Props
     */
    @Input() iconPos: 'start' | 'end' | 'center' = 'end';

    /**
     * Specifies if header of panel cannot be displayed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) showHeader: boolean = true;

    /**
     * Specifies the toggler element to toggle the panel content.
     * @group Props
     */
    @Input() toggler: 'icon' | 'header' = 'icon';

    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() toggleButtonProps: any;

    /**
     * Emitted when the collapsed changes.
     * @param {boolean} value - New Value.
     * @group Emits
     */
    @Output() collapsedChange: EventEmitter<boolean | undefined> = new EventEmitter<boolean | undefined>();

    /**
     * Callback to invoke before panel toggle.
     * @param {PanelBeforeToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    @Output() onBeforeToggle: EventEmitter<PanelBeforeToggleEvent> = new EventEmitter<PanelBeforeToggleEvent>();

    /**
     * Callback to invoke after panel toggle.
     * @param {PanelAfterToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    @Output() onAfterToggle: EventEmitter<PanelAfterToggleEvent> = new EventEmitter<PanelAfterToggleEvent>();

    // TODO: Move to panel.ts
    animating = signal<boolean>(false);

    initParams() {
        return {
            props: {
                id: this.id,
                toggleable: this.toggleable,
                header: this._header,
                collapsed: this._collapsed,
                styleClass: this.styleClass,
                iconPos: this.iconPos,
                showHeader: this.showHeader,
                toggler: this.toggler,
                transitionOptions: this.transitionOptions,
                toggleButtonProps: this.toggleButtonProps
            },
            state: {
                animating: this.animating(),
                collapsed: this._collapsed,
                isExpanded: !this._collapsed
            }
        };
    }
}

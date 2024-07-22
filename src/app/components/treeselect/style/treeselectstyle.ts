import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-treeselect {
    display: inline-flex;
    cursor: pointer;
    position: relative;
    user-select: none;
    background: ${dt('treeselect.background')};
    border: 1px solid ${dt('treeselect.border.color')};
    transition: background ${dt('treeselect.transition.duration')}, color ${dt('treeselect.transition.duration')}, border-color ${dt('treeselect.transition.duration')}, outline-color ${dt('treeselect.transition.duration')}, box-shadow ${dt(
    'treeselect.transition.duration'
)};
    border-radius: ${dt('treeselect.border.radius')};
    outline-color: transparent;
    box-shadow: ${dt('treeselect.shadow')};
}

.p-treeselect:not(.p-disabled):hover {
    border-color: ${dt('treeselect.hover.border.color')};
}

.p-treeselect:not(.p-disabled).p-focus {
    border-color: ${dt('treeselect.focus.border.color')};
    box-shadow: ${dt('treeselect.focus.ring.shadow')};
    outline: ${dt('treeselect.focus.ring.width')} ${dt('treeselect.focus.ring.style')} ${dt('treeselect.focus.ring.color')};
    outline-offset: ${dt('treeselect.focus.ring.offset')};
}

.p-treeselect.p-variant-filled {
    background: ${dt('treeselect.filled.background')};
}

.p-treeselect.p-variant-filled.p-focus {
    background: ${dt('treeselect.filled.focus.background')};
}

.p-treeselect.p-disabled {
    opacity: 1;
    background: ${dt('treeselect.disabled.background')};
}

.p-treeselect-dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt('treeselect.dropdown.color')};
    width: ${dt('treeselect.dropdown.width')};
    border-top-right-radius: ${dt('border.radius.md')};
    border-bottom-right-radius: ${dt('border.radius.md')};
}

.p-treeselect-label-container {
    overflow: hidden;
    flex: 1 1 auto;
    cursor: pointer;
}

.p-treeselect-label {
    display: flex;
    align-items-center;
    gap: calc(${dt('treeselect.padding.y')} / 2);
    white-space: nowrap;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: ${dt('treeselect.padding.y')} ${dt('treeselect.padding.x')};
    color: ${dt('treeselect.color')};
}

.p-treeselect-label.p-placeholder {
    color: ${dt('treeselect.placeholder.color')};
}

.p-treeselect.p-disabled .p-treeselect-label {
    color: ${dt('treeselect.disabled.color')};
}

.p-treeselect-label-empty {
    overflow: hidden;
    visibility: hidden;
}

.p-treeselect .p-treeselect-overlay {
    min-width: 100%;
}

.p-treeselect-overlay {
    position: absolute;
    top: 0;
    left: 0;
    background: ${dt('treeselect.overlay.background')};
    color: ${dt('treeselect.overlay.color')};
    border: 1px solid ${dt('treeselect.overlay.border.color')};
    border-radius: ${dt('treeselect.overlay.border.radius')};
    box-shadow: ${dt('treeselect.overlay.shadow')};
    overflow: hidden;
}


.p-treeselect-tree-container {
    overflow: auto;
}

.p-treeselect-empty-message {
    padding: ${dt('treeselect.empty.message.padding')};
    background: transparent;
}

.p-treeselect-fluid {
    display: flex;
}

.p-treeselect-overlay .p-tree {
    padding: ${dt('treeselect.tree.padding')};
}

.p-treeselect-label .p-chip {
    padding-top: calc(${dt('treeselect.padding.y')} / 2);
    padding-bottom: calc(${dt('treeselect.padding.y')} / 2);
    border-radius: ${dt('treeselect.chip.border.radius')};
}

.p-treeselect-label:has(.p-chip) {
    padding: calc(${dt('treeselect.padding.y')} / 2) calc(${dt('treeselect.padding.x')} / 2);
}

/* For PrimeNG */

p-treeselect.ng-invalid.ng-dirty > .p-inputwrapper {
    border-color: ${dt('treeselect.invalid.border.color')};
}

.p-treeselect-clear-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: transparent;
    color: ${dt('treeselect.dropdown.color')};
}

`;

const inlineStyles = {
    root: ({ instance }) => ({ position: instance.appendTo === 'self' ? 'relative' : undefined })
};

const classes = {
    root: ({ instance }) => ({
        'p-treeselect p-component p-inputwrapper': true,
        'p-treeselect-display-chip': instance.display === 'chip',
        'p-disabled': instance.disabled,
        'p-invalid': instance.invalid,
        'p-focus': instance.focused,
        'p-variant-filled': instance.variant ? instance.variant === 'filled' : instance.config.inputStyle() === 'filled',
        'p-inputwrapper-filled': !instance.emptyValue,
        'p-inputwrapper-focus': instance.focused || instance.overlayVisible,
        'p-treeselect-open': instance.overlayVisible,
        'p-treeselect-clearable': instance.showClear
    }),
    labelContainer: 'p-treeselect-label-container',
    label: ({ instance }) => ({
        'p-treeselect-label': true,
        'p-placeholder': instance.label === instance.placeholder,
        'p-treeselect-label-empty': !instance.placeholder && instance.emptyValue
    }),
    chip: 'p-treeselect-chip-item',
    pcChip: 'p-treeselect-chip',
    dropdown: 'p-treeselect-dropdown',
    dropdownIcon: 'p-treeselect-dropdown-icon',
    panel: 'p-treeselect-overlay p-component',
    treeContainer: 'p-treeselect-tree-container',
    emptyMessage: 'p-treeselect-empty-message'
};

@Injectable()
export class TreeSelectStyle extends BaseStyle {
    name = 'treeselect';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

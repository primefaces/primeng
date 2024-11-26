import { RadioButtonDesignTokens } from '../../../../types/radiobutton';

export default {
    root: {
        width: '1.5rem',
        height: '1.5rem',
        background: '{form.field.background}',
        checkedBackground: '{primary.color}',
        checkedHoverBackground: '{primary.hover.color}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        checkedBorderColor: '{primary.color}',
        checkedHoverBorderColor: '{primary.hover.color}',
        checkedFocusBorderColor: '{primary.color}',
        checkedDisabledBorderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        shadow: '{form.field.shadow}',
        focusRing: {
            width: '{form.field.focus.ring.width}',
            style: '{form.field.focus.ring.style}',
            color: '{form.field.focus.ring.color}',
            offset: '{form.field.focus.ring.offset}',
            shadow: '{form.field.focus.ring.shadow}'
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
            width: '1.25rem',
            height: '1.25rem'
        },
        lg: {
            width: '1.75rem',
            height: '1.75rem'
        }
    },
    icon: {
        size: '1rem',
        checkedColor: '{primary.contrast.color}',
        checkedHoverColor: '{primary.contrast.color}',
        disabledColor: '{form.field.disabled.color}',
        sm: {
            size: '0.75rem'
        },
        lg: {
            size: '1.25rem'
        }
    }
} as RadioButtonDesignTokens;

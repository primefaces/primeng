import { RadioButtonDesignTokens } from '../../../../types/radiobutton';

export default {
    root: {
        width: '1.25rem',
        height: '1.25rem',
        background: '{form.field.background}',
        checkedBackground: '{primary.color}',
        checkedHoverBackground: '{primary.hover.color}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.border.color}',
        checkedBorderColor: '{primary.color}',
        checkedHoverBorderColor: '{primary.hover.color}',
        checkedFocusBorderColor: '{primary.color}',
        checkedDisabledBorderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        shadow: '{form.field.shadow}',
        focusRing: {
            width: '{focus.ring.width}',
            style: '{focus.ring.style}',
            color: '{focus.ring.color}',
            offset: '{focus.ring.offset}',
            shadow: '{focus.ring.shadow}'
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
            width: '1rem',
            height: '1rem'
        },
        lg: {
            width: '1.5rem',
            height: '1.5rem'
        }
    },
    icon: {
        size: '0.75rem',
        checkedColor: '{primary.contrast.color}',
        checkedHoverColor: '{primary.contrast.color}',
        disabledColor: '{form.field.disabled.color}',
        sm: {
            size: '0.5rem'
        },
        lg: {
            size: '1rem'
        }
    }
} as RadioButtonDesignTokens;

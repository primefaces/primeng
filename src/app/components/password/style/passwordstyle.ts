import { Injectable } from '@angular/core';
import { BaseStyle } from 'primeng/base';

const theme = ({ dt }) => `
.p-password {
    display: inline-flex;
    position: relative;
}

.p-password .p-password-overlay {
    min-width: 100%;
}

.p-password-meter {
    height: ${dt('password.meter.height')};
    background: ${dt('password.meter.background')};
    border-radius: ${dt('password.meter.border.radius')};
}

.p-password-meter-label {
    height: 100%;
    width: 0;
    transition: width 1s ease-in-out;
    border-radius: ${dt('password.meter.border.radius')};
}

.p-password-meter-weak {
    background: ${dt('password.strength.weak.background')};
}

.p-password-meter-medium {
    background: ${dt('password.strength.medium.background')};
}

.p-password-meter-strong {
    background: ${dt('password.strength.strong.background')};
}

.p-password-fluid {
    display: flex;
}

.p-password-fluid .p-password-input {
    width: 100%;
}

.p-password-input::-ms-reveal,
.p-password-input::-ms-clear {
    display: none;
}

.p-password-overlay {
    position: absolute;
    padding: ${dt('password.overlay.padding')};
    background: ${dt('password.overlay.background')};
    color: ${dt('password.overlay.color')};
    border: 1px solid ${dt('password.overlay.border.color')};
    box-shadow: ${dt('password.overlay.shadow')};
    border-radius: ${dt('password.overlay.border.radius')};
}

.p-password-content {
    display: flex;
    flex-direction: column;
    gap: ${dt('password.content.gap')};
}

.p-password-toggle-mask-icon {
    right: ${dt('form.field.padding.x')};
    color: ${dt('password.icon.color')};
    position: absolute;
    top: 50%;
    margin-top: calc(-1 * calc(${dt('icon.size')} / 2));
    width: ${dt('icon.size')};
    height: ${dt('icon.size')};
}

.p-password:has(.p-password-toggle-mask-icon) .p-password-input {
    padding-right: calc((${dt('form.field.padding.x')} * 2) + ${dt('icon.size')});
}

/* For PrimeNG */
p-password.ng-invalid.ng-dirty > .p-password.p-inputwrapper > .p-inputtext {
    border-color: ${dt('form.field.invalid.border.color')};
}

.p-password-clear-icon {
    position: absolute;
    top: 50%;
    margin-top: -0.5rem;
    cursor: pointer;
    right: ${dt('form.field.padding.x')};
    color: ${dt('form.field.icon.color')};
}

.p-password-fluid-directive {
    width:100%
}
`;

const inlineStyles = {
    root: ({ instance }) => ({ position: instance.appendTo === 'self' ? 'relative' : undefined })
};

const classes = {
    root: ({ instance }) => ({
        'p-password p-component p-inputwrapper': true,
        'p-inputwrapper-filled': instance.filled(),
        'p-inputwrapper-focus': instance.focused,
        'p-password-fluid': instance.hasFluid
    }),
    pcInput: 'p-password-input',
    maskIcon: 'p-password-toggle-mask-icon p-password-mask-icon',
    unmaskIcon: 'p-password-toggle-mask-icon p-password-unmask-icon',
    overlay: 'p-password-overlay p-component',
    content: 'p-password-content',
    meter: 'p-password-meter',
    meterLabel: ({ instance }) => `p-password-meter-label ${instance.meter ? 'p-password-meter-' + instance.meter.strength : ''}`,
    meterText: 'p-password-meter-text'
};

@Injectable()
export class PasswordStyle extends BaseStyle {
    name = 'password';

    theme = theme;

    classes = classes;

    inlineStyles = inlineStyles;
}

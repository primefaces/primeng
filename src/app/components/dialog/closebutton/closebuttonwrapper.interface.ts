type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

export interface ButtonWrapperProps {
    type?: string;
    iconPos?: ButtonIconPosition;
    icon?: string | undefined;
    badge?: string | undefined;
    label?: string | undefined;
    disabled?: boolean | undefined;
    loading?: boolean;
    loadingIcon?: string | undefined;
    raised?: boolean;
    rounded?: boolean;
    text?: boolean;
    plain?: boolean;
    severity?: 'success' | 'info' | 'warning' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;
    outlined?: boolean;
    link?: boolean;
    tabindex?: number | undefined;
    size?: 'small' | 'large' | undefined;
    style?: { [klass: string]: any } | null | undefined;
    styleClass?: string | undefined;
    badgeClass?: string | undefined;
    ariaLabel?: string | undefined;
    autofocus?: boolean | undefined;
}

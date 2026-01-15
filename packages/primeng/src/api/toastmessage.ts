/**
 * Deines valid options for the toast message.
 * @group Interface
 */
export interface ToastMessageOptions {
    text?: any;
    severity?: 'success' | 'info' | 'error' | 'warn';
    summary?: string;
    detail?: string;
    id?: any;
    key?: string;
    life?: number;
    sticky?: boolean;
    closable?: boolean;
    data?: any;
    icon?: string;
    contentStyleClass?: string;
    styleClass?: string;
    closeIcon?: string;
}

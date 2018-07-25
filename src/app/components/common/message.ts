export interface Message {
    severity?: string;
    summary?: string;
    detail?: string;
    id?: any;
    key?: string;
    timeout?: number;
    sticky?: boolean;
    closable?: boolean;
    modal?: boolean;
}
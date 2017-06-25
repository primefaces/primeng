export interface Confirmation {
    message: string;
    key?: string;
    icon?: string;
    header?: string;
    accept?: () => void;
    reject?: () => void;
    acceptVisible?: boolean;
    rejectVisible?: boolean;
}

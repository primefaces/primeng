import { Message } from '../../../components/common/api';
export declare class GrowlDemo {
    msgs: Message[];
    showSuccess(): void;
    showInfo(): void;
    showWarn(): void;
    showError(): void;
    showMultiple(): void;
    clear(): void;
}

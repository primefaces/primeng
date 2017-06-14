import { ConfirmationService } from '../../../components/common/api';
import { Message } from '../../../components/common/api';
export declare class ConfirmDialogDemo {
    private confirmationService;
    msgs: Message[];
    constructor(confirmationService: ConfirmationService);
    confirm1(): void;
    confirm2(): void;
}

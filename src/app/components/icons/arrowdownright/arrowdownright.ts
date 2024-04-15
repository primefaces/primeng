import { Component } from '@angular/core';
import { BaseIcon } from '@alamote/primeng/baseicon';

@Component({
    selector: 'ArrowDownRightIcon',
    standalone: true,
    imports: [BaseIcon],
    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M12 3.88141C12 3.70664 11.9306 3.53903 11.807 3.41545C11.6834 3.29187 11.5158 3.22244 11.341 3.22244C11.1662 3.22244 10.9986 3.29187 10.875 3.41545C10.7515 3.53903 10.682 3.70664 10.682 3.88141V9.75069L3.1082 2.17686C2.98328 2.06046 2.81806 1.99709 2.64734 2.0001C2.47662 2.00311 2.31373 2.07227 2.19299 2.19301C2.07226 2.31375 2.0031 2.47663 2.00009 2.64735C1.99708 2.81807 2.06045 2.9833 2.17685 3.10821L9.75068 10.682H3.8814C3.70663 10.682 3.53901 10.7515 3.41543 10.8751C3.29185 10.9986 3.22242 11.1663 3.22242 11.341C3.22242 11.5158 3.29185 11.6834 3.41543 11.807C3.53901 11.9306 3.70663 12 3.8814 12H11.3849C11.4725 11.9995 11.5592 11.9816 11.6397 11.9473C11.7439 11.8934 11.832 11.8131 11.8952 11.7144C11.9584 11.6157 11.9946 11.5021 12 11.385V3.88141Z"
                fill="currentColor"
            />
        </svg>
    `
})
export class ArrowDownRightIcon extends BaseIcon {}

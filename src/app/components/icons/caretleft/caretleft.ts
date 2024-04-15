import { Component } from '@angular/core';
import { BaseIcon } from '@alamote/primeng/baseicon';

@Component({
    selector: 'CaretLeftIcon',
    standalone: true,
    imports: [BaseIcon],
    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M10.5553 13C10.411 13.0006 10.2704 12.9538 10.1554 12.8667L3.04473 7.53369C2.96193 7.4716 2.89474 7.39108 2.84845 7.29852C2.80217 7.20595 2.77808 7.10388 2.77808 7.00039C2.77808 6.8969 2.80217 6.79484 2.84845 6.70227C2.89474 6.60971 2.96193 6.52919 3.04473 6.4671L10.1554 1.13412C10.2549 1.05916 10.3734 1.0136 10.4976 1.0026C10.6217 0.991605 10.7464 1.01561 10.8575 1.0719C10.9668 1.12856 11.0584 1.21398 11.1226 1.31893C11.1869 1.42388 11.2212 1.54438 11.222 1.66742V12.3334C11.2212 12.4564 11.1869 12.5769 11.1226 12.6819C11.0584 12.7868 10.9668 12.8722 10.8575 12.9289C10.7629 12.9735 10.6599 12.9977 10.5553 13ZM4.55574 7.00039L9.88871 11.0001V3.00066L4.55574 7.00039Z"
                fill="currentColor"
            />
        </svg>
    `
})
export class CaretLeftIcon extends BaseIcon {}

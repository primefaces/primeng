import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';

@Component({
    selector: 'CaretRightIcon',
    standalone: true,
    imports: [BaseIcon],
    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <path
                d="M3.44433 13C3.34244 12.9987 3.24216 12.9744 3.15099 12.9289C3.03947 12.8742 2.94542 12.7895 2.87945 12.6843C2.81349 12.5791 2.77823 12.4575 2.77765 12.3333V1.66633C2.77823 1.54214 2.81349 1.42057 2.87945 1.31534C2.94542 1.21011 3.03947 1.1254 3.15099 1.07076C3.26082 1.01524 3.38401 0.991634 3.50658 1.00263C3.62914 1.01363 3.74617 1.05879 3.84435 1.13298L10.9557 6.46647C11.0385 6.52857 11.1057 6.6091 11.152 6.70167C11.1982 6.79424 11.2223 6.89632 11.2223 6.99982C11.2223 7.10332 11.1982 7.2054 11.152 7.29797C11.1057 7.39054 11.0385 7.47107 10.9557 7.53317L3.84435 12.8667C3.72925 12.9538 3.58869 13.0006 3.44433 13ZM4.11102 2.9997V10.9999L9.44451 6.99982L4.11102 2.9997Z"
                fill="currentColor"
            />
        </svg>
    `
})
export class CaretRightIcon extends BaseIcon {}

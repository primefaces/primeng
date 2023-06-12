import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';
import { UniqueComponentId } from '../../utils/uniquecomponentid';

@Component({
    selector: 'ArrowLeftIcon',
    standalone: true,
    imports: [BaseIcon],
    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role" [class]="getClassNames()">
            <g [attr.clip-path]="pathId">
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.83743 13.0373C5.91964 13.0714 6.00783 13.0887 6.09683 13.0883C6.18584 13.0887 6.27403 13.0714 6.35623 13.0373C6.43844 13.0031 6.513 12.9529 6.57554 12.8896C6.7024 12.7626 6.77366 12.5904 6.77366 12.4109C6.77366 12.2314 6.7024 12.0592 6.57554 11.9322L2.31232 7.66896H13.3226C13.5022 7.66896 13.6745 7.59759 13.8016 7.47055C13.9286 7.34351 14 7.17121 14 6.99154C14 6.81188 13.9286 6.63958 13.8016 6.51254C13.6745 6.3855 13.5022 6.31413 13.3226 6.31413H2.31232L6.57554 2.0509C6.6952 1.92248 6.76035 1.75263 6.75725 1.57714C6.75415 1.40164 6.68306 1.23419 6.55894 1.11008C6.43483 0.985963 6.26738 0.914869 6.09189 0.911772C5.91639 0.908676 5.74654 0.973819 5.61812 1.09348L0.216461 6.49514C0.210349 6.50082 0.204331 6.50662 0.198411 6.51254C0.0713707 6.63958 0 6.81188 0 6.99154C0 7.17121 0.0713707 7.34351 0.198411 7.47055C0.20434 7.47648 0.210366 7.48229 0.216488 7.48797L5.61812 12.8896C5.68067 12.9529 5.75523 13.0031 5.83743 13.0373Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath [id]="pathId">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>
    `
})
export class ArrowLeftIcon extends BaseIcon {
    pathId: string;

    ngOnInit() {
        this.pathId = 'url(#' + UniqueComponentId() + ')';
    }
}

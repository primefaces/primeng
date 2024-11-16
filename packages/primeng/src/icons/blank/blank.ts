import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/icons/baseicon';

@Component({
    selector: 'BlankIcon',
    standalone: true,
    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="1" fill="currentColor" fill-opacity="0" />
        </svg>
    `
})
export class BlankIcon extends BaseIcon {}

import { Component } from '@angular/core';
import { BaseIcon } from 'primeng/baseicon';

@Component({
    selector: 'BlankIcon',
    standalone: true,
    imports: [BaseIcon],
    template: `
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" v-bind="pti()">
            <rect width="1" height="1" fill="currentColor" fill-opacity="0" />
        </svg>
    `
})
export class BlankIcon extends BaseIcon {}

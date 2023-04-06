import { Component } from '@angular/core';
import { BaseIcon } from '../../baseicon/baseicon';

@Component({
    selector: 'AngleDoubleUpIcon',
    standalone: true,
    imports: [BaseIcon],
    template: ` <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" [attr.aria-label]="ariaLabel" [attr.aria-hidden]="ariaHidden" [attr.role]="role"></svg> `
})
export class AngleDoubleUpIcon extends BaseIcon {}

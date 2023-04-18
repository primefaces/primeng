import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, HostBinding } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Component({
    template: ` <ng-content></ng-content> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BaseIcon {
    @HostBinding('class') get hostClass() {
        return this.getClassNames();
    }

    @Input() label: string;

    @Input() spin: boolean = false;

    @Input() styleClass: string;

    role: string;

    ariaLabel: string;

    ariaHidden: boolean;

    ngOnInit() {
        this.getAttributes();
    }

    getAttributes() {
        const isLabelEmpty = ObjectUtils.isEmpty(this.label);
        this.role = !isLabelEmpty ? 'img' : undefined;
        this.ariaLabel = !isLabelEmpty ? this.label : undefined;
        this.ariaHidden = isLabelEmpty;
    }

    getClassNames() {
        return `p-icon ${this.styleClass ? this.styleClass + ' ' : ''}${this.spin ? 'p-icon-spin' : ''}`;
    }
}

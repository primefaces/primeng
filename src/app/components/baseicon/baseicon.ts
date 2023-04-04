import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Component({
    template: ` <ng-content></ng-content> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element',
        '[class.p-icon]': 'true',
        '[class.p-icon-spin]': 'spin'
    }
})
export class BaseIcon {
    @Input() label: string;

    @Input() spin: boolean = false;

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
}

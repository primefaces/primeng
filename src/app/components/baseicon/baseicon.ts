import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';

@Component({
    template: ` <ng-content></ng-content> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./baseicon.css'],
    host: {
        class: 'p-element'
    }
})
export class BaseIcon {
    @Input() label: string;

    @Input() spin: boolean = false;

    pti() {
        const isLabelEmpty = ObjectUtils.isEmpty(this.label);

        return {
            class: [
                'p-icon',
                {
                    'p-icon-spin': this.spin
                }
            ],
            role: !isLabelEmpty ? 'img' : undefined,
            'aria-label': !isLabelEmpty ? this.label : undefined,
            'aria-hidden': isLabelEmpty
        };
    }
}

import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, HostBinding, booleanAttribute, inject } from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { BaseComponent } from 'primeng/basecomponent';

@Component({
    template: ` <ng-content></ng-content> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-component p-icon-wrapper'
    }
})
export class BaseIcon extends BaseComponent {
    @Input() label: string;

    @Input({ transform: booleanAttribute }) spin: boolean = false;

    @Input() styleClass: string;

    role: string;

    ariaLabel: string;

    ariaHidden: boolean;

    ngOnInit() {
        super.ngOnInit();
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

import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ElementRef,
    HostBinding,
    booleanAttribute,
    Inject
} from '@angular/core';
import { ObjectUtils } from 'primeng/utils';
import { DOCUMENT } from '@angular/common';

@Component({
    template: ` <ng-content></ng-content> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element p-icon-wrapper'
    }
})
export class BaseIcon {
    @Input() label: string;

    @Input({ transform: booleanAttribute }) spin: boolean = false;

    @Input() styleClass: string;

    role: string;

    ariaLabel: string;

    ariaHidden: boolean;

    constructor(
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
    }

    ngOnInit() {
        this.getAttributes();
    }

    public get isRTL(): boolean {
        return this.document.documentElement.dir === 'rtl';
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

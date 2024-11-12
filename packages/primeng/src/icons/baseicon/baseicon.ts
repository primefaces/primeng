import { booleanAttribute, ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { isEmpty } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { BaseIconStyle } from './style/baseiconstyle';

@Component({
    template: ` <ng-content></ng-content> `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [BaseIconStyle],
    host: {
        class: 'p-component p-iconwrapper'
    }
})
export class BaseIcon extends BaseComponent implements OnInit {
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
        const isLabelEmpty = isEmpty(this.label);
        this.role = !isLabelEmpty ? 'img' : undefined;
        this.ariaLabel = !isLabelEmpty ? this.label : undefined;
        this.ariaHidden = isLabelEmpty;
    }

    getClassNames() {
        return `p-icon ${this.styleClass ? this.styleClass + ' ' : ''}${this.spin ? 'p-icon-spin' : ''}`;
    }
}

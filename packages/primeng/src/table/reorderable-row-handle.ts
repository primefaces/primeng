import { Directive, ElementRef, inject } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TableStyle } from './style/tablestyle';

@Directive({
    selector: '[pReorderableRowHandle]',
    standalone: true,
    host: {
        '[class]': "cx('reorderableRowHandle')"
    },
    providers: [TableStyle],
    hostDirectives: [Bind]
})
export class ReorderableRowHandle extends BaseComponent {
    hostName = 'Table';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('reorderableRowHandle'));
    }

    _componentStyle = inject(TableStyle);

    constructor(public el: ElementRef) {
        super();
    }

    onAfterViewInit() {
        // DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderable-row-handle');
    }
}

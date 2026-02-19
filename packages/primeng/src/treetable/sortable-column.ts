import { booleanAttribute, Directive, HostListener, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { clearSelection } from '@primeuix/utils';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Directive({
    selector: '[ttSortableColumn]',
    standalone: true,
    host: {
        '[class]': 'cx("sortableColumn")',
        '[tabindex]': 'hostTabindex',
        role: 'columnheader',
        '[attr.aria-sort]': 'ariaSorted'
    },
    providers: [TreeTableStyle],
    hostDirectives: [Bind]
})
export class TTSortableColumn extends BaseComponent {
    hostName = 'TreeTable ';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('sortableColumn', { context: { sorted: this.sorted() } }));
    }

    field = input<string>(undefined, { alias: 'ttSortableColumn' });

    ttSortableColumnDisabled = input(undefined, { transform: booleanAttribute });

    sorted = signal<boolean | undefined>(undefined);

    _componentStyle = inject(TreeTableStyle);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    get hostTabindex() {
        return this.isEnabled() ? '0' : null;
    }

    get ariaSorted() {
        if (this.sorted() && this.tt._sortOrder < 0) return 'descending';
        else if (this.sorted() && this.tt._sortOrder > 0) return 'ascending';
        else return 'none';
    }

    constructor() {
        super();
        this.tt.tableService.sortSource$.pipe(takeUntilDestroyed()).subscribe(() => {
            this.updateSortState();
        });
    }

    onInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }

    updateSortState() {
        this.sorted.set(this.tt.isSorted(<string>this.field()) as boolean);
    }

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (this.isEnabled()) {
            this.updateSortState();
            this.tt.sort({
                originalEvent: event,
                field: this.field()
            });

            clearSelection();
        }
    }

    @HostListener('keydown.enter', ['$event'])
    onEnterKey(event: MouseEvent) {
        this.onClick(event);
    }

    isEnabled() {
        return this.ttSortableColumnDisabled() !== true;
    }
}

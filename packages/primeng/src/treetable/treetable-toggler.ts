import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { ChevronDown as ChevronDownIcon } from '@primeicons/angular/chevron-down';
import { ChevronRight as ChevronRightIcon } from '@primeicons/angular/chevron-right';
import { Ripple } from 'primeng/ripple';
import { TreeTableStyle } from './style/treetablestyle';
import { TREETABLE_INSTANCE } from './treetable-service';
import type { TreeTable } from './treetable';

@Component({
    selector: 'p-treetabletoggler, p-treetable-toggler',
    standalone: true,
    imports: [NgTemplateOutlet, Bind, Ripple, ChevronDownIcon, ChevronRightIcon],
    template: `
        <button
            type="button"
            [class]="cx('toggler')"
            [pBind]="ptm('rowToggleButton')"
            (click)="onClick($event)"
            tabindex="-1"
            pRipple
            [style.visibility]="togglerVisibility"
            [style.marginInlineStart]="togglerMarginStart"
            [attr.data-pc-group-section]="'rowactionbutton'"
            [attr.aria-label]="toggleButtonAriaLabel"
        >
            @if (!tt.togglerIconTemplate()) {
                @if (rowNode().node.expanded) {
                    <svg data-p-icon="chevron-down" [pBind]="ptm('nodetoggleicon')" [attr.aria-hidden]="true" />
                }
                @if (!rowNode().node.expanded) {
                    <svg data-p-icon="chevron-right" [pBind]="ptm('nodetoggleicon')" [attr.aria-hidden]="true" />
                }
            }
            <ng-template *ngTemplateOutlet="tt.togglerIconTemplate(); context: togglerIconContext"></ng-template>
        </button>
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [TreeTableStyle],
    hostDirectives: [Bind]
})
export class TreeTableToggler extends BaseComponent {
    hostName = 'TreeTable';

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('toggler'));
    }

    rowNode = input<any>();

    _componentStyle = inject(TreeTableStyle);

    tt = inject<TreeTable>(TREETABLE_INSTANCE);

    get togglerIconContext() {
        return { $implicit: this.rowNode()?.node?.expanded };
    }

    get togglerVisibility() {
        const node = this.rowNode()?.node;
        return node?.leaf === false || (node?.children && node.children.length) ? 'visible' : 'hidden';
    }

    get togglerMarginStart() {
        return this.rowNode()?.level * 16 + 'px';
    }

    get toggleButtonAriaLabel() {
        return this.config.translation ? (this.rowNode()?.expanded ? this.config.translation?.aria?.collapseRow : this.config.translation?.aria?.expandRow) : undefined;
    }

    onClick(event: Event) {
        this.rowNode().node.expanded = !this.rowNode().node.expanded;

        if (this.rowNode().node.expanded) {
            this.tt.onNodeExpand.emit({
                originalEvent: event,
                node: this.rowNode().node
            });
        } else {
            this.tt.onNodeCollapse.emit({
                originalEvent: event,
                node: this.rowNode().node
            });
        }

        this.tt.updateSerializedValue();
        this.tt.tableService.onUIUpdate(this.tt.value);

        event.preventDefault();
    }
}

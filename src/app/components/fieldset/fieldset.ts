import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, QueryList, ContentChildren, TemplateRef } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule, PrimeTemplate } from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { PlusIcon } from 'primeng/icons/plus';
import { MinusIcon } from 'primeng/icons/minus';
import { FieldsetAfterToggleEvent, FieldsetBeforeToggleEvent } from './fieldset.interface';
import { Nullable } from 'primeng/ts-helpers';

let idx: number = 0;

@Component({
    selector: 'p-fieldset',
    template: `
        <fieldset [attr.id]="id" [ngClass]="{ 'p-fieldset p-component': true, 'p-fieldset-toggleable': toggleable, 'p-fieldset-expanded': !collapsed && toggleable }" [ngStyle]="style" [class]="styleClass">
            <legend class="p-fieldset-legend">
                <ng-container *ngIf="toggleable; else legendContent">
                    <a tabindex="0" (click)="toggle($event)" (keydown.enter)="toggle($event)" [attr.aria-controls]="id + '-content'" [attr.aria-expanded]="!collapsed" pRipple>
                        <ng-container *ngIf="collapsed">
                            <PlusIcon [styleClass]="'p-fieldset-toggler'" *ngIf="!expandIconTemplate" />
                            <span *ngIf="expandIconTemplate" class="p-fieldset-toggler">
                                <ng-container *ngTemplateOutlet="expandIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngIf="!collapsed">
                            <MinusIcon [styleClass]="'p-fieldset-toggler'" *ngIf="!collapseIconTemplate" />
                            <span *ngIf="collapseIconTemplate" class="p-fieldset-toggler">
                                <ng-container *ngTemplateOutlet="collapseIconTemplate"></ng-container>
                            </span>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </a>
                </ng-container>
                <ng-template #legendContent>
                    <span class="p-fieldset-legend-text">{{ legend }}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                </ng-template>
            </legend>
            <div
                [attr.id]="id + '-content'"
                class="p-toggleable-content"
                [@fieldsetContent]="collapsed ? { value: 'hidden', params: { transitionParams: transitionOptions, height: '0' } } : { value: 'visible', params: { transitionParams: animating ? transitionOptions : '0ms', height: '*' } }"
                [attr.aria-labelledby]="id"
                [attr.aria-hidden]="collapsed"
                (@fieldsetContent.done)="onToggleDone()"
                role="region"
            >
                <div class="p-fieldset-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
        </fieldset>
    `,
    animations: [
        trigger('fieldsetContent', [
            state(
                'hidden',
                style({
                    height: '0'
                })
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./fieldset.css'],
    host: {
        class: 'p-element'
    }
})
export class Fieldset implements AfterContentInit, BlockableUI {
    /**
     * Header text of the fieldset.
     * @group Props
     */
    @Input() legend: string | undefined;
    /**
     * When specified, content can toggled by clicking the legend.
     * @group Props
     * @defaultValue false
     */
    @Input() toggleable: boolean | undefined;
    /**
     * Defines the default visibility state of the content.
     * * @group Props
     */
    @Input() collapsed: boolean | undefined = false;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Transition options of the panel animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Emits when the collapsed state changes.
     * @param {boolean} value - New value.
     * @group Emits
     */
    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Callback to invoke before panel toggle.
     * @param {PanelBeforeToggleEvent} event - Custom toggle event
     * @group Emits
     */
    @Output() onBeforeToggle: EventEmitter<FieldsetBeforeToggleEvent> = new EventEmitter<FieldsetBeforeToggleEvent>();
    /**
     * Callback to invoke after panel toggle.
     * @param {PanelAfterToggleEvent} event - Custom toggle event
     * @group Emits
     */
    @Output() onAfterToggle: EventEmitter<FieldsetAfterToggleEvent> = new EventEmitter<FieldsetAfterToggleEvent>();

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    public animating: Nullable<boolean>;

    headerTemplate: Nullable<TemplateRef<any>>;

    contentTemplate: Nullable<TemplateRef<any>>;

    collapseIconTemplate: Nullable<TemplateRef<any>>;

    expandIconTemplate: Nullable<TemplateRef<any>>;

    constructor(private el: ElementRef) {}

    id: string = `p-fieldset-${idx++}`;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'expandicon':
                    this.expandIconTemplate = item.template;
                    break;

                case 'collapseicon':
                    this.collapseIconTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    toggle(event: MouseEvent) {
        if (this.animating) {
            return false;
        }

        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.collapsed) this.expand();
        else this.collapse();

        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        event.preventDefault();
    }

    expand() {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }

    collapse() {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    onToggleDone() {
        this.animating = false;
    }
}

@NgModule({
    imports: [CommonModule, RippleModule, MinusIcon, PlusIcon],
    exports: [Fieldset, SharedModule],
    declarations: [Fieldset]
})
export class FieldsetModule {}

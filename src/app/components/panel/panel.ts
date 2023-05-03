/**
 *
 * Panel is a container with the optional content toggle feature.
 *
 * [Live Demo](https://www.primeng.org/panel/)
 *
 * @module panel
 *
 */
import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ContentChild, ChangeDetectionStrategy, ViewEncapsulation, ContentChildren, QueryList, TemplateRef, AfterContentInit, ViewContainerRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Footer, PrimeTemplate } from 'primeng/api';
import { BlockableUI } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MinusIcon } from 'primeng/icons/minus';
import { PlusIcon } from 'primeng/icons/plus';

let idx: number = 0;

export interface PanelToggleEvent {
    originalEvent: Event,
    collapsed: boolean
}

@Component({
    selector: 'p-panel',
    template: `
        <div [attr.id]="id" [ngClass]="{ 'p-panel p-component': true, 'p-panel-toggleable': toggleable, 'p-panel-expanded': !collapsed && toggleable }" [ngStyle]="style" [class]="styleClass">
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{ header }}</span>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div role="tablist" class="p-panel-icons" [ngClass]="{ 'p-panel-icons-start': iconPos === 'start', 'p-panel-icons-end': iconPos === 'end', 'p-panel-icons-center': iconPos === 'center' }">
                    <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
                    <button
                        *ngIf="toggleable"
                        type="button"
                        [attr.aria-label]="'collapse button'"
                        [attr.id]="id + '-label'"
                        class="p-panel-header-icon p-panel-toggler p-link"
                        pRipple
                        (click)="onIconClick($event)"
                        (keydown.enter)="onIconClick($event)"
                        [attr.aria-controls]="id + '-content'"
                        role="tab"
                        [attr.aria-expanded]="!collapsed"
                    >
                        <ng-container *ngIf="!headerIconTemplate">
                            <ng-container *ngIf="collapsed">
                                <span *ngIf="expandIcon" [class]="expandIcon" [ngClass]="iconClass"></span>
                                <PlusIcon *ngIf="!expandIcon" [styleClass]="iconClass"/>
                            </ng-container>

                            <ng-container *ngIf="!collapsed">
                                <span *ngIf="collapseIcon" [class]="collapseIcon" [ngClass]="iconClass"></span>
                                <MinusIcon *ngIf="!collapseIcon" [styleClass]="iconClass"/>
                            </ng-container>
                        </ng-container>

                        <ng-template *ngTemplateOutlet="headerIconTemplate; context: { $implicit: collapsed }"></ng-template>
                    </button>
                </div>
            </div>
            <div
                [attr.id]="id + '-content'"
                class="p-toggleable-content"
                [@panelContent]="
                    collapsed
                        ? { value: 'hidden', params: { transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity: '0' } }
                        : { value: 'visible', params: { transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1' } }
                "
                (@panelContent.done)="onToggleDone($event)"
                role="region"
                [attr.aria-hidden]="collapsed"
                [attr.aria-labelledby]="id + '-titlebar'"
            >
                <div class="p-panel-content">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>

                <div class="p-panel-footer" *ngIf="footerFacet || footerTemplate">
                    <ng-content select="p-footer"></ng-content>
                    <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('panelContent', [
            state(
                'hidden',
                style({
                    height: '0'
                })
            ),
            state(
                'void',
                style({
                    height: '{{height}}'
                }),
                { params: { height: '0' } }
            ),
            state(
                'visible',
                style({
                    height: '*'
                })
            ),
            transition('visible <=> hidden', [animate('{{transitionParams}}')]),
            transition('void => hidden', animate('{{transitionParams}}')),
            transition('void => visible', animate('{{transitionParams}}'))
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.css'],
    host: {
        class: 'p-element'
    }
})
export class Panel implements AfterContentInit, BlockableUI {
    /**
     * Defines if content of panel can be expanded and collapsed.
     */
    @Input() toggleable: boolean = false;
    /**
     * Header text of the panel.
     */
    @Input() header: string;
    /**
     * Defines the initial state of panel content, supports one or two-way binding as well.
     */
    @Input() collapsed: boolean = false;
    /**
     * Inline style of the component.
     */
    @Input() style: object;
    /**
     * Style class of the component.
     */
    @Input() styleClass: string;
    /**
     * Position of the icons.
     */
    @Input() iconPos: 'start' | 'end' | 'center' = 'end';
    /**
     * Expand icon of the toggle button.
     */
    @Input() expandIcon: string;
    /**
     * Collapse icon of the toggle button.
     */
    @Input() collapseIcon: string;
    /**
     * Specifies if header of panel cannot be displayed.
     */
    @Input() showHeader: boolean = true;
    /**
     * Specifies the toggler element to toggle the panel content.
     */
    @Input() toggler: 'icon' | 'header' = 'icon';
    /**
     * Emits when the collapsed state changes.
     * @param boolean value - New value.
     */
    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Emits before content toggle.
     * @param PanelToggleEvent event
     */
    @Output() onBeforeToggle: EventEmitter<PanelToggleEvent> = new EventEmitter<PanelToggleEvent>();
    /**
     * Emits after content toggle.
     * @param PanelToggleEvent event
     */
    @Output() onAfterToggle: EventEmitter<PanelToggleEvent> = new EventEmitter<PanelToggleEvent>();
    /**
     * Transition options of the animation.
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChild(Footer) footerFacet: TemplateRef<any>;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate>;
    /**
     * Icon template of the header.
     * @alias icons
     * @type {TemplateRef<any>}
     * @group Templates
     */
    public iconTemplate: TemplateRef<any>;

    animating: boolean;
    /**
     * @alias header
     * @type {TemplateRef<any>}
     * @group Templates
     */
    headerTemplate: TemplateRef<any>;
    /**
     * @alias content
     * @type {TemplateRef<any>}
     * @group Templates
     */
    contentTemplate: TemplateRef<any>;
    /**
     * @alias footer
     * @type {TemplateRef<any>}
     * @group Templates
     */
    footerTemplate: TemplateRef<any>;
    /**
     * Custom toggler icon template of panel.
     * @alias headericons
     * @type {TemplateRef<any>}
     * @group Templates
     */
    headerIconTemplate: TemplateRef<any>;

    id: string = `p-panel-${idx++}`;

    constructor(private el: ElementRef) {}

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;

                case 'content':
                    this.contentTemplate = item.template;
                    break;

                case 'footer':
                    this.footerTemplate = item.template;
                    break;

                case 'icons':
                    this.iconTemplate = item.template;
                    break;

                case 'headericons':
                    this.headerIconTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    onHeaderClick(event: MouseEvent): void {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }

    onIconClick(event: MouseEvent): void {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }

    toggle(event: MouseEvent): void | boolean{
        if (this.animating) {
            return false;
        }

        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.toggleable) {
            if (this.collapsed) this.expand();
            else this.collapse();
        }

        event.preventDefault();
    }

    expand(): void {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }

    collapse(): void {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }

    onToggleDone(event: Event): void {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }
}
/**
 * **PrimeNG - Panel**
 *
 * _Panel functionality is integrated within various PrimeReact components._
 *
 * [Live Demo](https://www.primeng.org/panel/)
 * --- ---
 * ![PrimeNG](https://primefaces.org/cdn/primeng/images/logo-100.png)
 *
 * @group Component
 */
@NgModule({
    imports: [CommonModule, SharedModule, RippleModule, PlusIcon, MinusIcon],
    exports: [Panel, SharedModule],
    declarations: [Panel]
})
export class PanelModule {}

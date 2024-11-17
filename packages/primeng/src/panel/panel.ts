import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, EventEmitter, inject, Input, NgModule, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { uuid } from '@primeuix/utils';
import { BlockableUI, Footer, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ButtonModule } from 'primeng/button';
import { MinusIcon, PlusIcon } from 'primeng/icons';
import { Ripple } from 'primeng/ripple';
import { Nullable } from 'primeng/ts-helpers';
import { PanelStyle } from './style/panelstyle';

/**
 * Custom panel toggle event, emits before panel toggle.
 * @see {@link onBeforeToggle}
 * @group Interface
 */
export interface PanelBeforeToggleEvent {
    /**
     * Browser event.
     */
    originalEvent: Event;
    /**
     * Collapsed state of the panel.
     */
    collapsed: boolean | undefined;
}

/**
 * Custom panel toggle event, emits after panel toggle.
 * @see {@link onAfterToggle}
 * @extends {PanelBeforeToggleEvent}
 * @group Interface
 */
export interface PanelAfterToggleEvent extends PanelBeforeToggleEvent {}

/**
 * Toggle icon template context.
 * @param {boolean} $implicit - Collapsed state as a boolean, implicit value.
 * @group Interface
 */
export interface PanelHeaderIconsTemplateContext {
    /**
     * Collapsed state as a boolean, implicit value.
     */
    $implicit: boolean;
}

/**
 * Panel is a container with the optional content toggle feature.
 * @group Components
 */
@Component({
    selector: 'p-panel',
    standalone: true,
    imports: [CommonModule, Ripple, PlusIcon, MinusIcon, ButtonModule, SharedModule],
    template: `
        <div
            [attr.id]="id"
            [attr.data-pc-name]="'panel'"
            [ngClass]="{
                'p-panel p-component': true,
                'p-panel-toggleable': toggleable,
                'p-panel-expanded': !collapsed && toggleable
            }"
            [ngStyle]="style"
            [class]="styleClass"
        >
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{ header }}</span>
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
                <div
                    class="p-panel-icons"
                    [ngClass]="{
                        'p-panel-icons-start': iconPos === 'start',
                        'p-panel-icons-end': iconPos === 'end',
                        'p-panel-icons-center': iconPos === 'center'
                    }"
                >
                    <ng-template *ngTemplateOutlet="iconTemplate"></ng-template>
                    <p-button
                        *ngIf="toggleable"
                        [attr.id]="id + '_header'"
                        severity="secondary"
                        [text]="true"
                        [rounded]="true"
                        type="button"
                        role="button"
                        styleClass="p-panel-header-icon p-panel-toggler p-link"
                        [attr.aria-label]="buttonAriaLabel"
                        [attr.aria-controls]="id + '_content'"
                        [attr.aria-expanded]="!collapsed"
                        (click)="onIconClick($event)"
                        (keydown)="onKeyDown($event)"
                        [buttonProps]="toggleButtonProps"
                    >
                        <ng-container *ngIf="!headerIconsTemplate && !toggleButtonProps?.icon">
                            <ng-container *ngIf="!collapsed">
                                <span *ngIf="expandIcon" [class]="expandIcon"></span>
                                <MinusIcon *ngIf="!expandIcon" />
                            </ng-container>

                            <ng-container *ngIf="collapsed">
                                <span *ngIf="collapseIcon" [class]="collapseIcon"></span>
                                <PlusIcon *ngIf="!collapseIcon" />
                            </ng-container>
                        </ng-container>

                        <ng-template *ngTemplateOutlet="headerIconsTemplate; context: { $implicit: collapsed }"></ng-template>
                    </p-button>
                </div>
            </div>
            <div
                class="p-panel-content-container"
                [id]="id + '_content'"
                role="region"
                [attr.aria-labelledby]="id + '_header'"
                [attr.aria-hidden]="collapsed"
                [attr.tabindex]="collapsed ? '-1' : undefined"
                [@panelContent]="
                    collapsed
                        ? {
                              value: 'hidden',
                              params: {
                                  transitionParams: animating ? transitionOptions : '0ms',
                                  height: '0',
                                  opacity: '0'
                              }
                          }
                        : {
                              value: 'visible',
                              params: {
                                  transitionParams: animating ? transitionOptions : '0ms',
                                  height: '*',
                                  opacity: '1'
                              }
                          }
                "
                (@panelContent.done)="onToggleDone($event)"
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
    providers: [PanelStyle]
})
export class Panel extends BaseComponent implements BlockableUI {
    /**
     * Defines if content of panel can be expanded and collapsed.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) toggleable: boolean | undefined;
    /**
     * Header text of the panel.
     * @group Props
     */
    @Input() header: string | undefined;
    /**
     * Defines the initial state of panel content, supports one or two-way binding as well.
     * @group Props
     */
    @Input({ transform: booleanAttribute }) collapsed: boolean | undefined;
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
     * Position of the icons.
     * @group Props
     */
    @Input() iconPos: 'start' | 'end' | 'center' = 'end';
    /**
     * Expand icon of the toggle button.
     * @group Props
     * @deprecated since v15.4.2, use `headericons` template instead.
     */
    @Input() expandIcon: string | undefined;
    /**
     * Collapse icon of the toggle button.
     * @group Props
     * @deprecated since v15.4.2, use `headericons` template instead.
     */
    @Input() collapseIcon: string | undefined;
    /**
     * Specifies if header of panel cannot be displayed.
     * @group Props
     * @deprecated since v15.4.2, use `headericons` template instead.
     */
    @Input({ transform: booleanAttribute }) showHeader: boolean = true;
    /**
     * Specifies the toggler element to toggle the panel content.
     * @group Props
     */
    @Input() toggler: 'icon' | 'header' = 'icon';
    /**
     * Transition options of the animation.
     * @group Props
     */
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() toggleButtonProps: any;
    /**
     * Emitted when the collapsed changes.
     * @param {boolean} value - New Value.
     * @group Emits
     */
    @Output() collapsedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    /**
     * Callback to invoke before panel toggle.
     * @param {PanelBeforeToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    @Output() onBeforeToggle: EventEmitter<PanelBeforeToggleEvent> = new EventEmitter<PanelBeforeToggleEvent>();
    /**
     * Callback to invoke after panel toggle.
     * @param {PanelAfterToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    @Output() onAfterToggle: EventEmitter<PanelAfterToggleEvent> = new EventEmitter<PanelAfterToggleEvent>();

    @ContentChild(Footer) footerFacet: Nullable<TemplateRef<any>>;

    animating: Nullable<boolean>;
    /**
     * Defines template option for header.
     * @group Templates
     */
    @ContentChild('header') headerTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for icon.
     * @example
     * ```html
     * <ng-template #icon> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('icon') iconTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for content.
     * @example
     * ```html
     * <ng-template #content> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('content') contentTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for footer.
     * @example
     * ```html
     * <ng-template #footer> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('footer') footerTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for headerIcon.
     * @type {TemplateRef<PanelHeaderIconsTemplateContext>} context - context of the template.
     * @example
     * ```html
     * <ng-template #headericons let-collapsed> </ng-template>
     * ```
     * @see {@link PanelHeaderIconsTemplateContext}
     * @group Templates
     */
    @ContentChild('headericons') headerIconsTemplate: TemplateRef<PanelHeaderIconsTemplateContext> | undefined;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'icon':
                    this.iconTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'headericons':
                    this.headerIconsTemplate = item.template;
                    break;
            }
        });
    }

    readonly id = uuid('pn_id_');

    get buttonAriaLabel() {
        return this.header;
    }

    _componentStyle = inject(PanelStyle);

    onHeaderClick(event: MouseEvent) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }

    onIconClick(event: MouseEvent) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }

    toggle(event: MouseEvent) {
        if (this.animating) {
            return false;
        }

        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.toggleable) {
            if (this.collapsed) this.expand();
            else this.collapse();
        }

        this.cd.markForCheck();
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

    onKeyDown(event) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.toggle(event);
            event.preventDefault();
        }
    }

    onToggleDone(event: any) {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }
}

@NgModule({
    imports: [Panel, SharedModule],
    exports: [Panel, SharedModule]
})
export class PanelModule {}

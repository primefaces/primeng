import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, inject, InjectionToken, NgModule, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { BlockableUI, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { PARENT_INSTANCE } from 'primeng/basecomponent';
import { ButtonModule } from 'primeng/button';
import { MinusIcon, PlusIcon } from 'primeng/icons';
import { Bind } from 'primeng/pbind';
import { Nullable } from 'primeng/ts-helpers';
import { BasePanel } from './basepanel';
import { PanelStyle } from './style/panelstyle';

const INSTANCE = new InjectionToken<Panel>('INSTANCE');
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
    imports: [CommonModule, PlusIcon, MinusIcon, ButtonModule, SharedModule, Bind],
    template: `
        <div [pBind]="ptm('header')" [class]="cx('header')" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
            <span [pBind]="ptm('title')" [class]="cx('title')" *ngIf="_header" [attr.id]="id + '_header'">{{ _header }}</span>
            <ng-content select="p-header"></ng-content>
            <ng-container *ngTemplateOutlet="headerTemplate || _headerTemplate"></ng-container>
            <div [pBind]="ptm('icons')" [class]="cx('icons')">
                <ng-template *ngTemplateOutlet="iconTemplate || _iconTemplate"></ng-template>
                <p-button
                    *ngIf="toggleable"
                    [attr.id]="id + '_header'"
                    severity="secondary"
                    [text]="true"
                    [rounded]="true"
                    type="button"
                    role="button"
                    [styleClass]="cx('pcToggleButton')"
                    [attr.aria-label]="buttonAriaLabel"
                    [attr.aria-controls]="id + '_content'"
                    [attr.aria-expanded]="!collapsed"
                    (click)="onIconClick($event)"
                    (keydown)="onKeyDown($event)"
                    [buttonProps]="getToggleButtonProps()"
                    [pt]="ptm('pcToggleButton')"
                >
                    <ng-template #icon>
                        <ng-container *ngIf="!headerIconsTemplate && !_headerIconsTemplate && !toggleButtonProps?.icon">
                            <ng-container *ngIf="!collapsed">
                                <svg data-p-icon="minus" [pBind]="ptm('pcToggleButton')['icon']" />
                            </ng-container>

                            <ng-container *ngIf="collapsed">
                                <svg data-p-icon="plus" [pBind]="ptm('pcToggleButton')['icon']" />
                            </ng-container>
                        </ng-container>

                        <ng-template *ngTemplateOutlet="headerIconsTemplate || _headerIconsTemplate; context: { $implicit: collapsed }"></ng-template>
                    </ng-template>
                </p-button>
            </div>
        </div>
        <div
            [pBind]="ptm('contentContainer')"
            [class]="cx('contentContainer')"
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
                              transitionParams: animating() ? transitionOptions : '0ms',
                              height: '0',
                              opacity: '0'
                          }
                      }
                    : {
                          value: 'visible',
                          params: {
                              transitionParams: animating() ? transitionOptions : '0ms',
                              height: '*',
                              opacity: '1'
                          }
                      }
            "
            (@panelContent.done)="onToggleDone($event)"
        >
            <div [pBind]="ptm('content')" [class]="cx('content')" #contentWrapper>
                <ng-content></ng-content>
                <ng-container *ngTemplateOutlet="contentTemplate || _contentTemplate"></ng-container>
            </div>

            <div [pBind]="ptm('footer')" [class]="cx('footer')" *ngIf="footerFacet || footerTemplate || _footerTemplate">
                <ng-content select="p-footer"></ng-content>
                <ng-container *ngTemplateOutlet="footerTemplate || _footerTemplate"></ng-container>
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
    providers: [PanelStyle, { provide: INSTANCE, useExisting: Panel }, { provide: PARENT_INSTANCE, useExisting: Panel }],
    host: {
        '[id]': 'id',
        'data-pc-name': 'panel',
        'data-pc-section': 'root',
        '[class]': "cn(cx('root'), styleClass)",
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Panel extends BasePanel implements AfterContentInit, BlockableUI {
    $pcPanel: Panel | undefined = inject(INSTANCE, { optional: true, skipSelf: true }) ?? undefined;
    // TODO: replace this later. For root=host elements, hostDirective use case
    bindDirectiveInstance = inject(Bind, { self: true });

    ngAfterViewChecked(): void {
        this.bindDirectiveInstance.attrs = this.ptm('root');
    }

    @ContentChild(Footer) footerFacet: Nullable<TemplateRef<any>>;
    /**
     * Defines template option for header.
     * @group Templates
     */
    @ContentChild('header', { descendants: false }) headerTemplate: TemplateRef<any> | undefined;
    /**
     * Defines template option for icon.
     * @example
     * ```html
     * <ng-template #icon> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('icons', { descendants: false }) iconTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for content.
     * @example
     * ```html
     * <ng-template #content> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('content', { descendants: false }) contentTemplate: TemplateRef<any> | undefined;

    /**
     * Defines template option for footer.
     * @example
     * ```html
     * <ng-template #footer> </ng-template>
     * ```
     * @group Templates
     */
    @ContentChild('footer', { descendants: false }) footerTemplate: TemplateRef<any> | undefined;

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
    @ContentChild('headericons', { descendants: false }) headerIconsTemplate: TemplateRef<PanelHeaderIconsTemplateContext> | undefined;

    _headerTemplate: TemplateRef<any> | undefined;

    _iconTemplate: TemplateRef<any> | undefined;

    _contentTemplate: TemplateRef<any> | undefined;

    _footerTemplate: TemplateRef<any> | undefined;

    _headerIconsTemplate: TemplateRef<any> | undefined;

    @ViewChild('contentWrapper') contentWrapperViewChild: ElementRef;

    get buttonAriaLabel() {
        return this._header;
    }

    getToggleButtonProps() {
        return { ...this.toggleButtonProps, ...this.ptm('toggleButton') };
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
        if (this.animating()) {
            return false;
        }

        this.animating.set(true);
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });

        if (this.toggleable) {
            if (this.collapsed) this.expand();
            else this.collapse();
        }

        event.preventDefault();
    }

    expand() {
        this.collapsed = false;
        this.collapsedChange.emit(false);
        this.updateTabIndex();
    }

    collapse() {
        this.collapsed = true;
        this.collapsedChange.emit(true);
        this.updateTabIndex();
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement;
    }

    updateTabIndex() {
        if (this.contentWrapperViewChild) {
            const focusableElements = this.contentWrapperViewChild.nativeElement.querySelectorAll('input, button, select, a, textarea, [tabindex]');
            focusableElements.forEach((element: HTMLElement) => {
                if (this.collapsed) {
                    element.setAttribute('tabindex', '-1');
                } else {
                    element.removeAttribute('tabindex');
                }
            });
        }
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.toggle(event as any);
            event.preventDefault();
        }
    }

    onToggleDone(event: any) {
        this.animating.set(false);
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    }

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    ngAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this._headerTemplate = item.template;
                    break;

                case 'content':
                    this._contentTemplate = item.template;
                    break;

                case 'footer':
                    this._footerTemplate = item.template;
                    break;

                case 'icons':
                    this._iconTemplate = item.template;
                    break;

                case 'headericons':
                    this._headerIconsTemplate = item.template;
                    break;

                default:
                    this._contentTemplate = item.template;
                    break;
            }
        });
    }

    dataP() {
        return this.cn({
            toggleable: this.toggleable
        });
    }
}

@NgModule({
    imports: [Panel, BasePanel, SharedModule, Bind],
    exports: [Panel, BasePanel, SharedModule, Bind]
})
export class PanelModule {}

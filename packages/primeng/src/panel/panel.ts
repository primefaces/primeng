import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, InjectionToken, input, model, NgModule, output, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { uuid } from '@primeuix/utils';
import { BlockableUI, Footer, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ButtonModule } from 'primeng/button';
import { MinusIcon, PlusIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import type { PanelAfterToggleEvent, PanelBeforeToggleEvent, PanelHeaderIconsTemplateContext, PanelIconPos, PanelPassThrough, PanelToggler } from 'primeng/types/panel';
import type { ButtonProps } from 'primeng/types/button';
import { PanelStyle } from './style/panelstyle';

const PANEL_INSTANCE = new InjectionToken<Panel>('PANEL_INSTANCE');

/**
 * Panel is a container with the optional content toggle feature.
 * @group Components
 */
@Component({
    selector: 'p-panel',
    standalone: true,
    imports: [NgTemplateOutlet, PlusIcon, MinusIcon, ButtonModule, SharedModule, BindModule, MotionModule],
    template: `
        @if (showHeader()) {
            <div [pBind]="ptm('header')" [class]="cx('header')" (click)="onHeaderClick($event)" [attr.id]="id() + '-titlebar'" [attr.data-p]="dataP()">
                @if (header()) {
                    <span [pBind]="ptm('title')" [class]="cx('title')" [attr.id]="id() + '_header'">{{ header() }}</span>
                }
                <ng-content select="p-header"></ng-content>
                <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                <div [pBind]="ptm('headerActions')" [class]="cx('headerActions')">
                    <ng-container *ngTemplateOutlet="iconTemplate()"></ng-container>
                    @if (toggleable()) {
                        <p-button
                            [attr.id]="id() + '_header'"
                            severity="secondary"
                            [text]="true"
                            [rounded]="true"
                            type="button"
                            role="button"
                            [styleClass]="cx('pcToggleButton')"
                            [attr.aria-label]="buttonAriaLabel()"
                            [attr.aria-controls]="id() + '_content'"
                            [attr.aria-expanded]="!collapsed()"
                            (click)="onIconClick($event)"
                            (keydown)="onKeyDown($event)"
                            [buttonProps]="toggleButtonProps()"
                            [pt]="ptm('pcToggleButton')"
                            [unstyled]="unstyled()"
                        >
                            <ng-template #icon>
                                @if (!headerIconsTemplate() && !toggleButtonProps()?.icon) {
                                    @if (!collapsed()) {
                                        <svg data-p-icon="minus" [pBind]="ptm('pcToggleButton.icon')" />
                                    } @else {
                                        <svg data-p-icon="plus" [pBind]="ptm('pcToggleButton.icon')" />
                                    }
                                }
                                <ng-container *ngTemplateOutlet="headerIconsTemplate(); context: { $implicit: collapsed() }"></ng-container>
                            </ng-template>
                        </p-button>
                    }
                </div>
            </div>
        }
        <div
            [pBind]="ptm('contentContainer')"
            [pMotion]="isContentVisible()"
            pMotionName="p-collapsible"
            [pMotionOptions]="computedMotionOptions()"
            [class]="cx('contentContainer')"
            [id]="id() + '_content'"
            role="region"
            [attr.aria-labelledby]="id() + '_header'"
            [attr.aria-hidden]="collapsed()"
            [attr.tabindex]="contentTabindex()"
            (pMotionOnAfterEnter)="onToggleDone($event)"
        >
            <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')">
                <div [pBind]="ptm('content')" [class]="cx('content')" #contentWrapper>
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate()"></ng-container>
                </div>
                @if (hasFooter()) {
                    <div [pBind]="ptm('footer')" [class]="cx('footer')">
                        <ng-content select="p-footer"></ng-content>
                        <ng-container *ngTemplateOutlet="footerTemplate()"></ng-container>
                    </div>
                }
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [PanelStyle, { provide: PANEL_INSTANCE, useExisting: Panel }, { provide: PARENT_INSTANCE, useExisting: Panel }],
    host: {
        '[id]': 'id()',
        '[class]': "cx('root')",
        '[attr.data-p]': 'dataP()'
    },
    hostDirectives: [Bind]
})
export class Panel extends BaseComponent<PanelPassThrough> implements BlockableUI {
    componentName = 'Panel';

    $pcPanel: Panel | undefined = inject(PANEL_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    _componentStyle = inject(PanelStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Id of the component.
     */
    id = input<string>(uuid('pn_id_'));

    /**
     * Defines if content of panel can be expanded and collapsed.
     * @group Props
     */
    toggleable = input(false, { transform: booleanAttribute });

    /**
     * Header text of the panel.
     * @group Props
     */
    header = input<string>();

    /**
     * Defines the initial state of panel content, supports one or two-way binding as well.
     * @group Props
     */
    collapsed = model(false);

    /**
     * Position of the icons.
     * @group Props
     */
    iconPos = input<PanelIconPos>('end');

    /**
     * Specifies if header of panel cannot be displayed.
     * @group Props
     */
    showHeader = input(true, { transform: booleanAttribute });

    /**
     * Specifies the toggler element to toggle the panel content.
     * @group Props
     */
    toggler = input<PanelToggler>('icon');

    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    toggleButtonProps = input<ButtonProps>();

    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>();

    /**
     * Callback to invoke before panel toggle.
     * @param {PanelBeforeToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    onBeforeToggle = output<PanelBeforeToggleEvent>();

    /**
     * Callback to invoke after panel toggle.
     * @param {PanelAfterToggleEvent} event - Custom panel toggle event
     * @group Emits
     */
    onAfterToggle = output<PanelAfterToggleEvent>();

    footerFacet = contentChild(Footer);

    /**
     * Defines template option for header.
     * @example
     * ```html
     * <ng-template #header> </ng-template>
     * ```
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Defines template option for icon.
     * @example
     * ```html
     * <ng-template #icons> </ng-template>
     * ```
     * @group Templates
     */
    iconTemplate = contentChild<TemplateRef<void>>('icons', { descendants: false });

    /**
     * Defines template option for content.
     * @example
     * ```html
     * <ng-template #content> </ng-template>
     * ```
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<void>>('content', { descendants: false });

    /**
     * Defines template option for footer.
     * @example
     * ```html
     * <ng-template #footer> </ng-template>
     * ```
     * @group Templates
     */
    footerTemplate = contentChild<TemplateRef<void>>('footer', { descendants: false });

    /**
     * Defines template option for headerIcon.
     * @param {PanelHeaderIconsTemplateContext} context - context of the template.
     * @example
     * ```html
     * <ng-template #headericons let-collapsed> </ng-template>
     * ```
     * @see {@link PanelHeaderIconsTemplateContext}
     * @group Templates
     */
    headerIconsTemplate = contentChild<TemplateRef<PanelHeaderIconsTemplateContext>>('headericons', { descendants: false });

    contentWrapperViewChild = viewChild<ElementRef>('contentWrapper');

    buttonAriaLabel = computed(() => this.header());

    dataP = computed(() => this.cn({ toggleable: this.toggleable() }));

    hasFooter = computed(() => !!(this.footerFacet() || this.footerTemplate()));

    contentTabindex = computed(() => (this.collapsed() ? '-1' : undefined));

    isContentVisible = computed(() => !this.toggleable() || (this.toggleable() && !this.collapsed()));

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    onHeaderClick(event: MouseEvent) {
        if (this.toggler() === 'header') {
            this.toggle(event);
        }
    }

    onIconClick(event: MouseEvent) {
        if (this.toggler() === 'icon') {
            this.toggle(event);
        }
    }

    toggle(event: MouseEvent) {
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed() });

        if (this.collapsed()) this.expand();
        else this.collapse();

        event.preventDefault();
    }

    expand() {
        this.collapsed.set(false);
        this.updateTabIndex();
    }

    collapse() {
        this.collapsed.set(true);
        this.updateTabIndex();
    }

    getBlockableElement(): HTMLElement {
        return this.el.nativeElement;
    }

    updateTabIndex() {
        const contentWrapper = this.contentWrapperViewChild();
        if (contentWrapper) {
            const focusableElements = contentWrapper.nativeElement.querySelectorAll('input, button, select, a, textarea, [tabindex]');
            focusableElements.forEach((element: HTMLElement) => {
                if (this.collapsed()) {
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

    onToggleDone(event: MotionEvent) {
        this.onAfterToggle.emit({ originalEvent: event as any, collapsed: this.collapsed() });
    }
}

@NgModule({
    imports: [Panel, SharedModule, BindModule],
    exports: [Panel, SharedModule, BindModule]
})
export class PanelModule {}

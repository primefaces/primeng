import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, InjectionToken, input, model, NgModule, output, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { uuid } from '@primeuix/utils';
import { BlockableUI, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { MinusIcon, PlusIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import type { FieldsetAfterToggleEvent, FieldsetBeforeToggleEvent, FieldsetPassThrough } from 'primeng/types/fieldset';
import type { CSSProperties } from 'primeng/types/shared';
import { FieldsetStyle } from './style/fieldsetstyle';

const FIELDSET_INSTANCE = new InjectionToken<Fieldset>('FIELDSET_INSTANCE');

/**
 * Fieldset is a grouping component with the optional content toggle feature.
 * @group Components
 */
@Component({
    selector: 'p-fieldset',
    standalone: true,
    imports: [NgTemplateOutlet, MinusIcon, PlusIcon, SharedModule, BindModule, MotionModule],
    template: `
        <fieldset [attr.id]="id" [style]="style()" [class]="cn(cx('root'), styleClass())" [pBind]="ptm('root')" [attr.data-p]="dataP()">
            <legend [class]="cx('legend')" [pBind]="ptm('legend')" [attr.data-p]="dataP()">
                @if (toggleable()) {
                    <button
                        [attr.id]="id + '_header'"
                        tabindex="0"
                        role="button"
                        [attr.aria-controls]="id + '_content'"
                        [attr.aria-expanded]="!collapsed()"
                        [attr.aria-label]="buttonAriaLabel()"
                        (click)="toggle($event)"
                        (keydown)="onKeyDown($event)"
                        [class]="cx('toggleButton')"
                        [pBind]="ptm('toggleButton')"
                    >
                        @if (collapsed()) {
                            @if (!expandIconTemplate()) {
                                <svg data-p-icon="plus" [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')" />
                            } @else {
                                <span [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')">
                                    <ng-container *ngTemplateOutlet="expandIconTemplate()"></ng-container>
                                </span>
                            }
                        } @else {
                            @if (!collapseIconTemplate()) {
                                <svg data-p-icon="minus" [class]="cx('toggleIcon')" [attr.aria-hidden]="true" [pBind]="ptm('toggleIcon')" />
                            } @else {
                                <span [class]="cx('toggleIcon')" [pBind]="ptm('toggleIcon')">
                                    <ng-container *ngTemplateOutlet="collapseIconTemplate()"></ng-container>
                                </span>
                            }
                        }
                        <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                    </button>
                } @else {
                    <ng-container *ngTemplateOutlet="legendContent"></ng-container>
                }
                <ng-template #legendContent>
                    <span [class]="cx('legendLabel')" [pBind]="ptm('legendLabel')">{{ legend() }}</span>
                    <ng-content select="p-header"></ng-content>
                    <ng-container *ngTemplateOutlet="headerTemplate()"></ng-container>
                </ng-template>
            </legend>
            <div
                [pBind]="ptm('contentContainer')"
                [pMotion]="isContentVisible()"
                pMotionName="p-collapsible"
                [pMotionOptions]="computedMotionOptions()"
                [class]="cx('contentContainer')"
                [id]="id + '_content'"
                role="region"
                [attr.aria-labelledby]="id + '_header'"
                [attr.aria-hidden]="collapsed()"
                [attr.tabindex]="contentTabindex()"
                (pMotionOnAfterEnter)="onToggleDone($event)"
                (pMotionOnAfterLeave)="onToggleDone($event)"
            >
                <div [pBind]="ptm('contentWrapper')" [class]="cx('contentWrapper')">
                    <div [class]="cx('content')" [pBind]="ptm('content')" #contentWrapper>
                        <ng-content></ng-content>
                        <ng-container *ngTemplateOutlet="contentTemplate()"></ng-container>
                    </div>
                </div>
            </div>
        </fieldset>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [FieldsetStyle, { provide: FIELDSET_INSTANCE, useExisting: Fieldset }, { provide: PARENT_INSTANCE, useExisting: Fieldset }],
    hostDirectives: [Bind]
})
export class Fieldset extends BaseComponent<FieldsetPassThrough> implements BlockableUI {
    componentName = 'Fieldset';

    $pcFieldset: Fieldset | undefined = inject(FIELDSET_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    _componentStyle = inject(FieldsetStyle);

    bindDirectiveInstance = inject(Bind, { self: true });

    /**
     * Header text of the fieldset.
     * @group Props
     */
    legend = input<string>();

    /**
     * When specified, content can toggled by clicking the legend.
     * @group Props
     * @defaultValue false
     */
    toggleable = input(false, { transform: booleanAttribute });

    /**
     * Defines the initial state of content, supports one or two-way binding as well.
     * @group Props
     */
    collapsed = model(false);

    /**
     * Inline style of the component.
     * @group Props
     */
    style = input<CSSProperties>();

    /**
     * Style class of the component.
     * @group Props
     */
    styleClass = input<string>();

    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions>();

    /**
     * Callback to invoke before panel toggle.
     * @param {FieldsetBeforeToggleEvent} event - Custom toggle event
     * @group Emits
     */
    onBeforeToggle = output<FieldsetBeforeToggleEvent>();

    /**
     * Callback to invoke after panel toggle.
     * @param {FieldsetAfterToggleEvent} event - Custom toggle event
     * @group Emits
     */
    onAfterToggle = output<FieldsetAfterToggleEvent>();

    /**
     * Custom header template.
     * @group Templates
     */
    headerTemplate = contentChild<TemplateRef<void>>('header', { descendants: false });

    /**
     * Custom expand icon template.
     * @group Templates
     */
    expandIconTemplate = contentChild<TemplateRef<void>>('expandicon', { descendants: false });

    /**
     * Custom collapse icon template.
     * @group Templates
     */
    collapseIconTemplate = contentChild<TemplateRef<void>>('collapseicon', { descendants: false });

    /**
     * Custom content template.
     * @group Templates
     */
    contentTemplate = contentChild<TemplateRef<void>>('content', { descendants: false });

    contentWrapperViewChild = viewChild<ElementRef>('contentWrapper');

    private _id: string = uuid('pn_id_');

    get id() {
        return this._id;
    }

    buttonAriaLabel = computed(() => this.legend());

    dataP = computed(() => this.cn({ toggleable: this.toggleable() }));

    contentTabindex = computed(() => (this.collapsed() ? '-1' : undefined));

    isContentVisible = computed(() => !this.toggleable() || (this.toggleable() && !this.collapsed()));

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptm('host'));
    }

    toggle(event: MouseEvent) {
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed() });

        if (this.collapsed()) this.expand();
        else this.collapse();

        event.preventDefault();
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'Space') {
            this.toggle(event as any);
            event.preventDefault();
        }
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
        return this.el.nativeElement.children[0];
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

    onToggleDone(event: MotionEvent) {
        this.onAfterToggle.emit({ originalEvent: event as any, collapsed: this.collapsed() });
    }
}

@NgModule({
    imports: [Fieldset, SharedModule, BindModule],
    exports: [Fieldset, SharedModule, BindModule]
})
export class FieldsetModule {}

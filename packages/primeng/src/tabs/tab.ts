import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, HostListener, inject, input, model, ViewEncapsulation } from '@angular/core';
import { equals, focus, getAttribute } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { Ripple } from 'primeng/ripple';
import { TabList } from './tablist';
import { Tabs } from './tabs';

/**
 * Defines valid properties in Tab component.
 * @group Components
 */
@Component({
    selector: 'p-tab',
    standalone: true,
    imports: [CommonModule, Ripple, SharedModule],
    template: ` <ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-tab]': 'true',
        '[class.p-tab-active]': 'active()',
        '[class.p-component]': 'true',
        '[attr.data-pc-name]': '"tab"',
        '[attr.id]': 'id()',
        '[attr.aria-controls]': 'ariaControls()',
        '[attr.role]': '"tab"',
        '[attr.aria-selected]': 'active()',
        '[attr.data-p-disabled]': 'disabled()',
        '[attr.data-p-active]': 'active()',
        '[attr.tabindex]': 'tabindex()'
    },
    hostDirectives: [Ripple]
})
export class Tab extends BaseComponent {
    /**
     * Value of tab.
     * @defaultValue undefined
     * @group Props
     */
    value = model<number | string | undefined>();
    /**
     * Whether the tab is disabled.
     * @defaultValue false
     * @group Props
     */
    disabled = input(false, { transform: booleanAttribute });

    pcTabs = inject(forwardRef(() => Tabs));

    pcTabList = inject(forwardRef(() => TabList));

    ripple = computed(() => this.config.ripple());

    id = computed(() => `${this.pcTabs.id()}_tab_${this.value()}`);

    ariaControls = computed(() => `${this.pcTabs.id()}_tabpanel_${this.value()}`);

    active = computed(() => equals(this.pcTabs.value(), this.value()));

    tabindex = computed(() => (this.active() ? this.pcTabs.tabindex() : -1));

    @HostListener('focus', ['$event']) onFocus(event: FocusEvent) {
        this.pcTabs.selectOnFocus() && this.changeActiveValue();
    }

    @HostListener('click', ['$event']) onClick(event: MouseEvent) {
        this.changeActiveValue();
    }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        switch (event.code) {
            case 'ArrowRight':
                this.onArrowRightKey(event);
                break;

            case 'ArrowLeft':
                this.onArrowLeftKey(event);
                break;

            case 'Home':
                this.onHomeKey(event);
                break;

            case 'End':
                this.onEndKey(event);
                break;

            case 'PageDown':
                this.onPageDownKey(event);
                break;

            case 'PageUp':
                this.onPageUpKey(event);
                break;

            case 'Enter':
            case 'NumpadEnter':
            case 'Space':
                this.onEnterKey(event);
                break;

            default:
                break;
        }

        event.stopPropagation();
    }

    onArrowRightKey(event) {
        const nextTab = this.findNextTab(event.currentTarget);
        nextTab ? this.changeFocusedTab(event, nextTab) : this.onHomeKey(event);
        event.preventDefault();
    }

    onArrowLeftKey(event) {
        const prevTab = this.findPrevTab(event.currentTarget);

        prevTab ? this.changeFocusedTab(event, prevTab) : this.onEndKey(event);
        event.preventDefault();
    }

    onHomeKey(event) {
        const firstTab = this.findFirstTab();

        this.changeFocusedTab(event, firstTab);
        event.preventDefault();
    }

    onEndKey(event) {
        const lastTab = this.findLastTab();

        this.changeFocusedTab(event, lastTab);
        event.preventDefault();
    }

    onPageDownKey(event) {
        this.scrollInView(this.findLastTab());
        event.preventDefault();
    }

    onPageUpKey(event) {
        this.scrollInView(this.findFirstTab());
        event.preventDefault();
    }

    onEnterKey(event) {
        this.changeActiveValue();
        event.preventDefault();
    }

    findNextTab(tabElement, selfCheck = false) {
        const element = selfCheck ? tabElement : tabElement.nextElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') || getAttribute(element, 'data-pc-section') === 'inkbar' ? this.findNextTab(element) : element) : null;
    }

    findPrevTab(tabElement, selfCheck = false) {
        const element = selfCheck ? tabElement : tabElement.previousElementSibling;

        return element ? (getAttribute(element, 'data-p-disabled') || getAttribute(element, 'data-pc-section') === 'inkbar' ? this.findPrevTab(element) : element) : null;
    }

    findFirstTab() {
        return this.findNextTab(this.pcTabList?.tabs?.nativeElement?.firstElementChild, true);
    }

    findLastTab() {
        return this.findPrevTab(this.pcTabList?.tabs?.nativeElement?.lastElementChild, true);
    }

    changeActiveValue() {
        this.pcTabs.updateValue(this.value());
    }

    changeFocusedTab(event, element) {
        focus(element);
        this.scrollInView(element);
    }

    scrollInView(element) {
        element?.scrollIntoView?.({ block: 'nearest' });
    }
}

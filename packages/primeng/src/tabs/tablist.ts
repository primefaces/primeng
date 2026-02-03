import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChild, effect, ElementRef, forwardRef, inject, InjectionToken, signal, TemplateRef, viewChild, ViewEncapsulation } from '@angular/core';
import { findSingle, getOffset, getOuterWidth, getWidth, isRTL } from '@primeuix/utils';
import { SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind, BindModule } from 'primeng/bind';
import { ChevronLeftIcon, ChevronRightIcon } from 'primeng/icons';
import { RippleModule } from 'primeng/ripple';
import { TabListStyle } from './style/tabliststyle';
import { Tabs } from './tabs';
import { TabListPassThrough } from 'primeng/types/tabs';

const TABLIST_INSTANCE = new InjectionToken<TabList>('TABLIST_INSTANCE');

/**
 * TabList is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tablist',
    standalone: true,
    imports: [NgTemplateOutlet, ChevronLeftIcon, ChevronRightIcon, RippleModule, SharedModule, BindModule],
    template: `
        @if (showNavigators() && isPrevButtonEnabled()) {
            <button
                type="button"
                #prevButton
                pRipple
                [pBind]="ptm('prevButton')"
                [class]="cx('prevButton')"
                [attr.aria-label]="prevButtonAriaLabel"
                [attr.tabindex]="tabindex()"
                [attr.data-pc-group-section]="'navigator'"
                (click)="onPrevButtonClick()"
            >
                @if (prevIconTemplate()) {
                    <ng-container *ngTemplateOutlet="prevIconTemplate()" />
                } @else {
                    <svg data-p-icon="chevron-left" />
                }
            </button>
        }
        <div #content [pBind]="ptm('content')" [class]="cx('content')" (scroll)="onScroll($event)">
            <div #tabs [pBind]="ptm('tabList')" [class]="cx('tabList')" role="tablist">
                <ng-content />
                <span #inkbar [pBind]="ptm('activeBar')" role="presentation" [class]="cx('activeBar')"></span>
            </div>
        </div>
        @if (showNavigators() && isNextButtonEnabled()) {
            <button
                type="button"
                #nextButton
                pRipple
                [pBind]="ptm('nextButton')"
                [class]="cx('nextButton')"
                [attr.aria-label]="nextButtonAriaLabel"
                [attr.tabindex]="tabindex()"
                [attr.data-pc-group-section]="'navigator'"
                (click)="onNextButtonClick()"
            >
                @if (nextIconTemplate()) {
                    <ng-container *ngTemplateOutlet="nextIconTemplate()" />
                } @else {
                    <svg data-p-icon="chevron-right" />
                }
            </button>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class]': 'cx("root")'
    },
    providers: [TabListStyle, { provide: TABLIST_INSTANCE, useExisting: TabList }, { provide: PARENT_INSTANCE, useExisting: TabList }],
    hostDirectives: [Bind]
})
export class TabList extends BaseComponent<TabListPassThrough> {
    componentName = 'TabList';

    $pcTabList: TabList | undefined = inject(TABLIST_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });
    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * A template reference variable that represents the previous icon in a UI component.
     * @type {TemplateRef<any> | undefined}
     * @group Templates
     */
    prevIconTemplate = contentChild<TemplateRef<any>>('previcon');
    /**
     * A template reference variable that represents the next icon in a UI component.
     * @type {TemplateRef<any> | undefined}
     * @group Templates
     */
    nextIconTemplate = contentChild<TemplateRef<any>>('nexticon');

    content = viewChild<ElementRef<HTMLDivElement>>('content');

    prevButton = viewChild<ElementRef<HTMLButtonElement>>('prevButton');

    nextButton = viewChild<ElementRef<HTMLButtonElement>>('nextButton');

    inkbar = viewChild<ElementRef<HTMLSpanElement>>('inkbar');

    tabs = viewChild<ElementRef<HTMLDivElement>>('tabs');

    pcTabs = inject(forwardRef(() => Tabs));

    isPrevButtonEnabled = signal<boolean>(false);

    isNextButtonEnabled = signal<boolean>(false);

    resizeObserver!: ResizeObserver;

    showNavigators = computed(() => this.pcTabs.showNavigators());

    tabindex = computed(() => this.pcTabs.tabindex());

    scrollable = computed(() => this.pcTabs.scrollable());

    _componentStyle = inject(TabListStyle);

    constructor() {
        super();
        effect(() => {
            this.pcTabs.value();
            if (isPlatformBrowser(this.platformId)) {
                setTimeout(() => {
                    this.updateInkBar();
                });
            }
        });
    }

    get prevButtonAriaLabel() {
        return this.config?.translation?.aria?.previous;
    }

    get nextButtonAriaLabel() {
        return this.config?.translation?.aria?.next;
    }

    onAfterViewInit() {
        if (this.showNavigators() && isPlatformBrowser(this.platformId)) {
            this.updateButtonState();
            this.bindResizeObserver();
        }
    }

    onDestroy() {
        this.unbindResizeObserver();
    }

    onScroll(event: Event) {
        this.showNavigators() && this.updateButtonState();

        event.preventDefault();
    }

    onPrevButtonClick() {
        const _content = this.content()?.nativeElement;
        if (!_content) return;
        const width = getWidth(_content);
        const pos = Math.abs(_content.scrollLeft) - width;
        const scrollLeft = pos <= 0 ? 0 : pos;

        _content.scrollLeft = isRTL(_content) ? -1 * scrollLeft : scrollLeft;
    }

    onNextButtonClick() {
        const _content = this.content()?.nativeElement;
        if (!_content) return;
        const width = getWidth(_content) - this.getVisibleButtonWidths();
        const pos = _content.scrollLeft + width;
        const lastPos = _content.scrollWidth - width;
        const scrollLeft = pos >= lastPos ? lastPos : pos;

        _content.scrollLeft = isRTL(_content) ? -1 * scrollLeft : scrollLeft;
    }

    updateButtonState() {
        const _content = this.content()?.nativeElement;
        const _list = this.el?.nativeElement;
        if (!_content) return;

        const { scrollWidth, offsetWidth } = _content;
        const scrollLeft = Math.abs(_content.scrollLeft);
        const width = getWidth(_content);

        this.isPrevButtonEnabled.set(scrollLeft !== 0);
        this.isNextButtonEnabled.set(_list.offsetWidth >= offsetWidth && Math.abs(scrollLeft - scrollWidth + width) > 1);
    }

    updateInkBar() {
        const _content = this.content()?.nativeElement;
        const _inkbar = this.inkbar()?.nativeElement;
        const _tabs = this.tabs()?.nativeElement;
        if (!_content || !_inkbar || !_tabs) return;

        const activeTab = findSingle(_content, '[data-pc-name="tab"][data-p-active="true"]');
        _inkbar.style.width = getOuterWidth(activeTab) + 'px';
        const activeTabOffset = getOffset(activeTab).left as number;
        const tabsOffset = getOffset(_tabs).left as number;
        _inkbar.style.left = activeTabOffset - tabsOffset + 'px';
    }

    getVisibleButtonWidths() {
        const _prevBtn = this.prevButton()?.nativeElement;
        const _nextBtn = this.nextButton()?.nativeElement;

        return [_prevBtn, _nextBtn].reduce((acc, el) => (el ? acc + getWidth(el) : acc), 0);
    }

    bindResizeObserver() {
        this.resizeObserver = new ResizeObserver(() => this.updateButtonState());
        this.resizeObserver.observe(this.el.nativeElement);
    }

    unbindResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.el.nativeElement);
            this.resizeObserver = null!;
        }
    }
}

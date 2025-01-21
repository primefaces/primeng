import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, computed, ContentChild, ContentChildren, effect, ElementRef, forwardRef, inject, QueryList, signal, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { findSingle, getHeight, getOffset, getOuterWidth, getWidth, isRTL } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ChevronLeftIcon, ChevronRightIcon } from 'primeng/icons';
import { RippleModule } from 'primeng/ripple';
import { Tabs } from './tabs';

/**
 * TabList is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tablist',
    standalone: true,
    imports: [CommonModule, ChevronLeftIcon, ChevronRightIcon, RippleModule, SharedModule],
    template: `
        @if (showNavigators() && isPrevButtonEnabled()) {
            <button type="button" #prevButton pRipple class="p-tablist-nav-button p-tablist-prev-button" [attr.aria-label]="prevButtonAriaLabel" [attr.tabindex]="tabindex()" [attr.data-pc-group-section]="'navigator'" (click)="onPrevButtonClick()">
                @if (prevIconTemplate || _prevIconTemplate) {
                    <ng-container *ngTemplateOutlet="prevIconTemplate || _prevIconTemplate" />
                } @else {
                    <ChevronLeftIcon />
                }
            </button>
        }
        <div #content class="p-tablist-content" [ngClass]="{ 'p-tablist-viewport': scrollable() }" (scroll)="onScroll($event)">
            <div #tabs class="p-tablist-tab-list" role="tablist">
                <ng-content />
                <span #inkbar role="presentation" class="p-tablist-active-bar" [attr.data-pc-section]="'inkbar'"></span>
            </div>
        </div>
        @if (showNavigators() && isNextButtonEnabled()) {
            <button type="button" #nextButton pRipple class="p-tablist-nav-button p-tablist-next-button" [attr.aria-label]="nextButtonAriaLabel" [attr.tabindex]="tabindex()" [attr.data-pc-group-section]="'navigator'" (click)="onNextButtonClick()">
                @if (nextIconTemplate || _nextIconTemplate) {
                    <ng-container *ngTemplateOutlet="nextIconTemplate || _nextIconTemplate" />
                } @else {
                    <ChevronRightIcon />
                }
            </button>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.p-tablist]': 'true',
        '[class.p-component]': 'true',
        '[attr.data-pc-name]': '"tablist"'
    }
})
export class TabList extends BaseComponent implements AfterViewInit, AfterContentInit {
    /**
     * A template reference variable that represents the previous icon in a UI component.
     * @type {TemplateRef<any> | undefined}
     * @group Templates
     */
    @ContentChild('previcon', { descendants: false }) prevIconTemplate: TemplateRef<any> | undefined;
    /**
     * A template reference variable that represents the next icon in a UI component.
     * @type {TemplateRef<any> | undefined}
     * @group Templates
     */
    @ContentChild('nexticon', { descendants: false }) nextIconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    @ViewChild('content') content: ElementRef<HTMLDivElement>;

    @ViewChild('prevButton') prevButton: ElementRef<HTMLButtonElement>;

    @ViewChild('nextButton') nextButton: ElementRef<HTMLButtonElement>;

    @ViewChild('inkbar') inkbar: ElementRef<HTMLSpanElement>;

    @ViewChild('tabs') tabs: ElementRef<HTMLDivElement>;

    pcTabs = inject(forwardRef(() => Tabs));

    isPrevButtonEnabled = signal<boolean>(false);

    isNextButtonEnabled = signal<boolean>(false);

    resizeObserver!: ResizeObserver;

    showNavigators = computed(() => this.pcTabs.showNavigators());

    tabindex = computed(() => this.pcTabs.tabindex());

    scrollable = computed(() => this.pcTabs.scrollable());

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
        return this.config.translation.aria.previous;
    }

    get nextButtonAriaLabel() {
        return this.config.translation.aria.next;
    }

    ngAfterViewInit() {
        super.ngAfterViewInit();
        if (this.showNavigators() && isPlatformBrowser(this.platformId)) {
            this.updateButtonState();
            this.bindResizeObserver();
        }
    }

    _prevIconTemplate: TemplateRef<any> | undefined;

    _nextIconTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        this.templates.forEach((t) => {
            switch (t.getType()) {
                case 'previcon':
                    this._prevIconTemplate = t.template;
                    break;
                case 'nexticon':
                    this._nextIconTemplate = t.template;
                    break;
            }
        });
    }

    ngOnDestroy() {
        this.unbindResizeObserver();
        super.ngOnDestroy();
    }

    onScroll(event: Event) {
        this.showNavigators() && this.updateButtonState();

        event.preventDefault();
    }

    onPrevButtonClick() {
        const _content = this.content.nativeElement;
        const width = getWidth(_content);
        const pos = Math.abs(_content.scrollLeft) - width;
        const scrollLeft = pos <= 0 ? 0 : pos;

        _content.scrollLeft = isRTL(_content) ? -1 * scrollLeft : scrollLeft;
    }

    onNextButtonClick() {
        const _content = this.content.nativeElement;
        const width = getWidth(_content) - this.getVisibleButtonWidths();
        const pos = _content.scrollLeft + width;
        const lastPos = _content.scrollWidth - width;
        const scrollLeft = pos >= lastPos ? lastPos : pos;

        _content.scrollLeft = isRTL(_content) ? -1 * scrollLeft : scrollLeft;
    }

    updateButtonState() {
        const _content = this.content?.nativeElement;
        const _list = this.el?.nativeElement;

        const { scrollWidth, offsetWidth } = _content;
        const scrollLeft = Math.abs(_content.scrollLeft);
        const width = getWidth(_content);

        this.isPrevButtonEnabled.set(scrollLeft !== 0);
        this.isNextButtonEnabled.set(_list.offsetWidth >= offsetWidth && scrollLeft !== scrollWidth - width);
    }

    updateInkBar() {
        const _content = this.content.nativeElement;
        const _inkbar = this.inkbar.nativeElement;
        const _tabs = this.tabs.nativeElement;

        const activeTab = findSingle(_content, '[data-pc-name="tab"][data-p-active="true"]');

        _inkbar.style.width = getOuterWidth(activeTab) + 'px';
        _inkbar.style.left = <any>getOffset(activeTab).left - <any>getOffset(_tabs).left + 'px';
    }

    getVisibleButtonWidths() {
        const _prevBtn = this.prevButton?.nativeElement;
        const _nextBtn = this.nextButton?.nativeElement;

        return [_prevBtn, _nextBtn].reduce((acc, el) => (el ? acc + getWidth(el) : acc), 0);
    }

    bindResizeObserver() {
        this.resizeObserver = new ResizeObserver(() => this.updateButtonState());
        this.resizeObserver.observe(this.el.nativeElement);
    }

    unbindResizeObserver() {
        if (this.resizeObserver) {
            this.resizeObserver.unobserve(this.el.nativeElement);
            this.resizeObserver = null;
        }
    }
}

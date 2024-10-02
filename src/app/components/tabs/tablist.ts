import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ContentChild,
    effect,
    ElementRef,
    forwardRef,
    inject,
    signal,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { RippleModule } from 'primeng/ripple';
import { BaseComponent } from 'primeng/basecomponent';
import { Tabs } from './tabs';
import { DomHandler } from 'primeng/dom';

/**
 * TabList is a helper component for Tabs component.
 * @group Components
 */
@Component({
    selector: 'p-tablist',
    standalone: true,
    imports: [CommonModule, ChevronLeftIcon, ChevronRightIcon, RippleModule],
    template: `
        @if (showNavigators() && isPrevButtonEnabled()) {
            <button
                #prevButton
                pRipple
                class="p-tablist-nav-button p-tablist-prev-button"
                [attr.aria-label]="prevButtonAriaLabel"
                [attr.tabindex]="tabindex"
                [attr.data-pc-group-section]="'navigator'"
                (click)="onPrevButtonClick()"
            >
                @if (prevIconTemplate) {
                    <ng-container *ngTemplateOutlet="prevIconTemplate"></ng-container>
                } @else {
                    <ChevronLeftIcon />
                }
            </button>
        }
        <div #content class="p-tablist-content" [ngClass]="{ 'p-tablist-viewport': scrollable() }" (scroll)="onScroll($event)">
            <div #tabs class="p-tablist-tab-list" role="tablist">
                <ng-content></ng-content>
                <span #inkbar role="presentation" class="p-tablist-active-bar" [attr.data-pc-section]="'inkbar'"></span>
            </div>
        </div>
        @if (showNavigators() && isNextButtonEnabled()) {
            <button
                #nextButton
                pRipple
                class="p-tablist-nav-button p-tablist-next-button"
                [attr.aria-label]="nextButtonAriaLabel"
                [attr.tabindex]="tabindex"
                [attr.data-pc-group-section]="'navigator'"
                (click)="onNextButtonClick()"
            >
                @if (nextIconTemplate) {
                    <ng-container *ngTemplateOutlet="nextIconTemplate"></ng-container>
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
        '[attr.data-pc-name]': '"tablist"',
    },
})
export class TabList extends BaseComponent {
    @ContentChild('previcon') prevIconTemplate: TemplateRef<any> | undefined;

    @ContentChild('nexticon') nextIconTemplate: TemplateRef<any> | undefined;

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
    valueChangeEffect = effect(() => {
        this.pcTabs.value();
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                this.updateInkBar();
            });
        }
    });

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

    ngOnDestroy() {
        this.unbindResizeObserver();
        super.ngOnDestroy();
    }

    onScroll(event) {
        this.showNavigators() && this.updateButtonState();

        event.preventDefault();
    }

    onPrevButtonClick() {
        const _content = this.content.nativeElement;
        const width = DomHandler.getWidth(_content);

        const pos = _content.scrollLeft - width;

        _content.scrollLeft = pos <= 0 ? 0 : pos;
    }

    onNextButtonClick() {
        const _content = this.content.nativeElement;
        const width = DomHandler.getWidth(_content) - this.getVisibleButtonWidths();
        const pos = _content.scrollLeft + width;
        const lastPos = _content.scrollWidth - width;

        _content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }

    updateButtonState() {
        const _content = this.content?.nativeElement;
        const _list = this.el?.nativeElement;

        const { scrollLeft, scrollTop, scrollWidth, scrollHeight, offsetWidth, offsetHeight } = _content;
        const [width, height] = [DomHandler.getWidth(_content), DomHandler.getHeight(_content)];

        this.isPrevButtonEnabled.set(scrollLeft !== 0);
        this.isNextButtonEnabled.set(_list.offsetWidth >= offsetWidth && scrollLeft !== scrollWidth - width);
    }

    updateInkBar() {
        const _content = this.content.nativeElement;
        const _inkbar = this.inkbar.nativeElement;
        const _tabs = this.tabs.nativeElement;

        const activeTab = DomHandler.findSingle(_content, '[data-pc-name="tab"][data-p-active="true"]');

        _inkbar.style.width = DomHandler.getOuterWidth(activeTab) + 'px';
        _inkbar.style.left = DomHandler.getOffset(activeTab).left - DomHandler.getOffset(_tabs).left + 'px';
    }

    getVisibleButtonWidths() {
        const _prevBtn = this.prevButton?.nativeElement;
        const _nextBtn = this.nextButton?.nativeElement;

        return [_prevBtn, _nextBtn].reduce((acc, el) => (el ? acc + DomHandler.getWidth(el) : acc), 0);
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

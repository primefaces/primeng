import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, inject, Input, NgModule, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent } from 'primeng/basecomponent';
import { ImageCompareStyle } from './style/imagecomparestyle';

/**
 * Compare two images side by side with a slider.
 * @group Components
 */
@Component({
    selector: 'p-imageCompare, p-imagecompare, p-image-compare',
    standalone: true,
    imports: [CommonModule, SharedModule],
    template: `
        <ng-template *ngTemplateOutlet="leftTemplate || _leftTemplate"></ng-template>
        <ng-template *ngTemplateOutlet="rightTemplate || _rightTemplate"></ng-template>

        <input type="range" min="0" max="100" value="50" (input)="onSlide($event)" [class]="cx('slider')" />
    `,
    host: {
        class: 'p-imagecompare',
        '[attr.tabindex]': 'tabindex',
        '[attr.aria-labelledby]': 'ariaLabelledby',
        '[attr.aria-label]': 'ariaLabel'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ImageCompareStyle]
})
export class ImageCompare extends BaseComponent implements AfterContentInit {
    isRTL: boolean = false;

    /**
     * Index of the element in tabbing order.
     * @defaultValue 0
     * @group Props
     */
    @Input() tabindex: number | undefined;
    /**
     * Defines a string value that labels an interactive element.
     * @group Props
     */
    @Input() ariaLabelledby: string | undefined;
    /**
     * Identifier of the underlying input element.
     * @group Props
     */
    @Input() ariaLabel: string | undefined;

    /**
     * Template for the left side.
     * @group Templates
     */
    @ContentChild('left', { descendants: false }) leftTemplate: TemplateRef<any>;

    /**
     * Template for the right side.
     * @group Templates
     */
    @ContentChild('right', { descendants: false }) rightTemplate: TemplateRef<any>;

    _leftTemplate: TemplateRef<any> | undefined;

    _rightTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _componentStyle = inject(ImageCompareStyle);

    mutationObserver: MutationObserver;

    ngOnInit() {
        super.ngOnInit();
        this.updateDirection();
        this.observeDirectionChanges();
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'left':
                    this._leftTemplate = item.template;
                    break;
                case 'right':
                    this._rightTemplate = item.template;
                    break;
            }
        });
    }

    onSlide(event) {
        const value = event.target.value;
        const image = event.target.previousElementSibling;

        if (this.isRTL) {
            image.style.clipPath = `polygon(${100 - value}% 0, 100% 0, 100% 100%, ${100 - value}% 100%)`;
        } else {
            image.style.clipPath = `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`;
        }
    }

    updateDirection() {
        this.isRTL = !!this.el.nativeElement.closest('[dir="rtl"]');
    }

    observeDirectionChanges() {
        if (isPlatformBrowser(this.platformId)) {
            const targetNode = document?.documentElement;
            const config = { attributes: true, attributeFilter: ['dir'] };

            this.mutationObserver = new MutationObserver(() => {
                this.updateDirection();
            });

            this.mutationObserver.observe(targetNode, config);
        }
    }

    ngOnDestroy() {
        if (this.mutationObserver) {
            this.mutationObserver.disconnect();
        }

        super.ngOnDestroy();
    }
}

@NgModule({
    imports: [ImageCompare, SharedModule],
    exports: [ImageCompare, SharedModule]
})
export class ImageCompareModule {}

import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ContentChild, ContentChildren, inject, InjectionToken, input, Input, NgModule, numberAttribute, QueryList, TemplateRef, ViewEncapsulation } from '@angular/core';
import { MotionEvent, MotionOptions } from '@primeuix/motion';
import { getWindowScrollTop } from '@primeuix/utils';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { BaseComponent, PARENT_INSTANCE } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Button, ButtonProps } from 'primeng/button';
import { ChevronUpIcon } from 'primeng/icons';
import { MotionModule } from 'primeng/motion';
import { ScrollTopPassThrough } from 'primeng/types/scrolltop';
import { ZIndexUtils } from 'primeng/utils';
import { ScrollTopStyle } from './style/scrolltopstyle';

const SCROLLTOP_INSTANCE = new InjectionToken<ScrollTop>('SCROLLTOP_INSTANCE');

/**
 * ScrollTop gets displayed after a certain scroll position and used to navigates to the top of the page quickly.
 * @group Components
 */
@Component({
    selector: 'p-scrollTop, p-scrolltop, p-scroll-top',
    standalone: true,
    imports: [CommonModule, ChevronUpIcon, Button, SharedModule, MotionModule],
    template: `
        <p-motion [visible]="visible" name="p-scrolltop" [options]="computedMotionOptions()" (onBeforeEnter)="onBeforeEnter($event)" (onBeforeLeave)="onBeforeLeave()">
            <p-button [attr.aria-label]="buttonAriaLabel" (click)="onClick()" [pt]="ptm('pcButton')" [styleClass]="cn(cx('root'), styleClass)" [ngStyle]="style" type="button" [buttonProps]="buttonProps" [unstyled]="unstyled()">
                <ng-template #icon>
                    <ng-container *ngIf="!iconTemplate && !_iconTemplate">
                        <span *ngIf="_icon" [class]="cn(cx('icon'), _icon)"></span>
                        <svg data-p-icon="chevron-up" *ngIf="!_icon" [class]="cx('icon')" />
                    </ng-container>
                    <ng-template [ngIf]="!icon" *ngTemplateOutlet="iconTemplate || _iconTemplate; context: { styleClass: cx('icon') }"></ng-template>
                </ng-template>
            </p-button>
        </p-motion>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [ScrollTopStyle, { provide: SCROLLTOP_INSTANCE, useExisting: ScrollTop }, { provide: PARENT_INSTANCE, useExisting: ScrollTop }],
    hostDirectives: [Bind]
})
export class ScrollTop extends BaseComponent<ScrollTopPassThrough> {
    $pcScrollTop: ScrollTop | undefined = inject(SCROLLTOP_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

    bindDirectiveInstance = inject(Bind, { self: true });

    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }

    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Target of the ScrollTop.
     * @group Props
     */
    @Input() target: 'window' | 'parent' | undefined = 'window';
    /**
     * Defines the threshold value of the vertical scroll position of the target to toggle the visibility.
     * @group Props
     */
    @Input({ transform: numberAttribute }) threshold: number = 400;
    /**
     * Name of the icon or JSX.Element for icon.
     * @group Props
     */
    @Input() get icon(): string | undefined {
        return this._icon;
    }
    /**
     * Defines the scrolling behavior, "smooth" adds an animation and "auto" scrolls with a jump.
     * @group Props
     */
    @Input() behavior: 'auto' | 'smooth' | undefined = 'smooth';
    /**
     * A string value used to determine the display transition options.
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    @Input() showTransitionOptions: string = '.15s';
    /**
     * A string value used to determine the hiding transition options.
     * @group Props
     * @deprecated since v21.0.0. Use `motionOptions` instead.
     */
    @Input() hideTransitionOptions: string = '.15s';
    /**
     * The motion options.
     * @group Props
     */
    motionOptions = input<MotionOptions | undefined>(undefined);

    computedMotionOptions = computed<MotionOptions>(() => {
        return {
            ...this.ptm('motion'),
            ...this.motionOptions()
        };
    });
    /**
     * Establishes a string value that labels the scroll-top button.
     * @group Props
     */
    @Input() buttonAriaLabel: string | undefined;
    /**
     * Used to pass all properties of the ButtonProps to the Button component.
     * @group Props
     */
    @Input() buttonProps: ButtonProps = { rounded: true, severity: 'success' };
    /**
     * Template of the icon.
     * @group Templates
     */
    @ContentChild('icon', { descendants: false }) iconTemplate: TemplateRef<any> | undefined;

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    _iconTemplate: TemplateRef<any> | undefined;

    _icon: string | undefined;

    set icon(value: string | undefined) {
        this._icon = value;
    }

    documentScrollListener: VoidFunction | null | undefined;

    parentScrollListener: VoidFunction | null | undefined;

    visible: boolean = false;

    overlay: any;

    _componentStyle = inject(ScrollTopStyle);

    onInit() {
        if (this.target === 'window') this.bindDocumentScrollListener();
        else if (this.target === 'parent') this.bindParentScrollListener();
    }

    onAfterContentInit() {
        (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
            switch (item.getType()) {
                case 'icon':
                    this._iconTemplate = item.template;
                    break;
            }
        });
    }

    onClick() {
        let scrollElement = this.target === 'window' ? this.document.defaultView : this.el.nativeElement.parentElement;
        scrollElement.scroll({
            top: 0,
            behavior: this.behavior
        });
    }

    onBeforeEnter(event: MotionEvent) {
        this.overlay = event.element as HTMLElement;
        this.overlay.style.position = this.target !== 'parent' ? 'fixed' : null;
        ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
    }

    onBeforeLeave() {
        ZIndexUtils.clear(this.overlay);
        this.overlay = null;
    }

    checkVisibility(scrollY: number) {
        if (scrollY > this.threshold) this.visible = true;
        else this.visible = false;
        this.cd.markForCheck();
    }

    bindParentScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            this.parentScrollListener = this.renderer.listen(this.el.nativeElement.parentElement, 'scroll', () => {
                this.checkVisibility(this.el.nativeElement.parentElement.scrollTop);
            });
        }
    }

    bindDocumentScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            this.documentScrollListener = this.renderer.listen(this.document.defaultView, 'scroll', () => {
                this.checkVisibility(getWindowScrollTop());
            });
        }
    }

    unbindParentScrollListener() {
        if (this.parentScrollListener) {
            this.parentScrollListener();
            this.parentScrollListener = null;
        }
    }

    unbindDocumentScrollListener() {
        if (this.documentScrollListener) {
            this.documentScrollListener();
            this.documentScrollListener = null;
        }
    }

    onDestroy() {
        if (this.target === 'window') this.unbindDocumentScrollListener();
        else if (this.target === 'parent') this.unbindParentScrollListener();

        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    }
}

@NgModule({
    imports: [ScrollTop, SharedModule],
    exports: [ScrollTop, SharedModule]
})
export class ScrollTopModule {}

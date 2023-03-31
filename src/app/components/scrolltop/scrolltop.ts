import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, Inject, Renderer2, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { DomHandler } from 'primeng/dom';
import { ZIndexUtils } from 'primeng/utils';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'p-scrollTop',
    template: `
        <button
            *ngIf="visible"
            [@animation]="{ value: 'open', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            (@animation.start)="onEnter($event)"
            (@animation.done)="onLeave($event)"
            [ngClass]="containerClass()"
            (click)="onClick()"
            [class]="styleClass"
            [ngStyle]="style"
            type="button"
        >
            <span [class]="icon" [ngClass]="'p-scrolltop-icon'"></span>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./scrolltop.css'],
    animations: [
        trigger('animation', [
            state(
                'void',
                style({
                    opacity: 0
                })
            ),
            state(
                'open',
                style({
                    opacity: 1
                })
            ),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    host: {
        class: 'p-element'
    }
})
export class ScrollTop implements OnInit, OnDestroy {
    @Input() styleClass: string;

    @Input() style: any;

    @Input() target: string = 'window';

    @Input() threshold: number = 400;

    @Input() icon: string = 'pi pi-chevron-up';

    @Input() behavior: string = 'smooth';

    @Input() showTransitionOptions: string = '.15s';

    @Input() hideTransitionOptions: string = '.15s';

    documentScrollListener: VoidFunction | null;

    parentScrollListener: VoidFunction | null;

    visible: boolean = false;

    overlay: any;

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, public el: ElementRef, private cd: ChangeDetectorRef, public config: PrimeNGConfig) {
        this.window = this.document.defaultView;
    }

    ngOnInit() {
        if (this.target === 'window') this.bindDocumentScrollListener();
        else if (this.target === 'parent') this.bindParentScrollListener();
    }

    onClick() {
        let scrollElement = this.target === 'window' ? this.window : this.el.nativeElement.parentElement;
        scrollElement.scroll({
            top: 0,
            behavior: this.behavior
        });
    }

    onEnter(event: AnimationEvent) {
        switch (event.toState) {
            case 'open':
                this.overlay = event.element;
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                break;
            case 'void':
                this.overlay = null;
                break;
        }
    }

    onLeave(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }

    checkVisibility(scrollY) {
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
            this.documentScrollListener = this.renderer.listen(this.window, 'scroll', () => {
                this.checkVisibility(DomHandler.getWindowScrollTop());
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

    containerClass() {
        return {
            'p-scrolltop p-link p-component': true,
            'p-scrolltop-sticky': this.target !== 'window'
        };
    }

    ngOnDestroy() {
        if (this.target === 'window') this.unbindDocumentScrollListener();
        else if (this.target === 'parent') this.unbindParentScrollListener();

        if (this.overlay) {
            ZIndexUtils.clear(this.overlay);
            this.overlay = null;
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ScrollTop],
    declarations: [ScrollTop]
})
export class ScrollTopModule {}

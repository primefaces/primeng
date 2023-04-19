import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef, ContentChildren, QueryList, TemplateRef, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { ZIndexUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';

@Component({
    selector: 'p-blockUI',
    template: `
        <div #mask [class]="styleClass" [ngClass]="{ 'p-blockui-document': !target, 'p-blockui p-component-overlay p-component-overlay-enter': true }" [ngStyle]="{ display: blocked ? 'flex' : 'none' }">
            <ng-content></ng-content>
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./blockui.css'],
    host: {
        class: 'p-element'
    }
})
export class BlockUI implements AfterViewInit, OnDestroy {
    @Input() target: any;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() styleClass: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    @ViewChild('mask') mask: ElementRef;

    _blocked: boolean;

    animationEndListener: VoidFunction | null;

    contentTemplate: TemplateRef<any>;

    constructor(@Inject(DOCUMENT) private document: Document, public el: ElementRef, public cd: ChangeDetectorRef, public config: PrimeNGConfig, private renderer: Renderer2) {}

    @Input() get blocked(): boolean {
        return this._blocked;
    }

    set blocked(val: boolean) {
        if (this.mask && this.mask.nativeElement) {
            if (val) this.block();
            else this.unblock();
        } else {
            this._blocked = val;
        }
    }

    ngAfterViewInit() {
        if (this.target && !this.target.getBlockableElement) {
            throw 'Target of BlockUI must implement BlockableUI interface';
        }
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;

                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }

    block() {
        this._blocked = true;

        if (this.target) {
            this.target.getBlockableElement().appendChild(this.mask.nativeElement);
            this.target.getBlockableElement().style.position = 'relative';
        } else {
            this.renderer.appendChild(this.document.body, this.mask.nativeElement);
        }

        if (this.autoZIndex) {
            ZIndexUtils.set('modal', this.mask.nativeElement, this.baseZIndex + this.config.zIndex.modal);
        }
    }

    unblock() {
        if (this.mask) {
            this.animationEndListener = this.renderer.listen(this.mask.nativeElement, 'animationend', this.destroyModal.bind(this));
            DomHandler.addClass(this.mask.nativeElement, 'p-component-overlay-leave');
        }
    }

    destroyModal() {
        this._blocked = false;
        if (this.mask) {
            DomHandler.removeClass(this.mask.nativeElement, 'p-component-overlay-leave');
            ZIndexUtils.clear(this.mask.nativeElement);
            this.renderer.appendChild(this.el.nativeElement, this.mask.nativeElement);
        }
        this.unbindAnimationEndListener();
        this.cd.markForCheck();
    }

    unbindAnimationEndListener() {
        if (this.animationEndListener && this.mask) {
            this.animationEndListener();
            this.animationEndListener = null;
        }
    }

    ngOnDestroy() {
        this.unblock();
        this.destroyModal();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [BlockUI],
    declarations: [BlockUI]
})
export class BlockUIModule {}

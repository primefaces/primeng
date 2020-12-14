import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnInit, OnDestroy, ElementRef, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DomHandler } from '../dom/domhandler';

@Component({
    selector: 'p-scrollTop',
    template: `
        <button  *ngIf="visible" [@animation]="{value: 'open', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@animation.start)="onEnter()"
            [ngClass]="containerClass()" (click)="onClick()" [class]="styleClass" [ngStyle]="style" type="button">
            <span [class]="icon" [ngClass]="'p-scrolltop-icon'"></span>
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./scrolltop.css'],
    animations: [
        trigger('animation', [
            state('void', style({
                opacity: 0
            })),
            state('open', style({
                opacity: 1
            })),
            transition('void => open', animate('{{showTransitionParams}}')),
            transition('open => void', animate('{{hideTransitionParams}}')),
        ])
    ]
})
export class ScrollTop implements OnInit, OnDestroy {

    @Input() styleClass: string;

    @Input() style: any;

    @Input() target: string = "window";
    
    @Input() threshold: number = 400;

    @Input() icon: string = "pi pi-chevron-up";

    @Input() behavior: string = "smooth";
    
    @Input() showTransitionOptions: string = '.15s';

    @Input() hideTransitionOptions: string = '.15s';

    scrollListener: any;
    
    visible: boolean = false;

    constructor(public el: ElementRef, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        if (this.target === 'window')
            this.bindDocumentScrollListener();
        else if (this.target === 'parent')
            this.bindParentScrollListener();
    }

    onClick() {
        let scrollElement = this.target === 'window' ? window : this.el.nativeElement.parentElement;
         scrollElement.scroll({
            top: 0, 
            behavior: this.behavior
        });
    }

    onEnter() {
        this.el.nativeElement.children[0].style.zIndex = DomHandler.generateZIndex();
    }

    checkVisibility(scrollY) {
        if (scrollY > this.threshold)
            this.visible = true;
        else
            this.visible = false;

        this.cd.markForCheck();
    }

    bindParentScrollListener() {
        this.scrollListener = () => {

            this.checkVisibility(this.el.nativeElement.parentElement.scrollTop);
        };
        
        this.el.nativeElement.parentElement.addEventListener('scroll', this.scrollListener);
    }

    bindDocumentScrollListener() {
        this.scrollListener = () => {
            this.checkVisibility(DomHandler.getWindowScrollTop());
        };
        
        window.addEventListener('scroll', this.scrollListener);
    }

    unbindParentScrollListener() {
        if (this.scrollListener) {
            this.el.nativeElement.parentElement.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    }

    unbindDocumentScrollListener() {
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
            this.scrollListener = null;
        }
    }

    containerClass() {
        return {
            'p-scrolltop p-link p-component': true,
            'p-scrolltop-sticky': this.target !== 'window'
        };
    }

    ngOnDestroy() {
        if (this.target === 'window')
            this.unbindDocumentScrollListener();
        else if (this.target === 'parent')
            this.unbindParentScrollListener();
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [ScrollTop],
    declarations: [ScrollTop]
})
export class ScrollTopModule { }

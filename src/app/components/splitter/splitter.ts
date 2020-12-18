import { NgModule, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ContentChildren, QueryList, ElementRef, Inject, forwardRef, ChangeDetectorRef, TemplateRef, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { Subscription } from 'rxjs';

@Component({
    selector: 'p-splitter',
    template: `
        <div [ngClass]="containerClass()" [class]="styleClass" [ngStyle]="style">
            <ng-content></ng-content>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./splitter.css']
})
export class Splitter {

    @Input() styleClass: string;

    @Input() style: any;

    @Input() stateStorage: string = "session";

    @Input() stateKey: string;

    @Input() layout: string = "horizontal";

    @Input() gutterSize: number = 4;

    // @ContentChildren(SplitterPanel) panelList: QueryList<SplitterPanel>;

    // panels: SplitterPanel[] = [];

    dragging = false;

    mouseMoveListener = null;

    mouseUpListener = null;

    size = null;

    gutterElement = null;

    startPos = null;

    prevPanelElement = null;

    nextPanelElement = null;

    nextPanelSize = null;

    prevPanelSize = null;

    panelSizes = null;

    prevPanelIndex = null;

    panelListSubscription: Subscription;

    constructor(public cd: ChangeDetectorRef, private el: ElementRef) { }

    ngOnInit() {
    }

    ngAfterContentInit() {
        // this.panels = this.panelList.toArray();

        // if (this.panels && this.panels.length) {
        //     let initialized = false;
        //     if (!initialized) {
        //         let children = [...this.panels].filter(child => DomHandler.hasClass(child.el.nativeElement.children[0], 'p-splitter-panel'));
        //         let _panelSizes = [];

        //         this.panels.map((panel, i) => {
        //             let panelInitialSize = panel && panel.size ? panel.size : null;
        //             let panelSize = panelInitialSize || (100 / this.panels.length);
        //             _panelSizes[i] = panelSize;
        //             children[i].style.flexBasis = 'calc(' + panelSize + '% - ' + ((this.panels.length - 1) * this.gutterSize) + 'px)';
        //             children[i];
        //         });

        //         this.panelSizes = _panelSizes;
        //     }
        // }

        this.cd.markForCheck();
    }

    containerClass() {
        return {
            'p-splitter p-component': true,
            'p-splitter-horizontal': this.layout === "horizontal",
            'p-splitter-vertical': this.layout === "vertical"
        };
    }

    ngOnDestroy() {
        if (this.panelListSubscription) {
            this.panelListSubscription.unsubscribe();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [Splitter],
    declarations: [Splitter]
})
export class SplitterModule { }

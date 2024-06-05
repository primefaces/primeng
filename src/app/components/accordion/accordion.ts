import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, QueryList, TemplateRef, ViewEncapsulation, booleanAttribute, forwardRef, inject, signal } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { ChevronDownIcon } from 'primeng/icons/chevrondown';
import { ChevronRightIcon } from 'primeng/icons/chevronright';

@Component({
    selector: 'p-accordionHeader',
    template: `
        <!-- <div pRipple class="p-accordionheader" (click)="onClick()">
         <slot :active="$pcAccordionPanel.active"></slot>
        <ng-container *ngIf="!toggleIconTemplate">
            <ng-container *ngIf="active">
                <ng-container *ngIf="collapseIcon">
                    <span [class]="collapseIcon"></span>
                </ng-container>

                <ng-container *ngIf="!collapseIcon">
                    <ChevronDownIcon />
                </ng-container>
            </ng-container>

            <ng-container *ngIf="!active">
                <ng-container *ngIf="expandIcon">
                    <span [class]="expandIcon"></span>
                </ng-container>

                <ng-container *ngIf="!expandIcon">
                    <ChevronDownIcon />
                </ng-container>
            </ng-container>
        </ng-container>
        <ng-container *ngIf="toggleIconTemplate">
            <ng-container *ngTemplateOutlet="toggleIconTemplate"> </ng-container>
        </ng-container>
    </div> -->
        <ng-content></ng-content>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accordion.css'],
    host: {
        class: 'p-element'
    }
})
export class AccordionHeader {
    constructor(public pcAccordion: Accordion) {}

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    public toggleIconTemplate: TemplateRef<any> | undefined;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'toggleicon':
                    this.toggleIconTemplate = item.template;
                    break;

                default:
                    this.toggleIconTemplate = item.template;
                    break;
            }
        });
    }

    onClick() {
        this.changeActiveValue();
    }

    changeActiveValue() {
        // this.pcAccordion.updateValue(this.pcAccordionPanel.value);
    }
}
@Component({
    selector: 'p-accordionPanel',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accordion.css'],
    host: {
        class: 'p-element'
    }
})
export class AccordionPanel {
    @Input() value: string | undefined;
    @Input() as: string | undefined = 'DIV';
    @Input({ transform: booleanAttribute }) asChild: boolean = false;
    @Input({ transform: booleanAttribute }) disabled: boolean = false;
    @Input({ transform: booleanAttribute }) active: boolean = false;

    get containerClass() {
        return {
            'p-accordionpanel': true,
            'p-accordionpanel-active': this.active,
            'p-disabled': this.disabled
        };
    }
}

/**
 * Accordion groups a collection of contents in tabs.
 * @group Components
 */
@Component({
    selector: 'p-accordion',
    template: `<div class="p-accordion">
        @if(hasAccordionTab){
        <ng-container *ngFor="let tab of tabs; let i = index">
            <p-accordionPanel [value]="i" [disabled]="getTabProp(tab, 'disabled')">
                <p-accordionHeader [class]="getTabProp(tab, 'headerClass')">
                    <!-- <component v-if="tab.children && tab.children.headericon" :is="tab.children.headericon" ........... :index="i"></component> -->
                    <!-- <span v-if="tab.props && tab.props.header" v-bind="getTabPT(tab, 'headertitle', i)">{{ tab.props.header }}</span> -->
                    <ng-container *ngIf="!toggleIconTemplate">
                        <ng-container *ngIf="active">
                            <ng-container *ngIf="collapseIcon">
                                <span [class]="collapseIcon"></span>
                            </ng-container>
                            <ng-container *ngIf="!collapseIcon">
                                <ChevronDownIcon />
                            </ng-container>
                        </ng-container>
                        <ng-container *ngIf="!active">
                            <ng-container *ngIf="expandIcon">
                                <span [class]="expandIcon"></span>
                            </ng-container>
                            <ng-container *ngIf="!expandIcon">
                                <ChevronDownIcon />
                            </ng-container>
                        </ng-container>
                    </ng-container>
                    <ng-container *ngIf="toggleIconTemplate">
                        <ng-template pTemplate="toggleicon"> </ng-template>
                    </ng-container>
                    <!-- <component v-if="tab.children && tab.children.header" :is="tab.children.header"></component> -->
                </p-accordionHeader>
                <p-accordionContent>
                    <ng-content></ng-content>
                </p-accordionContent>
            </p-accordionPanel>
        </ng-container>
        } @else {
        <ng-content></ng-content>
        }
    </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'p-element'
    }
})
export class Accordion {
    @Input() value: string[] = undefined;

    @Input() multiple: boolean = false;

    @Input() lazy: boolean = false;

    @Input() tabindex: number = 0;

    @Input() selectOnFocus: boolean = false;

    @Input() expandIcon: string = undefined;

    @Input() collapseIcon: string = undefined;

    @Input() activeIndex: number | number[] = null;

    @Output() onValueChange: EventEmitter<any> = new EventEmitter<any>();

    @Output() onTabClick: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(PrimeTemplate) templates!: QueryList<PrimeTemplate>;

    @ContentChildren(AccordionPanel) accordionPanels: QueryList<any> | undefined;

    public toggleIconTemplate: TemplateRef<any> | undefined;

    isItemActive(value) {
        return this.multiple ? this.value?.includes(value) : this.value === value;
    }

    updateValue(newValue) {
        const active = this.isItemActive(newValue);

        if (this.multiple) {
            if (active) {
                this.value = this.value.filter((v) => v !== newValue);
            } else {
                if (this.value) this.value.push(newValue);
                else this.value = [newValue];
            }
        } else {
            this.value = active ? null : newValue;
        }

        this.onValueChange.emit({ value: this.value });
    }

    getTabProp(tab, name) {
        return tab.props ? tab.props[name] : undefined;
    }

    tabClick(event, index) {
        this.onTabClick.emit({ originalEvent: event, index });
    }

    hasAccordionTab() {
        return this.accordionPanels.length;
    }

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.toggleIconTemplate = item.template;
                    break;

                default:
                    this.toggleIconTemplate = item.template;
                    break;
            }
        });
    }
}
@Component({
    selector: 'p-accordionContent',
    template: `
        <!-- @if(pcAccordion.lazy ? pcAccordionPanel.active : true){
        <div [hidden]="!(pcAccordion.lazy || pcAccordionPanel.active)" class="p-accordioncontent">
            <div class="p-accordioncontent-content">
                <ng-content></ng-content>
            </div>
        </div>
        } @else {
        <ng-content></ng-content>
        } -->
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./accordion.css'],
    host: {
        class: 'p-element'
    }
})
export class AccordionContent {
   
    public pcAccordionPanel: AccordionPanel = inject(forwardRef(() => AccordionPanel));


   
}
@NgModule({
    imports: [CommonModule, ChevronRightIcon, ChevronDownIcon],
    exports: [Accordion, AccordionContent, AccordionHeader, AccordionPanel, SharedModule],
    declarations: [Accordion, AccordionContent, AccordionHeader, AccordionPanel]
})
export class AccordionModule {}

import {NgModule,Component,ElementRef,Input,Output,EventEmitter,ViewChild,ChangeDetectionStrategy,ViewEncapsulation, TemplateRef, ContentChildren, QueryList} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem, PrimeTemplate} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { TieredMenuModule, TieredMenu } from 'primeng/tieredmenu';

@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="'p-splitbutton p-component'" [ngStyle]="style" [class]="styleClass">
            <ng-container *ngIf="contentTemplate; else defaultButton">
                <button class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex">
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </button>
            </ng-container>
            <ng-template #defaultButton>
                <button #defaultbtn class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex"></button>
            </ng-template>
            <button type="button" pButton class="p-splitbutton-menubutton" icon="pi pi-chevron-down" (click)="onDropdownButtonClick($event)" [disabled]="disabled" [attr.aria-label]="expandAriaLabel"></button>
            <p-tieredMenu #menu [popup]="true" [model]="model" [style]="menuStyle" [styleClass]="menuStyleClass" [appendTo]="appendTo"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-tieredMenu>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./splitbutton.css'],
    host: {
        'class': 'p-element'
    }
})
export class SplitButton {

    @Input() model: MenuItem[];

    @Input() icon: string;

    @Input() iconPos: string = 'left';

    @Input() label: string;

    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Output() onDropdownClick: EventEmitter<any> = new EventEmitter();

    @Input() style: any;

    @Input() styleClass: string;

    @Input() menuStyle: any;

    @Input() menuStyleClass: string;

    @Input() disabled: boolean;

    @Input() tabindex: number;

    @Input() appendTo: any;

    @Input() dir: string;

    @Input() expandAriaLabel: string;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('defaultbtn') buttonViewChild: ElementRef;

    @ViewChild('menu') menu: TieredMenu;
    
    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    contentTemplate: TemplateRef<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                break;

                default:
                    this.contentTemplate = item.template;
                break;
            }
        });
    }

    onDefaultButtonClick(event: Event) {
        this.onClick.emit(event);
    }

    onDropdownButtonClick(event: Event) {
        this.onDropdownClick.emit(event);
        this.menu.toggle({currentTarget: this.containerViewChild.nativeElement, relativeAlign: this.appendTo == null});
    }

}

@NgModule({
    imports: [CommonModule,ButtonModule, TieredMenuModule],
    exports: [SplitButton,ButtonModule, TieredMenuModule],
    declarations: [SplitButton]
})
export class SplitButtonModule { }

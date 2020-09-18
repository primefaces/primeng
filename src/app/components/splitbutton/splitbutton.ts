import { NgModule, Component, ElementRef, Input, Output, EventEmitter, ViewChild, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule, Menu } from 'primeng/menu';

@Component({
    selector: 'p-splitButton',
    template: `
        <div #container [ngClass]="'p-splitbutton p-component'" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex"></button>
            <button type="button" pButton class="p-splitbutton-menubutton" icon="pi pi-chevron-down" (click)="onDropdownButtonClick($event)" [disabled]="disabled"></button>
            <p-menu #menu [popup]="true" [model]="model" [style]="menuStyle" [styleClass]="menuStyleClass" [appendTo]="appendTo"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-menu>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./splitbutton.css']
})
export class SplitButton {

    @Input() model: MenuItem[];

    @Input() icon: string;

    @Input() iconPos = 'left';

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

    @Input() showTransitionOptions = '225ms ease-out';

    @Input() hideTransitionOptions = '195ms ease-in';

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('defaultbtn') buttonViewChild: ElementRef;

    @ViewChild('menu') menu: Menu;

    onDefaultButtonClick(event: Event) {
        this.onClick.emit(event);
    }

    onDropdownButtonClick(event: Event) {
        this.menu.toggle({currentTarget: this.containerViewChild.nativeElement, relativeAlign: this.appendTo == null});
    }

}

@NgModule({
    imports: [CommonModule, ButtonModule, MenuModule],
    exports: [SplitButton, ButtonModule],
    declarations: [SplitButton]
})
export class SplitButtonModule { }

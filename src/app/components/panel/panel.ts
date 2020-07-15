import {NgModule,Component,Input,Output,EventEmitter,ElementRef,ContentChild,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,Footer} from 'primeng/api';
import {BlockableUI} from 'primeng/api';
import {trigger,state,style,transition,animate} from '@angular/animations';

let idx: number = 0;

@Component({
    selector: 'p-panel',
    template: `
        <div [attr.id]="id" [ngClass]="{'p-panel p-component': true, 'p-panel-toggleable': toggleable}" [ngStyle]="style" [class]="styleClass">
            <div class="p-panel-header" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'">
                <span class="p-panel-title" *ngIf="header" [attr.id]="id + '_header'">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <div class="p-panel-icons">
                    <button *ngIf="toggleable" [attr.id]="id + '-label'" class="p-panel-header-icon p-panel-toggler p-link"
                        (click)="onIconClick($event)" (keydown.enter)="onIconClick($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                        <span [class]="collapsed ? expandIcon : collapseIcon"></span>
                    </button>
                </div>
            </div>
            <div [attr.id]="id + '-content'" class="p-toggleable-content" [@panelContent]="collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}" (@panelContent.done)="onToggleDone($event)"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id  + '-titlebar'">
                <div class="p-panel-content">
                    <ng-content></ng-content>
                </div>
                
                <div class="p-panel-footer" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('panelContent', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('void', style({
                height: '{{height}}'
            }), {params: {height: '0'}}),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({ overflow: 'hidden'}), animate('{{transitionParams}}')]),
            transition('void => hidden', animate('{{transitionParams}}')),
            transition('void => visible', animate('{{transitionParams}}'))
        ])
    ],
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panel.css']
})
export class Panel implements BlockableUI {

    @Input() toggleable: boolean;

    @Input() header: string;

    @Input() collapsed: boolean = false;
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() expandIcon: string = 'pi pi-plus';
    
    @Input() collapseIcon: string = 'pi pi-minus';
  
    @Input() showHeader: boolean = true;

    @Input() toggler: string = "icon";
    
    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';

    @ContentChild(Footer) footerFacet;
    
    animating: boolean;
    
    id: string = `ui-panel-${idx++}`;
    
    constructor(private el: ElementRef) {}

    onHeaderClick(event: Event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    }

    onIconClick(event: Event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    }
    
    toggle(event: Event) {
        if (this.animating) {
            return false;
        }
        
        this.animating = true;
        this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
        
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        
        event.preventDefault();
    }
    
    expand(event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    }
    
    collapse(event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    }
    
    getBlockableElement(): HTMLElement {
        return this.el.nativeElement.children[0];
    }
    
    onToggleDone(event: Event) {
        this.animating = false;
        this.onAfterToggle.emit({originalEvent: event, collapsed: this.collapsed});
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [Panel,SharedModule],
    declarations: [Panel]
})
export class PanelModule { }

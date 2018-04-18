import {NgModule,Component,Input,Output,EventEmitter,ElementRef,ContentChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule,Footer} from '../common/shared';
import {BlockableUI} from '../common/blockableui';
import {trigger,state,style,transition,animate} from '@angular/animations';

let idx: number = 0;

@Component({
    selector: 'p-panel',
    template: `
        <div [attr.id]="id" [ngClass]="'ui-panel ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all" *ngIf="showHeader">
                <span class="ui-panel-title" *ngIf="header">{{header}}</span>
                <ng-content select="p-header"></ng-content>
                <a *ngIf="toggleable" [attr.id]="id + '-label'" class="ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default" href="#"
                    (click)="toggle($event)" [attr.aria-controls]="id + '-content'" role="tab" [attr.aria-expanded]="!collapsed">
                    <span [class]="collapsed ? 'fa fa-fw ' + expandIcon : 'fa fa-fw ' + collapseIcon"></span>
                </a>
            </div>
            <div [attr.id]="id + '-content'" class="ui-panel-content-wrapper" [@panelContent]="collapsed ? 'hidden' : 'visible'" (@panelContent.done)="onToggleDone($event)"
                [ngClass]="{'ui-panel-content-wrapper-overflown': collapsed||animating}"
                role="region" [attr.aria-hidden]="collapsed" [attr.aria-labelledby]="id + '-label'">
                <div class="ui-panel-content ui-widget-content">
                    <ng-content></ng-content>
                </div>
                
                <div class="ui-panel-footer ui-widget-content" *ngIf="footerFacet">
                    <ng-content select="p-footer"></ng-content>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('panelContent', [
            state('hidden', style({
                height: '0',
                opacity: 0
            })),
            state('visible', style({
                height: '*',
                opacity: 1
            })),
            transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class Panel implements BlockableUI {

    @Input() toggleable: boolean;

    @Input() header: string;

    @Input() collapsed: boolean = false;
    
    @Input() style: any;
    
    @Input() styleClass: string;
    
    @Input() expandIcon: string = 'fa-plus';
    
    @Input() collapseIcon: string = 'fa-minus';
  
    @Input() showHeader: boolean = true;
    
    @Output() collapsedChange: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeToggle: EventEmitter<any> = new EventEmitter();

    @Output() onAfterToggle: EventEmitter<any> = new EventEmitter();
    
    @ContentChild(Footer) footerFacet;
    
    animating: boolean;
    
    id: string = `ui-panel-${idx++}`;
    
    constructor(private el: ElementRef) {}
    
    toggle(event) {
        if(this.animating) {
            return false;
        }
        
        this.animating = true;
        this.onBeforeToggle.emit({originalEvent: event, collapsed: this.collapsed});
        
        if(this.toggleable) {
            if(this.collapsed)
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

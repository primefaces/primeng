import {Component,ElementRef,AfterViewInit,Input,Output,EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-splitButton',
    template: `
        <div class="ui-splitbutton ui-buttonset ui-widget">
            <button id="btn" type="button" class="ui-button ui-widget ui-state-default ui-corner-left"
                [ngClass]="{'ui-button-text-only':(!icon&&label),'ui-button-icon-only':(icon&&!label),
                'ui-button-text-icon-left':(icon&&label&&iconPos=='left'),'ui-button-text-icon-right':(icon&&label&&iconPos=='right'),
                'ui-state-hover':hoverDefaultBtn,'ui-state-focus':focusDefaultBtn,'ui-state-active':activeDefaultBtn}"
                (mouseenter)="hoverDefaultBtn=true" (mouseleave)="hoverDefaultBtn=false"  (focus)="focusDefaultBtn=true" (blur)="focusDefaultBtn=false"
                (mousedown)="activeDefaultBtn=true" (mouseup)="activeDefaultBtn=false" (click)="onDefaultButtonClick($event)">
                <span [ngClass]="'ui-button-icon-left ui-c fa fa-fw'" [attr.class]="icon"></span>
                <span class="ui-button-text ui-c">{{label}}</span>
            </button>
            <button class="ui-splitbutton-menubutton ui-button ui-widget ui-state-default ui-button-icon-only ui-corner-right" type="button"
                [ngClass]="{'ui-state-hover':hoverDropdown,'ui-state-focus':focusDropdown,'ui-state-active':activeDropdown}"
                (mouseenter)="hoverDropdown=true" (mouseleave)="hoverDropdown=false" (focus)="focusDropdown=true" (blur)="focusDropdown=false"
                (mousedown)="activeDropdown=true" (mouseup)="activeDropdown=false">
                <span class="ui-button-icon-left ui-c fa fa-fw fa-caret-down"></span>
                <span class="ui-button-text ui-c">ui-button</span>
            </button>
        </div>
    ` 
})
export class SplitButton {

    @Input() icon: string;

    @Input() iconPos: string = 'left';
        
    @Input() label: string;
    
    @Output() onClick: EventEmitter<any> = new EventEmitter();
    
    private hoverDefaultBtn: boolean;
    
    private focusDefaultBtn: boolean;
    
    private activeDefaultBtn: boolean;
    
    private hoverDropdown: boolean;
    
    private focusDropdown: boolean;
    
    private activeDropdown: boolean;

    constructor(private el: ElementRef) {}
    
    onDefaultButtonClick(event) {
        this.onClick.next(event);
    }
    
}
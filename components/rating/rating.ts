import {Component,ElementRef,OnInit,Input,Output, EventEmitter} from 'angular2/core';

@Component({
    selector: 'p-rating',
    template: `
        <div class="ui-rating" [ngClass]="{'ui-state-disabled': disabled}">
            <div class="ui-rating-cancel" *ngIf="cancel" (click)="clear($event)" [ngClass]="{'ui-rating-cancel-hover':hoverCancel}"
             (mouseenter)="hoverCancel=true" (mouseleave)="hoverCancel=false"><a></a></div>
            <div class="ui-rating-star" *ngFor="#star of starsArray;#i=index" (click)="rate($event,i)"
             [ngClass]="{'ui-rating-star-on':(i < value)}"><a></a></div>
        </div>
    `
})
export class Rating {

    @Input() value: number;

    @Input() disabled: boolean;

    @Input() readonly: boolean;

    @Input() stars: number = 5;

    @Input() cancel: boolean = true;

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    @Output() onRate: EventEmitter<any> = new EventEmitter();

    @Output() onCancel: EventEmitter<any> = new EventEmitter();
    
    private starsArray: number[];
    
    private hoverCancel: boolean;

    ngOnInit() {
        this.starsArray = [];
        for(let i = 0; i < this.stars; i++) {
            this.starsArray[i] = i;
        }
    }
    
    rate(event, i: number): void {
        if(!this.readonly&&!this.disabled) {
            this.valueChange.next(i + 1);
            this.onRate.next({
                originalEvent: event,
                value: (i+1)
            });
        }        
    }
    
    clear(event): void {
        if(!this.readonly&&!this.disabled) {
            this.valueChange.next(null);
            this.onCancel.next(event);
        }
    }
}
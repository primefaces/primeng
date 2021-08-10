import { EventEmitter, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
export declare class Steps implements OnInit, OnDestroy {
    private router;
    private route;
    private cd;
    activeIndex: number;
    model: MenuItem[];
    readonly: boolean;
    style: any;
    styleClass: string;
    activeIndexChange: EventEmitter<any>;
    constructor(router: Router, route: ActivatedRoute, cd: ChangeDetectorRef);
    subscription: Subscription;
    ngOnInit(): void;
    itemClick(event: Event, item: MenuItem, i: number): void;
    isClickableRouterLink(item: MenuItem): boolean;
    isActive(item: MenuItem, index: number): boolean;
    ngOnDestroy(): void;
}
export declare class StepsModule {
}

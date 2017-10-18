import { ElementRef, OnDestroy, EventEmitter, AfterContentInit, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import { BlockableUI } from '../common/blockableui';
export declare class TabViewNav {
    tabs: TabPanel[];
    orientation: string;
    onTabClick: EventEmitter<any>;
    onTabCloseClick: EventEmitter<any>;
    getDefaultHeaderClass(tab: TabPanel): string;
    clickTab(event: any, tab: TabPanel): void;
    clickClose(event: any, tab: TabPanel): void;
}
export declare class TabPanel implements AfterContentInit, OnDestroy {
    viewContainer: ViewContainerRef;
    header: string;
    disabled: boolean;
    closable: boolean;
    headerStyle: any;
    headerStyleClass: string;
    leftIcon: string;
    rightIcon: string;
    cache: boolean;
    templates: QueryList<any>;
    contentTemplate: TemplateRef<any>;
    constructor(viewContainer: ViewContainerRef);
    closed: boolean;
    view: EmbeddedViewRef<any>;
    _selected: boolean;
    loaded: boolean;
    ngAfterContentInit(): void;
    selected: boolean;
    ngOnDestroy(): void;
}
export declare class TabView implements AfterContentInit, BlockableUI {
    el: ElementRef;
    orientation: string;
    style: any;
    styleClass: string;
    controlClose: boolean;
    tabPanels: QueryList<TabPanel>;
    onChange: EventEmitter<any>;
    onClose: EventEmitter<any>;
    initialized: boolean;
    tabs: TabPanel[];
    _activeIndex: number;
    _lazy: boolean;
    constructor(el: ElementRef);
    lazy: boolean;
    ngAfterContentInit(): void;
    initTabs(): void;
    open(event: Event, tab: TabPanel): void;
    close(event: Event, tab: TabPanel): void;
    closeTab(tab: TabPanel): void;
    findSelectedTab(): TabPanel;
    findTabIndex(tab: TabPanel): number;
    getBlockableElement(): HTMLElement;
    activeIndex: number;
}
export declare class TabViewModule {
}

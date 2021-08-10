import { ComponentFactoryResolver, ApplicationRef, Injector, Type, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
export declare class DialogService {
    private componentFactoryResolver;
    private appRef;
    private injector;
    dialogComponentRefMap: Map<DynamicDialogRef, ComponentRef<DynamicDialogComponent>>;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef, injector: Injector);
    open(componentType: Type<any>, config: DynamicDialogConfig): DynamicDialogRef;
    private appendDialogComponentToBody;
    private removeDialogComponentFromBody;
}

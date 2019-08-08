import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';

@Injectable()
export class DialogService {

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

    public open(componentType: Type<any>, config: DynamicDialogConfig) {
        const dialogRef = this.appendDialogComponentToBody(config, componentType);
        return dialogRef;
    }

    private appendDialogComponentToBody(config: DynamicDialogConfig, componentType: Type<any>) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);

        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));
        componentRef.instance.childComponentType = componentType;

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        const sub = dialogRef.onClose.subscribe(() => {
            this.removeDialogComponentFromBody(componentRef);
            sub.unsubscribe();
        });

        return dialogRef;
    }

    private removeDialogComponentFromBody(componentRef: ComponentRef<DynamicDialogComponent>) {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
    }
}

import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';

@Injectable()
export class DialogService {
    dialogComponentRefMap: Map<Type<any>, ComponentRef<DynamicDialogComponent>> = new Map();

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private appRef: ApplicationRef, private injector: Injector) { }

    public open(componentType: Type<any>, config: DynamicDialogConfig) {
        if (this.dialogComponentRefMap.has(componentType)) {
            return;
        }
        const dialogRef = this.appendDialogComponentToBody(config, componentType);

        this.dialogComponentRefMap.get(componentType).instance.childComponentType = componentType;

        return dialogRef;
    }

    private appendDialogComponentToBody(config: DynamicDialogConfig, componentType: Type<any>) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);

        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);

        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRefMap.get(componentType).instance.close();
        });

        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(componentType);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });

        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DynamicDialogComponent);
        const componentRef = componentFactory.create(new DynamicDialogInjector(this.injector, map));

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);

        this.dialogComponentRefMap.set(componentType, componentRef);

        return dialogRef;
    }

    private removeDialogComponentFromBody(componentType: Type<any>) {
        if (!componentType || !this.dialogComponentRefMap.has(componentType)) {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(componentType);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(componentType);
    }
}

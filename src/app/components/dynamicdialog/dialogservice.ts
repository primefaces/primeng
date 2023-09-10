import { Injectable, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef, Inject, createComponent } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DOCUMENT } from '@angular/common';
/**
 * Dynamic Dialog component methods.
 * @group Service
 */
@Injectable()
export class DialogService {
    dialogComponentRefMap: Map<DynamicDialogRef, ComponentRef<DynamicDialogComponent>> = new Map();

    constructor(private appRef: ApplicationRef, private injector: Injector, @Inject(DOCUMENT) private document: Document) {}
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {*} componentType - Dynamic component for content template.
     * @param {DynamicDialogConfig} config - DynamicDialog object.
     * @returns {DynamicDialogRef} DynamicDialog instance.
     * @group Method
     */
    public open(componentType: Type<any>, config: DynamicDialogConfig): DynamicDialogRef {
        const dialogRef = this.appendDialogComponentToBody(config);

        this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;

        return dialogRef;
    }

    private appendDialogComponentToBody(config: DynamicDialogConfig) {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);

        const dialogRef = new DynamicDialogRef();
        map.set(DynamicDialogRef, dialogRef);

        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRefMap.get(dialogRef).instance.close();
        });

        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });

        const componentRef = createComponent(DynamicDialogComponent, { environmentInjector: this.appRef.injector, elementInjector: new DynamicDialogInjector(this.injector, map) });

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        if (!config.appendTo || config.appendTo === 'body') {
            this.document.body.appendChild(domElem);
        } else {
            DomHandler.appendChild(domElem, config.appendTo);
        }

        this.dialogComponentRefMap.set(dialogRef, componentRef);

        return dialogRef;
    }

    private removeDialogComponentFromBody(dialogRef: DynamicDialogRef) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
      }
}

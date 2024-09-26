import { Injectable, ApplicationRef, Injector, Type, EmbeddedViewRef, ComponentRef, Inject, createComponent } from '@angular/core';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogComponent } from './dynamicdialog';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DOCUMENT } from '@angular/common';
import { ObjectUtils } from 'primeng/utils';
/**
 * Dynamic Dialog component methods.
 * @group Service
 */
@Injectable()
export class DialogService {
    dialogComponentRefMap: Map<DynamicDialogRef<any>, ComponentRef<DynamicDialogComponent>> = new Map();

    constructor(
        private appRef: ApplicationRef,
        private injector: Injector,
        @Inject(DOCUMENT) private document: Document
    ) {}
    /**
     * Displays the dialog using the dynamic dialog object options.
     * @param {*} componentType - Dynamic component for content template.
     * @param {DynamicDialogConfig} config - DynamicDialog object.
     * @returns {DynamicDialogRef} DynamicDialog instance.
     * @group Method
     */
    public open<T>(componentType: Type<T>, config: DynamicDialogConfig): DynamicDialogRef<T> {
        if (!this.duplicationPermission(componentType, config)) {
            return null;
        }

        const dialogRef = this.appendDialogComponentToBody<T>(config, componentType);

        this.dialogComponentRefMap.get(dialogRef).instance.childComponentType = componentType;

        return dialogRef;
    }
    /**
     * Returns the dynamic dialog component instance.
     * @param {ref} DynamicDialogRef - DynamicDialog instance.
     * @group Method
     */
    public getInstance(ref: DynamicDialogRef<any>) {
        return this.dialogComponentRefMap.get(ref).instance;
    }

    private appendDialogComponentToBody<T>(config: DynamicDialogConfig, componentType: Type<T>): DynamicDialogRef<T> {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);

        const dialogRef = new DynamicDialogRef<T>();
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

    private removeDialogComponentFromBody(dialogRef: DynamicDialogRef<any>) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        this.appRef.detachView(dialogComponentRef.hostView);
        dialogComponentRef.destroy();
        this.dialogComponentRefMap.delete(dialogRef);
    }

    private duplicationPermission(componentType: Type<any>, config: DynamicDialogConfig): boolean {
        if (config.duplicate) {
            return true;
        }
        let permission = true;
        for (const [key, value] of this.dialogComponentRefMap) {
            if (value.instance.childComponentType === componentType) {
                permission = false;
                break;
            }
        }
        return permission;
    }
}

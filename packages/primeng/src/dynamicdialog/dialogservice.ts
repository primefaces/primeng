import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentRef, EmbeddedViewRef, Inject, Injectable, Injector, Type, createComponent } from '@angular/core';
import { appendChild } from '@primeuix/utils';
import { DynamicDialog } from './dynamicdialog';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogInjector } from './dynamicdialog-injector';
import { DynamicDialogRef } from './dynamicdialog-ref';

/**
 * Dynamic Dialog component methods.
 * @group Service
 */
@Injectable()
export class DialogService {
    dialogComponentRefMap: Map<DynamicDialogRef<any>, ComponentRef<DynamicDialog>> = new Map();

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
    public open<T, DataType = any, InputValuesType extends Record<string, any> = {}>(componentType: Type<T>, config: DynamicDialogConfig<DataType, InputValuesType>): DynamicDialogRef<T> | null {
        if (!this.duplicationPermission(componentType, config)) {
            return null;
        }

        const dialogRef = this.appendDialogComponentToBody<T>(config, componentType);

        const componentRefInstance = this.dialogComponentRefMap.get(dialogRef);
        if (componentRefInstance) {
            componentRefInstance.instance.childComponentType = componentType;
            componentRefInstance.instance.inputValues = config.inputValues || {};
        }

        return dialogRef;
    }
    /**
     * Returns the dynamic dialog component instance.
     * @param {DynamicDialogRef} ref - DynamicDialog instance.
     * @group Method
     */
    public getInstance(ref: DynamicDialogRef<any>) {
        return this.dialogComponentRefMap.get(ref)?.instance;
    }

    private appendDialogComponentToBody<T>(config: DynamicDialogConfig, componentType: Type<T>): DynamicDialogRef<T> {
        const map = new WeakMap();
        map.set(DynamicDialogConfig, config);

        const dialogRef = new DynamicDialogRef<T>();
        map.set(DynamicDialogRef, dialogRef);

        const sub = dialogRef.onClose.subscribe(() => {
            this.dialogComponentRefMap.get(dialogRef)?.instance.close();
        });

        const destroySub = dialogRef.onDestroy.subscribe(() => {
            this.removeDialogComponentFromBody(dialogRef);
            destroySub.unsubscribe();
            sub.unsubscribe();
        });

        const componentRef = createComponent(DynamicDialog, {
            environmentInjector: this.appRef.injector,
            elementInjector: new DynamicDialogInjector(this.injector, map)
        });

        this.appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        if (!config.appendTo || config.appendTo === 'body') {
            this.document.body.appendChild(domElem);
        } else {
            appendChild(config.appendTo, domElem);
        }

        this.dialogComponentRefMap.set(dialogRef, componentRef);

        return dialogRef;
    }

    private removeDialogComponentFromBody(dialogRef: DynamicDialogRef<any>) {
        if (!dialogRef || !this.dialogComponentRefMap.has(dialogRef)) {
            return;
        }

        const dialogComponentRef = this.dialogComponentRefMap.get(dialogRef);
        if (dialogComponentRef) {
            this.appRef.detachView(dialogComponentRef.hostView);
            dialogComponentRef.destroy();
            dialogComponentRef.changeDetectorRef.detectChanges();
        }
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

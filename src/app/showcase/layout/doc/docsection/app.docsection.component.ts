import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppDocSectionTextComponent } from '../docsectiontext/app.docsectiontext.component';
import { Doc } from 'src/app/showcase/domain/doc';
import { AppDocApiTable } from '../docapitable/app.docapitable.component';
import { HostDirective } from '../hostdirective/host.directive';

interface Props {
    id: string;
    title: string;
    component: any;
    level?: number;
}

@Component({
    selector: 'app-docsection',
    templateUrl: './app.docsection.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocSectionsComponent {
    @Input() docs!: Doc[];

    @Input() apiDocs!: any[];

    currentDocIndex = -1;

    @ViewChild('Doc', { read: ViewContainerRef }) Doc: ViewContainerRef;

    @ViewChild(HostDirective, { static: true }) host!: HostDirective;

    constructor(private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        if (this.docs && this.docs.length) {
            for (let index = 0; index < this.docs.length; index++) {
                this.loadComponent();
            }
        }
        if (this.apiDocs && this.apiDocs.length) {
            for (let i = 0; i < this.apiDocs.length; i++) {
                this.loadApiDocComponent();
            }
        }

        this.cd.detectChanges();
    }

    loadComponent() {
        this.currentDocIndex = (this.currentDocIndex + 1) % this.docs.length;
        const newComponent: any = this.docs[this.currentDocIndex];

        const viewContainerRef = this.Doc;
        let component;
        if (newComponent.component !== undefined) {
            component = viewContainerRef.createComponent<Props>(newComponent.component);
            component.instance.id = newComponent.id;
            component.instance.title = newComponent.label;
        }
        if (!newComponent.component && newComponent.children) {
            for (let i = 0; i < newComponent.children.length; i++) {
                const children = newComponent.children[i];
                component = viewContainerRef.createComponent<Props>(children.component);
                component.instance.id = children.id;
                component.instance.title = children.label;

                if (component.instance.docsectiontext && i === 0) {
                    component.instance.docsectiontext.parentTitle = newComponent.label;
                    component.instance.docsectiontext.parentId = newComponent.id;
                }
            }
        }
    }

    loadApiDocComponent() {
        this.currentDocIndex = (this.currentDocIndex + 1) % this.apiDocs.length;
        const newComponent: any = this.apiDocs[this.currentDocIndex];
        const viewContainerRef = this.host.viewContainerRef;

        if (newComponent && newComponent.children) {
            for (let i = 0; i < newComponent.children.length; i++) {
                const child = newComponent.children[i];
                if (child.data && child.data.length) {
                    const componentRef = viewContainerRef.createComponent<AppDocApiTable>(child.component);
                    componentRef.instance.id = child.id;
                    componentRef.instance.description = child.description;
                    componentRef.instance.data = child.data;
                    componentRef.instance.label = child.label;
                    componentRef.instance.relatedProp = child.relatedProp;
                    if (i === 0) {
                        componentRef.instance.parentTitle = newComponent.label;
                        componentRef.instance.parentDescription = newComponent.description;
                        componentRef.instance.parentId = newComponent.id;
                    }
                }
            }
        }
    }
}

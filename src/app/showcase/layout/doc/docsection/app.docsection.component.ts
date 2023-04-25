import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AppDocSectionTextComponent } from '../docsectiontext/app.docsectiontext.component';
import { Doc } from 'src/app/showcase/domain/doc';

interface Props {
    id: string;
    title: string;
    component: any;
    level?: number;
}

@Component({
    selector: 'app-docsection',
    templateUrl: './app.docsection.component.html'
})
export class AppDocSectionsComponent {
    @Input() docs!: Doc[];

    currentDocIndex = -1;

    @ViewChild('Doc', { read: ViewContainerRef }) Doc: ViewContainerRef;

    constructor(private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        for (let index = 0; index < this.docs.length; index++) {
            this.loadComponent();
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
}

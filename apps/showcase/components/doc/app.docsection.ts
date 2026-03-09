import { Doc } from '@/domain/doc';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppDocApiTable } from './app.docapitable';
import { AppDocSectionText } from './app.docsectiontext';

@Component({
    selector: 'app-docsection',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, AppDocApiTable],
    template: `
        @if (docs && docs.length) {
            @for (doc of docs; track trackById($index, doc)) {
                <section class="py-6">
                    @if (!doc.component && doc.children) {
                        <app-docsectiontext [title]="doc.label" [id]="doc.id" [level]="2" [description]="doc?.description" />

                        @for (child of doc.children; track $index) {
                            @if (!child.component && child.children) {
                                <app-docsectiontext [title]="child.label" [id]="child.id" [level]="3" [description]="child?.description" />
                                @for (grandchild of child.children; track $index) {
                                    <app-docsectiontext [title]="grandchild.label" [id]="grandchild.id" [level]="4" [description]="grandchild?.description" />
                                    <ng-container *ngComponentOutlet="grandchild.component"></ng-container>
                                }
                            } @else {
                                <app-docsectiontext [title]="child.label" [id]="child.id" [level]="3" [description]="child?.description" />
                                <ng-container *ngComponentOutlet="child.component"></ng-container>
                            }
                        }
                    }

                    @if (doc.component && !doc.children) {
                        <app-docsectiontext [title]="doc.label" [id]="doc.id" [level]="2" [description]="doc?.description" />
                        @if (doc.data) {
                            <app-docapitable [id]="doc.id" [data]="doc.data"></app-docapitable>
                        }
                        @if (!doc.data) {
                            <ng-container *ngComponentOutlet="doc.component"></ng-container>
                        }
                    }
                </section>
            }
        }

        @if (apiDocs && apiDocs.length) {
            @for (doc of apiDocs; track trackById($index, doc)) {
                <section class="py-6">
                    @if (doc.children) {
                        <app-docsectiontext [title]="doc.label" [id]="doc.id" [description]="doc.description" [level]="2" />

                        @for (child of doc.children; track $index) {
                            <app-docapitable [id]="child.id" [label]="child.label" [data]="child.data" [description]="child.description" [relatedProp]="child.relatedProp" [level]="3" [isInterface]="child.isInterface" />
                        }
                    }
                </section>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocSection {
    @Input() docs!: Doc[];

    @Input() apiDocs!: any[];

    trackById(index: number, doc: any) {
        return doc.id || undefined;
    }
}

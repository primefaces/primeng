import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Doc } from 'src/app/showcase/domain/doc';

@Component({
    selector: 'app-docsection',
    template: `
        <ng-container *ngIf="docs && docs.length">
            <section class="py-4" *ngFor="let doc of docs">
                <ng-container *ngIf="!doc.component && doc.children">
                    <app-docsectiontext [title]="doc.label" [id]="doc.id" [level]="2" />

                    <ng-template ngFor [ngForOf]="doc.children" let-child>
                        <app-docsectiontext [title]="child.label" [id]="child.id" [level]="3" />
                        <ng-container *ngComponentOutlet="child.component"></ng-container>
                    </ng-template>
                </ng-container>

                <ng-container *ngIf="doc.component && !doc.children">
                    <app-docsectiontext [title]="doc.label" [id]="doc.id" [level]="2" />
                    <ng-container *ngComponentOutlet="doc.component"></ng-container>
                </ng-container>
            </section>
        </ng-container>

        <ng-container *ngIf="apiDocs && apiDocs.length">
            <section class="py-4" *ngFor="let doc of apiDocs">
                <ng-container *ngIf="doc.children">
                    <app-docsectiontext [title]="doc.label" [id]="doc.id" [description]="doc.description" [level]="2" />

                    <ng-template ngFor [ngForOf]="doc.children" let-child>
                        <app-docapitable [id]="child.id" [label]="child.label" [data]="child.data" [description]="child.description" [relatedProp]="child.relatedProp" [level]="3" [isInterface]="child.isInterface" />
                    </ng-template>
                </ng-container>
            </section>
        </ng-container>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocSectionsComponent {
    @Input() docs!: Doc[];

    @Input() apiDocs!: any[];
}

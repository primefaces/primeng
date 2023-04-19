import { Component, Input } from '@angular/core';
import { Doc } from 'src/app/showcase/domain/doc';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-docapisection',
    templateUrl: './app.docapisection.component.html'
})
export class AppDocApiSection {
    @Input() header!: string;

    @Input() docs!: Doc[];

    _docs: Doc[] = [];

    constructor(private location: Location, private router: Router) {}

    ngOnInit() {
        if (!this.router.url.includes('#api')) {
            this.location.go(this.location.path().split('#')[0]);
        }
        this.generateDocs();
    }

    generateDocs() {
        if (this.docs) {
            for (let i = 0; i < this.docs.length; i++) {
                const doc = this.docs[i];
                const _doc = {
                    ...doc,
                    id: `api.${doc.id}`
                };
                this._docs.push(_doc);
            }
        }
    }

    ngOnDestroy() {
        this.location.go(this.location.path().split('#')[0]);
    }
}

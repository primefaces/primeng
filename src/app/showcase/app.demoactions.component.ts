import { Component, NgModule, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-demoActions',
    template: `
        <div class="app-demoactions p-d-flex p-ai-end p-jc-end p-mt-3">
            <button pButton [disabled]="!stackblitz" class="p-button-text p-button-rounded p-button-plain p-button-lg p-button-icon-only" (click)="editOnStackblitz()">
                <svg role="img" viewBox="0 0 24 34" width="20" height="20" fill="var(--text-color-secondary)" style="display:block">
                    <path d="M0 19.9187087L9.87007874 19.9187087 4.12007874 34 23 13.9612393 13.0846457 13.9612393 18.7893701 0z"/>
                </svg>
            </button>
            <button pButton icon="pi pi-github" class="p-button-text p-button-rounded p-button-plain p-button-lg p-ml-2" (click)="viewOnGithub()"></button>
            <button pButton icon="pi pi-info-circle" class="p-button-text p-button-rounded p-button-plain p-button-lg p-ml-2" (click)="scrollToDocs()"></button>
        </div>
    `
})
export class AppDemoActions {

    @Input() github: string;

    @Input() stackblitz: string;

    scrollToDocs() {
        document.getElementsByClassName('documentation')[0].scrollIntoView({behavior: 'smooth'});
    }

    viewOnGithub() {
        window.open('https://github.com/primefaces/primeng/tree/master/src/app/showcase/components/' + this.github, '_blank');
    }

    editOnStackblitz() {
        window.open('https://stackblitz.com/edit/primeng-' + this.stackblitz, '_blank');
    }
}

@NgModule({
    imports: [ButtonModule],
    exports: [AppDemoActions],
    declarations: [AppDemoActions]
})
export class AppDemoActionsModule { }

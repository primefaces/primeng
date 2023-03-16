import { Component, Input, NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-demoActions',
    templateUrl: './app.demoactions.component.html'
})
export class AppDemoActions {
    @Input() github: string;

    @Input() stackblitz: string;

    constructor(private configService: AppConfigService) {}

    scrollToDocs() {
        document.getElementsByClassName('documentation')[0].scrollIntoView({ behavior: 'smooth' });
    }

    viewOnGithub() {
        window.open('https://github.com/primefaces/primeng/tree/master/src/app/showcase/components/' + this.github, '_blank');
    }

    viewOnFigma() {
        if (this.configService.config.dark) window.open('https://www.figma.com/file/LJBqVfMpK8xY6KR2KIc8RK/Preview-%7C-Dark-%7C-PrimeOne-2022-%7C-1.0.0?node-id=806%3A36648', '_blank');
        else window.open('https://www.figma.com/file/c3BuENd8nGcyPmn7ADieee/Preview-%7C-PrimeOne-2022-%7C-1.0.0?node-id=806%3A36648', '_blank');
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
export class AppDemoActionsModule {}

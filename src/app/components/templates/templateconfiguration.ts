import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
    forwardRef,
    signal
} from '@angular/core';
import { SharedModule } from 'primeng/api';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'template-configuration',
    template: `
        <div class="template-configuration-wrapper">
            <div class="template-configuration">
                <div class="template-configuration-screen">
                    <div class="template-configuration-screen-top">
                        <div class="template-configuration-screen-top-close template-configuration-screen-top-circle"></div>
                        <div class="template-configuration-screen-top-minimize template-configuration-screen-top-circle"></div>
                        <div class="template-configuration-screen-top-zoom template-configuration-screen-top-circle"></div>
                    </div>
                    <div class="template-configuration-screen-bottom">
                        <p>&gt; npm install -g angular-cli</p>
                        <p>&gt; ng new my-apollo-app</p>
                        <p>&gt; cd my-apollo-app</p>
                        <p>&gt; ng serve</p>
                        <img class="template-configuration-screen-bottom-logo" src="https://primefaces.org/cdn/primereact/images/templates/react-3d-logo.png" alt="Angular 3D Logo" />
                    </div>
                </div>
                <h3 class="template-configuration-title">{{ configurationData?.title }}</h3>
                <p class="template-configuration-description">{{ configurationData?.description }}</p>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateConfiguration {
    @Input() configurationData;
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
    exports: [TemplateConfiguration, SharedModule],
    declarations: [TemplateConfiguration]
})
export class TemplateConfigurationModule {}

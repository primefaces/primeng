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
    selector: 'template-youtube',
    template: `
        <div>
                youtube
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TemplateYoutube {
    
}

@NgModule({
    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
    exports: [TemplateYoutube, SharedModule],
    declarations: [TemplateYoutube]
})
export class TemplateYoutubeModule {}

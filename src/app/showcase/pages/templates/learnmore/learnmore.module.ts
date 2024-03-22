import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnMoreRoutingModule } from './learnmore-routing.module';
import { LearnMoreComponent } from './learnmore.component';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateFeaturesAnimationInlineModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimationinline';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
@NgModule({
    declarations: [LearnMoreComponent],
    imports: [
        CommonModule,
        LearnMoreRoutingModule,
        TemplateHeroModule,
        TemplateSeparatorModule,
        TemplateYoutubeModule,
        TemplateLicenseModule,
        TemplateFeaturesModule,
        TemplateFeaturesAnimationModule,
        TemplateConfigurationModule,
        TemplateRelatedModule,
        TemplateFeaturesAnimationInlineModule
    ]
})
export class LearnMoreModule {}

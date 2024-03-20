import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LearnMoreRoutingModule } from './learnmore-routing.module';
import { LearnMoreComponent } from './learnmore.component';
import { TemplateHeroModule } from 'src/app/components/templates/templatehero/templatehero';
import { TemplateSeparatorModule } from 'src/app/components/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/components/templates/templateyoutube';
import { TemplateLicenseModule } from 'src/app/components/templates/templatelicense';
import { TemplateFeaturesModule } from 'src/app/components/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/components/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateConfigurationModule } from 'src/app/components/templates/templateconfiguration';
import { TemplateRelatedModule } from 'src/app/components/templates/templaterelated';
import { TemplateFeaturesAnimationInlineModule } from 'src/app/components/templates/templatefeaturesanimation/templatefeaturesanimationinline';
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

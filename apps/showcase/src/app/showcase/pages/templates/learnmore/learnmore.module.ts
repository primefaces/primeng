import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateConfigurationModule } from '@layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from '@layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateFeaturesAnimationInlineModule } from '@layout/templates/templatefeaturesanimation/templatefeaturesanimationinline';
import { TemplateHeroModule } from '@layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from '@layout/templates/templatelicense';
import { TemplateRelatedModule } from '@layout/templates/templaterelated';
import { TemplateSeparatorModule } from '@layout/templates/templateseparator';
import { TemplateYoutubeModule } from '@layout/templates/templateyoutube';
import { LearnMoreRoutingModule } from './learnmore-routing.module';
import { LearnMoreComponent } from './learnmore.component';
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
        TemplateFeaturesAnimationInlineModule,
    ],
})
export class LearnMoreModule {}

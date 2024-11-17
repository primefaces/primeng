import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TemplateConfigurationModule } from '@/components/template/templateconfiguration';
import { TemplateFeaturesModule } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateFeaturesAnimationInlineModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimationinline';
import { TemplateHeroModule } from '@/components/template/templatehero/templatehero';
import { TemplateLicenseModule } from '@/components/template/templatelicense';
import { TemplateRelatedModule } from '@/components/template/templaterelated';
import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { TemplateYoutubeModule } from '@/components/template/templateyoutube';
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
        TemplateFeaturesAnimationInlineModule
    ]
})
export class LearnMoreModule {}

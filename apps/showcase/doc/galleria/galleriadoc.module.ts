import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { GalleriaModule } from 'primeng/galleria';
import { RadioButton } from 'primeng/radiobutton';
import { AccessibilityDoc } from './accessibilitydoc';
import { AdvancedDoc } from './advanceddoc';
import { AutoPlayDoc } from './autoplaydoc';
import { BasicDoc } from './basicdoc';
import { CaptionDoc } from './captiondoc';
import { ControlledDoc } from './controlleddoc';
import { FullScreenTemplateDoc } from './fullscreen/customcontentdoc';
import { WithoutThumbnailsDoc } from './fullscreen/withoutthumbnailsdoc';
import { WithThumbnailsDoc } from './fullscreen/withthumbnailsdoc';
import { ImportDoc } from './importdoc';
import { ClickEventDoc } from './indicator/clickeventdoc';
import { HoverEventDoc } from './indicator/hovereventdoc';
import { PositionedDoc } from './indicator/positioneddoc';
import { TemplateDoc } from './indicator/templatedoc';
import { HoverDoc } from './navigator/hoverdoc';
import { IndicatorsDoc } from './navigator/indicatorsdoc';
import { ItemThumbnailsDoc } from './navigator/itemthumbnailsdoc';
import { ItemWithoutThumbnailsDoc } from './navigator/itemwithoutthumbnailsdoc';
import { ResponsiveDoc } from './responsivedoc';
import { StyleDoc } from './styledoc';
import { ThumbnailDoc } from './thumbnaildoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, GalleriaModule, FormsModule, ButtonModule, RadioButton, Checkbox],
    declarations: [
        AdvancedDoc,
        AutoPlayDoc,
        BasicDoc,
        CaptionDoc,
        ControlledDoc,
        FullScreenTemplateDoc,
        WithoutThumbnailsDoc,
        WithThumbnailsDoc,
        ImportDoc,
        ClickEventDoc,
        HoverEventDoc,
        PositionedDoc,
        TemplateDoc,
        HoverDoc,
        IndicatorsDoc,
        ItemThumbnailsDoc,
        ItemWithoutThumbnailsDoc,
        ResponsiveDoc,
        StyleDoc,
        ThumbnailDoc,
        AccessibilityDoc
    ],
    exports: [AppDocModule]
})
export class GalleriaDocModule {}

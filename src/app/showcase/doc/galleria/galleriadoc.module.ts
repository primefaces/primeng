import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
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
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, GalleriaModule, FormsModule, ButtonModule, RadioButtonModule, CheckboxModule],
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

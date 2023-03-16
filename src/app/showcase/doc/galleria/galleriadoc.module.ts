import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { GalleriaAdvancedDemo } from './advanceddoc';
import { GalleriaAutoplayDemo } from './autoplaydoc';
import { GalleriaBasicDemo } from './basicdoc';
import { GalleriaCaptionDemo } from './captiondoc';
import { GalleriaControlledDemo } from './controlleddoc';
import { GalleriaFullScreenTemplateDemo } from './fullscreen/customcontentdoc';
import { FullScreenDoc } from './fullscreen/fullscreendoc';
import { GalleriaWithoutThumbnailsDemo } from './fullscreen/withoutthumbnailsdoc';
import { GalleriaWithThumbnailsDemo } from './fullscreen/withthumbnailsdoc';
import { ImportDoc } from './importdoc';
import { GalleriaIndicatorClickEventDemo } from './indicator/clickeventdoc';
import { GalleriaIndicatorHoverEventDemo } from './indicator/hovereventdoc';
import { IndicatorDoc } from './indicator/indicatordoc';
import { GalleriaIndicatorPositionedDemo } from './indicator/positioneddoc';
import { GalleriaIndicatorTemplateDemo } from './indicator/templatedoc';
import { HoverDoc } from './navigator/hoverdoc';
import { IndicatorsDoc } from './navigator/indicatorsdoc';
import { ItemThumbnailsDoc } from './navigator/itemthumbnailsdoc';
import { ItemWithoutThumbnailsDoc } from './navigator/itemwithoutthumbnailsdoc';
import { NavigatorDoc } from './navigator/navigatordoc';
import { PropsDoc } from './propsdoc';
import { GalleriaResponsiveDemo } from './responsivedoc';
import { StyleDoc } from './styledoc';
import { GalleriaThumbnailDemo } from './thumbnaildoc';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, AppDocModule, GalleriaModule, FormsModule, ButtonModule, RadioButtonModule, CheckboxModule],
    declarations: [
        GalleriaAdvancedDemo,
        GalleriaAutoplayDemo,
        GalleriaBasicDemo,
        GalleriaCaptionDemo,
        GalleriaControlledDemo,
        GalleriaFullScreenTemplateDemo,
        FullScreenDoc,
        GalleriaWithoutThumbnailsDemo,
        GalleriaWithThumbnailsDemo,
        ImportDoc,
        GalleriaIndicatorClickEventDemo,
        GalleriaIndicatorHoverEventDemo,
        IndicatorDoc,
        GalleriaIndicatorPositionedDemo,
        GalleriaIndicatorTemplateDemo,
        HoverDoc,
        IndicatorsDoc,
        ItemThumbnailsDoc,
        ItemWithoutThumbnailsDoc,
        NavigatorDoc,
        PropsDoc,
        GalleriaResponsiveDemo,
        StyleDoc,
        GalleriaThumbnailDemo
    ],
    exports: [AppDocModule]
})
export class GalleriaDocModule {}

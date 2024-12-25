import { BasicDoc } from '@/doc/icons/basicdoc';
import { ColorDoc } from '@/doc/icons/colordoc';
import { ConstantsDoc } from '@/doc/icons/constantsdoc';
import { DownloadDoc } from '@/doc/icons/downloaddoc';
import { FigmaDoc } from '@/doc/icons/figmadoc';
import { IconsDocModule } from '@/doc/icons/icons.module';
import { ImportDoc } from '@/doc/icons/importdoc';
import { ListDoc } from '@/doc/icons/listdoc';
import { SizeDoc } from '@/doc/icons/sizedoc';
import { SpinDoc } from '@/doc/icons/spindoc';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule, IconsDocModule],
    template: `
        <app-doc
            title="Angular Icon Library - PrimeNG"
            header="Icons"
            description="PrimeIcons is the default icon library of PrimeNG with over 250 open source icons developed by PrimeTek. PrimeIcons library is optional as PrimeNG components can use any icon with templating."
            [docs]="docs"
        ></app-doc>
    `,
    styleUrls: ['./iconsdemo.component.scss']
})
export class IconsDemo {
    docs = [
        {
            id: 'download',
            label: 'Download',
            component: DownloadDoc
        },
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'figma',
            label: 'Figma',
            component: FigmaDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        },
        {
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'color',
            label: 'Color',
            component: ColorDoc
        },
        {
            id: 'spin',
            label: 'Spin',
            component: SpinDoc
        },
        {
            id: 'constants',
            label: 'Constants',
            component: ConstantsDoc
        },
        {
            id: 'list',
            label: 'List',
            component: ListDoc
        }
    ];
}

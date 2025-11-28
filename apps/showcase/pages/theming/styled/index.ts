import { ReversedKeysDoc } from '@/doc/splitbutton/reversedkeysdoc';
import { ArchitectureDoc } from '@/doc/theming/styled/architecturedoc';
import { ColorsDoc } from '@/doc/theming/styled/colorsdoc';
import { ComponentDoc } from '@/doc/theming/styled/componentdoc';
import { DarkModeDoc } from '@/doc/theming/styled/darkmodedoc';
import { DefinePresetDoc } from '@/doc/theming/styled/definepresetdoc';
import { ColorSchemeDoc } from '@/doc/theming/styled/colorschemedoc';
import { DtDoc } from '@/doc/theming/styled/dtdoc';
import { ExtendDoc } from '@/doc/theming/styled/extenddoc';
import { FocusRingDoc } from '@/doc/theming/styled/focusringdoc';
import { FontDoc } from '@/doc/theming/styled/fontdoc';
import { FormsDoc } from '@/doc/theming/styled/formsdoc';
import { NoirDoc } from '@/doc/theming/styled/noirdoc';
import { OptionsDoc } from '@/doc/theming/styled/optionsdoc';
import { PaletteDoc } from '@/doc/theming/styled/palettedoc';
import { PresetsDoc } from '@/doc/theming/styled/presetsdoc';
import { PrimaryDoc } from '@/doc/theming/styled/primarydoc';
import { ResetDoc } from '@/doc/theming/styled/resetdoc';
import { ScaleDoc } from '@/doc/theming/styled/scaledoc';
import { ScopedTokensDoc } from '@/doc/theming/styled/scopedtokensdoc';
import { SpecificityDoc } from '@/doc/theming/styled/specificitydoc';
import { SurfaceDoc } from '@/doc/theming/styled/surfacedoc';
import { ThemeDoc } from '@/doc/theming/styled/themedoc';
import { UpdatePresetDoc } from '@/doc/theming/styled/updatepresetdoc';
import { UpdatePrimaryPaletteDoc } from '@/doc/theming/styled/updateprimarypalettedoc';
import { UpdateSurfacePaletteDoc } from '@/doc/theming/styled/updatesurfacepalettedoc';
import { UsePresetDoc } from '@/doc/theming/styled/usepresetdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc docTitle="Styled Mode" header="Styled Mode" description="Choose from a variety of pre-styled themes or develop your own." [docs]="docs" docType="page"></app-doc>`,
    imports: [AppDoc],
    standalone: true
})
export class ThemingStyledDemo {
    docs = [
        {
            id: 'architecture',
            label: 'Architecture',
            component: ArchitectureDoc
        },
        {
            id: 'configuration',
            label: 'Configuration API',
            children: [
                {
                    id: 'theme',
                    label: 'Theme',
                    component: ThemeDoc
                },
                {
                    id: 'options',
                    label: 'Options',
                    component: OptionsDoc
                }
            ]
        },
        {
            id: 'presets',
            label: 'Presets',
            component: PresetsDoc
        },
        {
            id: 'reserved',
            label: 'Reserved Keys',
            component: ReversedKeysDoc
        },
        {
            id: 'colors',
            label: 'Colors',
            component: ColorsDoc
        },
        {
            id: 'darkmode',
            label: 'Dark Mode',
            component: DarkModeDoc
        },
        {
            id: 'customization',
            label: 'Customization',
            children: [
                {
                    id: 'definepreset',
                    label: 'definePreset',
                    component: DefinePresetDoc
                },
                {
                    id: 'colorscheme',
                    label: 'Color Scheme',
                    component: ColorSchemeDoc
                },
                {
                    id: 'primary',
                    label: 'Primary',
                    component: PrimaryDoc
                },
                {
                    id: 'surface',
                    label: 'Surface',
                    component: SurfaceDoc
                },
                {
                    id: 'noir',
                    label: 'Noir',
                    component: NoirDoc
                },
                {
                    id: 'font',
                    label: 'Font',
                    component: FontDoc
                },
                {
                    id: 'forms',
                    label: 'Forms',
                    component: FormsDoc
                },
                {
                    id: 'focusring',
                    label: 'Focus Ring',
                    component: FocusRingDoc
                },
                {
                    id: 'component',
                    label: 'Component',
                    component: ComponentDoc
                },
                {
                    id: 'extend',
                    label: 'Extend',
                    component: ExtendDoc
                }
            ]
        },
        {
            id: 'scopedtokens',
            label: 'Scoped Tokens',
            component: ScopedTokensDoc
        },
        {
            id: 'utils',
            label: 'Utils',
            children: [
                {
                    id: 'usepreset',
                    label: 'usePreset',
                    component: UsePresetDoc
                },
                {
                    id: 'updatepreset',
                    label: 'updatePreset',
                    component: UpdatePresetDoc
                },
                {
                    id: 'updateprimarypalette',
                    label: 'updatePrimaryPalette',
                    component: UpdatePrimaryPaletteDoc
                },
                {
                    id: 'updatesurfacepalette',
                    label: 'updateSurfacePalette',
                    component: UpdateSurfacePaletteDoc
                },
                {
                    id: 'dt',
                    label: '$dt',
                    component: DtDoc
                },
                {
                    id: 'Palette',
                    label: 'palette',
                    component: PaletteDoc
                }
            ]
        },
        {
            id: 'csslayer',
            label: 'CSS Layer',
            children: [
                {
                    id: 'specificity',
                    label: 'Specificity',
                    component: SpecificityDoc
                },
                {
                    id: 'reset',
                    label: 'Reset',
                    component: ResetDoc
                }
            ]
        },
        {
            id: 'scale',
            label: 'Scale',
            component: ScaleDoc
        }
    ];
}

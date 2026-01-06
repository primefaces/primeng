import { AppDoc } from '@/components/doc/app.doc';
import { ReversedKeysDoc } from '@/doc/splitbutton/reversedkeys-doc';
import { ArchitectureDoc } from '@/doc/theming/styled/architecture-doc';
import { ColorsDoc } from '@/doc/theming/styled/colors-doc';
import { ColorSchemeDoc } from '@/doc/theming/styled/colorscheme-doc';
import { ComponentDoc } from '@/doc/theming/styled/component-doc';
import { DarkModeDoc } from '@/doc/theming/styled/darkmode-doc';
import { DefinePresetDoc } from '@/doc/theming/styled/definepreset-doc';
import { DtDoc } from '@/doc/theming/styled/dt-doc';
import { ExtendDoc } from '@/doc/theming/styled/extend-doc';
import { FocusRingDoc } from '@/doc/theming/styled/focusring-doc';
import { FontDoc } from '@/doc/theming/styled/font-doc';
import { FormsDoc } from '@/doc/theming/styled/forms-doc';
import { NoirDoc } from '@/doc/theming/styled/noir-doc';
import { OptionsDoc } from '@/doc/theming/styled/options-doc';
import { PaletteDoc } from '@/doc/theming/styled/palette-doc';
import { PresetsDoc } from '@/doc/theming/styled/presets-doc';
import { PrimaryDoc } from '@/doc/theming/styled/primary-doc';
import { ResetDoc } from '@/doc/theming/styled/reset-doc';
import { ScaleDoc } from '@/doc/theming/styled/scale-doc';
import { ScopedTokensDoc } from '@/doc/theming/styled/scopedtokens-doc';
import { SpecificityDoc } from '@/doc/theming/styled/specificity-doc';
import { SurfaceDoc } from '@/doc/theming/styled/surface-doc';
import { ThemeDoc } from '@/doc/theming/styled/theme-doc';
import { UpdatePresetDoc } from '@/doc/theming/styled/updatepreset-doc';
import { UpdatePrimaryPaletteDoc } from '@/doc/theming/styled/updateprimarypalette-doc';
import { UpdateSurfacePaletteDoc } from '@/doc/theming/styled/updatesurfacepalette-doc';
import { UsePresetDoc } from '@/doc/theming/styled/usepreset-doc';
import { Component } from '@angular/core';

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

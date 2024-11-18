import { ArchitectureDoc } from '@/doc/theming/architecturedoc';
import { CaseDoc } from '@/doc/theming/casedoc';
import { ColorsDoc } from '@/doc/theming/colorsdoc';
import { ComponentDoc } from '@/doc/theming/componentdoc';
import { DarkModeDoc } from '@/doc/theming/darkmodedoc';
import { DefinePresetDoc } from '@/doc/theming/definepresetdoc';
import { DtDoc } from '@/doc/theming/dtdoc';
import { FocusRingDoc } from '@/doc/theming/focusringdoc';
import { FontDoc } from '@/doc/theming/fontdoc';
import { FormsDoc } from '@/doc/theming/formsdoc';
import { LibrariesDoc } from '@/doc/theming/librariesdoc';
import { NoirDoc } from '@/doc/theming/noirdoc';
import { OptionsDoc } from '@/doc/theming/optionsdoc';
import { PaletteDoc } from '@/doc/theming/palettedoc';
import { PresetsDoc } from '@/doc/theming/presetsdoc';
import { PrimaryDoc } from '@/doc/theming/primarydoc';
import { ResetDoc } from '@/doc/theming/resetdoc';
import { ReversedKeysDoc } from '@/doc/theming/reversedkeysdoc';
import { ScaleDoc } from '@/doc/theming/scaledoc';
import { ScopedTokensDoc } from '@/doc/theming/scopedtokensdoc';
import { SpecificityDoc } from '@/doc/theming/specifitydoc';
import { SurfaceDoc } from '@/doc/theming/surfacedoc';
import { ThemeDoc } from '@/doc/theming/themedoc';
import { ThemingDocModule } from '@/doc/theming/themingdoc.module';
import { UpdatePresetDoc } from '@/doc/theming/updatepresetdoc';
import { UpdatePrimaryPaletteDoc } from '@/doc/theming/updateprimarypalettedoc';
import { UpdateSurfacePaletteDoc } from '@/doc/theming/updatesurfacepalettedoc';
import { UsePresetDoc } from '@/doc/theming/usepresetdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc docTitle="Theming - PrimeNG" header="Theming" description="Choose from a variety of pre-styled themes or develop your own." [docs]="docs"></app-doc>`,
    imports: [ThemingDocModule],
    standalone: true
})
export class ThemingDemo {
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
            id: 'casestyle',
            label: 'Case Style',
            component: CaseDoc
        },
        {
            id: 'reserved',
            label: 'Reserved Keys',
            component: ReversedKeysDoc
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
                    id: 'primary',
                    label: 'Primary',
                    component: PrimaryDoc
                },
                {
                    id: 'noir',
                    label: 'Noir',
                    component: NoirDoc
                },
                {
                    id: 'surface',
                    label: 'Surface',
                    component: SurfaceDoc
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
            id: 'csslayer',
            label: 'CSS Layer',
            description: 'The PrimeNG CSS layer only applies to styled mode when layering is enabled explicitly at theme configuration, in unstyled mode the built-in CSS classes are not included and as a result no layer is necessary.',
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
                },
                {
                    id: 'libraries',
                    label: 'Libraries',
                    component: LibrariesDoc
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

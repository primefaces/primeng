import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'color-scheme-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>A token can be defined per color scheme using <i>light</i> and <i>dark</i> properties of the <i>colorScheme</i> property. Each token can have specific values based on the current color scheme.</p>
            <app-code [code]="code1" [hideToggleCode]="true" [importCode]="true" [hideStackBlitz]="true"></app-code>
            <div class="font-bold my-4">Common Pitfall</div>
            <p>
                When customizing an existing preset, your token overrides may be ignored if you don't properly account for color scheme variations. If the original preset defines a token using the <i>colorScheme</i> property, but your customization
                only provides a direct value, your override will be ignored because the <i>colorScheme</i> property takes precedence over direct values and the system will continue using the preset's scheme-specific values. When customizing tokens
                that are not defined with <i>colorScheme</i> in the original preset, your customizations will be applied successfully regardless of how you structure them; whether direct or under colorScheme.
            </p>
            <app-code [code]="code2" [hideToggleCode]="true" [importCode]="true" [hideStackBlitz]="true"></app-code>
            <div class="font-bold my-4">Best Practices</div>
            <ul class="leading-normal list-disc list-inside mb-4">
                <li>Check how tokens are defined in the preset before customizing from the <a href="https://github.com/primefaces/primeuix/tree/main/packages/themes/src/presets" target="_blank" rel="noopener noreferrer">source</a>.</li>
                <li>Always maintain the same structure (direct value or colorScheme) as the original preset.</li>
                <li>Consider both light and dark mode values when overriding scheme-dependent tokens.</li>
            </ul>
            <app-code [code]="code3" [hideToggleCode]="true" [importCode]="true" [hideStackBlitz]="true"></app-code>
            <p class="my-4">This approach ensures your customizations will be applied correctly regardless of the user's selected color scheme.</p>
        </app-docsectiontext>
    `
})
export class ColorSchemeDoc {
    code1 = {
        typescript: `import { bootstrapApplication } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { AppComponent } from './app/app.component';

const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                //...
            },
            dark: {
                //...
            }
        }
    }
});

bootstrapApplication(AppComponent, {
    providers: [
        providePrimeNG({
            theme: {
                preset: MyPreset
            }
        })
    ]
});`
    };

    code2 = {
        typescript: `/* Fails as Aura defines highlight tokens in colorScheme */
const MyPreset = definePreset(Aura, {
    semantic: {
        highlight: {
            background: '{primary.50}',
            color: '{primary.700}',
        }
    }
});`
    };

    code3 = {
        typescript: `/* Works because highlight tokens are defined under colorScheme */
const MyPreset = definePreset(Aura, {
    semantic: {
        colorScheme: {
            light: {
                semantic: {
                    highlight: {
                        background: '{primary.50}',
                        color: '{primary.700}',
                    }
                }
            },
            dark: {
                semantic: {
                    highlight: {
                        background: '{primary.200}',
                        color: '{primary.900}',
                    }
                }
            }
        }
    }
});`
    };
}

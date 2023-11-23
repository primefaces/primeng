import { Component } from '@angular/core';

@Component({
    selector: 'palette-doc',
    template: `
        <app-docsectiontext>
            <p>Colors palette consists of 13 main colors where each color provides tints/shades from 50 to 900.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-6">
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-50); color: rgb(0, 0, 0);">primary-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-100); color: rgb(0, 0, 0);">primary-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-200); color: rgb(0, 0, 0);">primary-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-300); color: rgb(0, 0, 0);">primary-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-400); color: rgb(0, 0, 0);">primary-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-500); color: rgb(0, 0, 0);">primary-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-600); color: rgb(255, 255, 255);">primary-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-700); color: rgb(255, 255, 255);">primary-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-800); color: rgb(255, 255, 255);">primary-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--primary-900); color: rgb(255, 255, 255);">primary-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-50); color: rgb(0, 0, 0);">blue-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-100); color: rgb(0, 0, 0);">blue-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-200); color: rgb(0, 0, 0);">blue-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-300); color: rgb(0, 0, 0);">blue-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-400); color: rgb(0, 0, 0);">blue-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-500); color: rgb(0, 0, 0);">blue-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-600); color: rgb(255, 255, 255);">blue-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-700); color: rgb(255, 255, 255);">blue-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-800); color: rgb(255, 255, 255);">blue-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--blue-900); color: rgb(255, 255, 255);">blue-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-50); color: rgb(0, 0, 0);">green-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-100); color: rgb(0, 0, 0);">green-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-200); color: rgb(0, 0, 0);">green-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-300); color: rgb(0, 0, 0);">green-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-400); color: rgb(0, 0, 0);">green-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-500); color: rgb(0, 0, 0);">green-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-600); color: rgb(255, 255, 255);">green-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-700); color: rgb(255, 255, 255);">green-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-800); color: rgb(255, 255, 255);">green-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--green-900); color: rgb(255, 255, 255);">green-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-50); color: rgb(0, 0, 0);">yellow-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-100); color: rgb(0, 0, 0);">yellow-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-200); color: rgb(0, 0, 0);">yellow-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-300); color: rgb(0, 0, 0);">yellow-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-400); color: rgb(0, 0, 0);">yellow-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-500); color: rgb(0, 0, 0);">yellow-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-600); color: rgb(255, 255, 255);">yellow-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-700); color: rgb(255, 255, 255);">yellow-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-800); color: rgb(255, 255, 255);">yellow-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--yellow-900); color: rgb(255, 255, 255);">yellow-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-50); color: rgb(0, 0, 0);">cyan-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-100); color: rgb(0, 0, 0);">cyan-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-200); color: rgb(0, 0, 0);">cyan-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-300); color: rgb(0, 0, 0);">cyan-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-400); color: rgb(0, 0, 0);">cyan-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-500); color: rgb(0, 0, 0);">cyan-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-600); color: rgb(255, 255, 255);">cyan-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-700); color: rgb(255, 255, 255);">cyan-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-800); color: rgb(255, 255, 255);">cyan-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--cyan-900); color: rgb(255, 255, 255);">cyan-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-50); color: rgb(0, 0, 0);">pink-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-100); color: rgb(0, 0, 0);">pink-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-200); color: rgb(0, 0, 0);">pink-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-300); color: rgb(0, 0, 0);">pink-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-400); color: rgb(0, 0, 0);">pink-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-500); color: rgb(0, 0, 0);">pink-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-600); color: rgb(255, 255, 255);">pink-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-700); color: rgb(255, 255, 255);">pink-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-800); color: rgb(255, 255, 255);">pink-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--pink-900); color: rgb(255, 255, 255);">pink-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-50); color: rgb(0, 0, 0);">indigo-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-100); color: rgb(0, 0, 0);">indigo-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-200); color: rgb(0, 0, 0);">indigo-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-300); color: rgb(0, 0, 0);">indigo-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-400); color: rgb(0, 0, 0);">indigo-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-500); color: rgb(0, 0, 0);">indigo-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-600); color: rgb(255, 255, 255);">indigo-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-700); color: rgb(255, 255, 255);">indigo-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-800); color: rgb(255, 255, 255);">indigo-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--indigo-900); color: rgb(255, 255, 255);">indigo-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-50); color: rgb(0, 0, 0);">teal-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-100); color: rgb(0, 0, 0);">teal-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-200); color: rgb(0, 0, 0);">teal-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-300); color: rgb(0, 0, 0);">teal-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-400); color: rgb(0, 0, 0);">teal-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-500); color: rgb(0, 0, 0);">teal-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-600); color: rgb(255, 255, 255);">teal-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-700); color: rgb(255, 255, 255);">teal-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-800); color: rgb(255, 255, 255);">teal-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--teal-900); color: rgb(255, 255, 255);">teal-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-50); color: rgb(0, 0, 0);">orange-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-100); color: rgb(0, 0, 0);">orange-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-200); color: rgb(0, 0, 0);">orange-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-300); color: rgb(0, 0, 0);">orange-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-400); color: rgb(0, 0, 0);">orange-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-500); color: rgb(0, 0, 0);">orange-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-600); color: rgb(255, 255, 255);">orange-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-700); color: rgb(255, 255, 255);">orange-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-800); color: rgb(255, 255, 255);">orange-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--orange-900); color: rgb(255, 255, 255);">orange-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-50); color: rgb(0, 0, 0);">bluegray-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-100); color: rgb(0, 0, 0);">bluegray-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-200); color: rgb(0, 0, 0);">bluegray-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-300); color: rgb(0, 0, 0);">bluegray-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-400); color: rgb(0, 0, 0);">bluegray-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-500); color: rgb(0, 0, 0);">bluegray-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-600); color: rgb(255, 255, 255);">bluegray-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-700); color: rgb(255, 255, 255);">bluegray-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-800); color: rgb(255, 255, 255);">bluegray-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--bluegray-900); color: rgb(255, 255, 255);">bluegray-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-50); color: rgb(0, 0, 0);">purple-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-100); color: rgb(0, 0, 0);">purple-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-200); color: rgb(0, 0, 0);">purple-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-300); color: rgb(0, 0, 0);">purple-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-400); color: rgb(0, 0, 0);">purple-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-500); color: rgb(0, 0, 0);">purple-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-600); color: rgb(255, 255, 255);">purple-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-700); color: rgb(255, 255, 255);">purple-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-800); color: rgb(255, 255, 255);">purple-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--purple-900); color: rgb(255, 255, 255);">purple-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-50); color: rgb(0, 0, 0);">red-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-100); color: rgb(0, 0, 0);">red-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-200); color: rgb(0, 0, 0);">red-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-300); color: rgb(0, 0, 0);">red-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-400); color: rgb(0, 0, 0);">red-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-500); color: rgb(0, 0, 0);">red-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-600); color: rgb(255, 255, 255);">red-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-700); color: rgb(255, 255, 255);">red-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-800); color: rgb(255, 255, 255);">red-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--red-900); color: rgb(255, 255, 255);">red-900</div>
                </div>
                <div class="flex flex-column">
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-50); color: rgb(0, 0, 0);">gray-50</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-100); color: rgb(0, 0, 0);">gray-100</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-200); color: rgb(0, 0, 0);">gray-200</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-300); color: rgb(0, 0, 0);">gray-300</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-400); color: rgb(0, 0, 0);">gray-400</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-500); color: rgb(0, 0, 0);">gray-500</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-600); color: rgb(255, 255, 255);">gray-600</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-700); color: rgb(255, 255, 255);">gray-700</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-800); color: rgb(255, 255, 255);">gray-800</div>
                    <div class="w-18rem flex align-items-center p-3 font-bold" style="background-color: var(--gray-900); color: rgb(255, 255, 255);">gray-900</div>
                </div>
            </div>
        </div>
    `
})
export class PaletteDoc {

}

import { Component } from '@angular/core';

@Component({
    selector: 'palette-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>Colors palette consists of 13 main colors where each color provides tints/shades from 50 to 900.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-12">
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-50); color: rgb(0, 0, 0);">primary-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-100); color: rgb(0, 0, 0);">primary-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-200); color: rgb(0, 0, 0);">primary-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-300); color: rgb(0, 0, 0);">primary-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-400); color: rgb(0, 0, 0);">primary-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-500); color: rgb(0, 0, 0);">primary-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-600); color: rgb(255, 255, 255);">primary-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-700); color: rgb(255, 255, 255);">primary-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-800); color: rgb(255, 255, 255);">primary-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-primary-900); color: rgb(255, 255, 255);">primary-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-50); color: rgb(0, 0, 0);">blue-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-100); color: rgb(0, 0, 0);">blue-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-200); color: rgb(0, 0, 0);">blue-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-300); color: rgb(0, 0, 0);">blue-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-400); color: rgb(0, 0, 0);">blue-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-500); color: rgb(0, 0, 0);">blue-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-600); color: rgb(255, 255, 255);">blue-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-700); color: rgb(255, 255, 255);">blue-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-800); color: rgb(255, 255, 255);">blue-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-blue-900); color: rgb(255, 255, 255);">blue-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-50); color: rgb(0, 0, 0);">green-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-100); color: rgb(0, 0, 0);">green-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-200); color: rgb(0, 0, 0);">green-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-300); color: rgb(0, 0, 0);">green-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-400); color: rgb(0, 0, 0);">green-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-500); color: rgb(0, 0, 0);">green-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-600); color: rgb(255, 255, 255);">green-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-700); color: rgb(255, 255, 255);">green-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-800); color: rgb(255, 255, 255);">green-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-green-900); color: rgb(255, 255, 255);">green-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-50); color: rgb(0, 0, 0);">yellow-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-100); color: rgb(0, 0, 0);">yellow-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-200); color: rgb(0, 0, 0);">yellow-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-300); color: rgb(0, 0, 0);">yellow-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-400); color: rgb(0, 0, 0);">yellow-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-500); color: rgb(0, 0, 0);">yellow-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-600); color: rgb(255, 255, 255);">yellow-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-700); color: rgb(255, 255, 255);">yellow-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-800); color: rgb(255, 255, 255);">yellow-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-yellow-900); color: rgb(255, 255, 255);">yellow-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-50); color: rgb(0, 0, 0);">cyan-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-100); color: rgb(0, 0, 0);">cyan-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-200); color: rgb(0, 0, 0);">cyan-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-300); color: rgb(0, 0, 0);">cyan-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-400); color: rgb(0, 0, 0);">cyan-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-500); color: rgb(0, 0, 0);">cyan-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-600); color: rgb(255, 255, 255);">cyan-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-700); color: rgb(255, 255, 255);">cyan-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-800); color: rgb(255, 255, 255);">cyan-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-cyan-900); color: rgb(255, 255, 255);">cyan-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-50); color: rgb(0, 0, 0);">pink-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-100); color: rgb(0, 0, 0);">pink-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-200); color: rgb(0, 0, 0);">pink-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-300); color: rgb(0, 0, 0);">pink-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-400); color: rgb(0, 0, 0);">pink-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-500); color: rgb(0, 0, 0);">pink-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-600); color: rgb(255, 255, 255);">pink-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-700); color: rgb(255, 255, 255);">pink-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-800); color: rgb(255, 255, 255);">pink-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-pink-900); color: rgb(255, 255, 255);">pink-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-50); color: rgb(0, 0, 0);">indigo-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-100); color: rgb(0, 0, 0);">indigo-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-200); color: rgb(0, 0, 0);">indigo-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-300); color: rgb(0, 0, 0);">indigo-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-400); color: rgb(0, 0, 0);">indigo-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-500); color: rgb(0, 0, 0);">indigo-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-600); color: rgb(255, 255, 255);">indigo-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-700); color: rgb(255, 255, 255);">indigo-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-800); color: rgb(255, 255, 255);">indigo-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-indigo-900); color: rgb(255, 255, 255);">indigo-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-50); color: rgb(0, 0, 0);">teal-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-100); color: rgb(0, 0, 0);">teal-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-200); color: rgb(0, 0, 0);">teal-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-300); color: rgb(0, 0, 0);">teal-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-400); color: rgb(0, 0, 0);">teal-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-500); color: rgb(0, 0, 0);">teal-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-600); color: rgb(255, 255, 255);">teal-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-700); color: rgb(255, 255, 255);">teal-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-800); color: rgb(255, 255, 255);">teal-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-teal-900); color: rgb(255, 255, 255);">teal-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-50); color: rgb(0, 0, 0);">orange-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-100); color: rgb(0, 0, 0);">orange-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-200); color: rgb(0, 0, 0);">orange-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-300); color: rgb(0, 0, 0);">orange-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-400); color: rgb(0, 0, 0);">orange-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-500); color: rgb(0, 0, 0);">orange-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-600); color: rgb(255, 255, 255);">orange-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-700); color: rgb(255, 255, 255);">orange-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-800); color: rgb(255, 255, 255);">orange-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-orange-900); color: rgb(255, 255, 255);">orange-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-50); color: rgb(0, 0, 0);">purple-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-100); color: rgb(0, 0, 0);">purple-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-200); color: rgb(0, 0, 0);">purple-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-300); color: rgb(0, 0, 0);">purple-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-400); color: rgb(0, 0, 0);">purple-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-500); color: rgb(0, 0, 0);">purple-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-600); color: rgb(255, 255, 255);">purple-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-700); color: rgb(255, 255, 255);">purple-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-800); color: rgb(255, 255, 255);">purple-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-purple-900); color: rgb(255, 255, 255);">purple-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-50); color: rgb(0, 0, 0);">red-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-100); color: rgb(0, 0, 0);">red-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-200); color: rgb(0, 0, 0);">red-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-300); color: rgb(0, 0, 0);">red-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-400); color: rgb(0, 0, 0);">red-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-500); color: rgb(0, 0, 0);">red-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-600); color: rgb(255, 255, 255);">red-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-700); color: rgb(255, 255, 255);">red-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-800); color: rgb(255, 255, 255);">red-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-red-900); color: rgb(255, 255, 255);">red-900</div>
                </div>
                <div class="flex flex-col">
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-50); color: rgb(0, 0, 0);">gray-50</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-100); color: rgb(0, 0, 0);">gray-100</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-200); color: rgb(0, 0, 0);">gray-200</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-300); color: rgb(0, 0, 0);">gray-300</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-400); color: rgb(0, 0, 0);">gray-400</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-500); color: rgb(0, 0, 0);">gray-500</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-600); color: rgb(255, 255, 255);">gray-600</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-700); color: rgb(255, 255, 255);">gray-700</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-800); color: rgb(255, 255, 255);">gray-800</div>
                    <div class="w-72 flex items-center p-4 font-bold" style="background-color: var(--p-gray-900); color: rgb(255, 255, 255);">gray-900</div>
                </div>
            </div>
        </div>
    `
})
export class PaletteDoc {}

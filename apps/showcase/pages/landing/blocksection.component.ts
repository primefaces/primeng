import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TagModule } from 'primeng/tag';

@Component({
    selector: 'block-section',
    standalone: true,
    imports: [CommonModule, TagModule],
    template: `
        <section id="blocks-section" class="landing-blocks pt-18 overflow-hidden">
            <div class="section-header relative z-30 flex items-center justify-center gap-3.5">PrimeBlocks</div>
            <p class="section-detail relative z-30">490+ ready to copy-paste UI blocks to build spectacular applications in no time.</p>
            <div class="flex justify-center mt-5 relative z-30">
                <a href="https://primeblocks.org" target="_blank" class="linkbox linkbox-primary">
                    <span class="text-sm">Explore All</span>
                    <i class="pi pi-arrow-right ms-2"></i>
                </a>
            </div>
            <section class="prime-blocks blocks-animation flex justify-center items-center flex-col">
                <div class="flex">
                    <div class="prime-block flex self-stretch p-1">
                        <div class="block-sidebar w-1/12 p-3.5">
                            <div class="logo">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" alt="block logo" />
                            </div>
                            <div class="sidebar-menu mt-7">
                                <div class="bar w-8/12 my-3.5"></div>
                                <div class="bar w-9/12 my-3.5"></div>
                                <div class="bar w-7/12 my-3.5"></div>
                                <div class="bar w-6/12 my-3.5"></div>
                                <div class="bar w-9/12 my-3.5"></div>
                            </div>
                        </div>
                        <div class="block-content flex-1 p-5 flex flex-col">
                            <div class="bar w-1/12"></div>
                            <div class="block-main mt-5 h-full flex justify-center items-center flex-col">
                                <div class="flex justify-between">
                                    <div class="block-item w-21">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar w-7 mt-2"></div>
                                                <div class="bar w-14 mt-3.5"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item block-item-active animation-1 mx-3.5 w-21">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar w-7 mt-2"></div>
                                                <div class="bar w-14 mt-3.5"></div>
                                            </div>
                                            <div>
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item w-21">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar w-7 mt-2"></div>
                                                <div class="bar w-14 mt-3.5"></div>
                                            </div>
                                            <div>
                                                <div class="circle circle-highligh"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex justify-between mt-3.5">
                                    <div class="block-item w-21">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar w-7 mt-2"></div>
                                                <div class="bar w-14 mt-3.5"></div>
                                            </div>
                                            <div>
                                                <div class="circle circle-highligh"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item mx-2.5 w-6rem">
                                        <div class="flex justify-content-between">
                                            <div>
                                                <div class="bar w-2rem mt-2"></div>
                                                <div class="bar w-4rem mt-2.5"></div>
                                            </div>
                                            <div>
                                                <div class="circle"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item mx-3.5 w-21">
                                        <div class="flex justify-between">
                                            <div>
                                                <div class="bar w-7 mt-2"></div>
                                                <div class="bar w-14 mt-3.5"></div>
                                            </div>
                                            <div>
                                                <div class="circle circle-highligh"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex -ml-20">
                    <div class="prime-block p-1 flex self-stretch flex-col">
                        <div class="block-header py-3.5 px-5 flex justify-between items-center">
                            <div class="logo pr-7">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" alt="block logo" />
                            </div>
                            <div class="flex-auto sidebar-menu flex">
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                            </div>
                            <div class="circle circle-highlight"></div>
                        </div>
                        <div class="block-content flex-1 p-5 flex flex-col">
                            <div class="bar w-1/12"></div>
                            <div class="block-main mt-5 h-full flex justify-center items-center flex-col">
                                <div class="flex justify-between">
                                    <div class="block-item w-14">
                                        <div class="bar w-7"></div>
                                        <span class="text my-2">26 %</span>
                                        <div class="box box-orange"></div>
                                    </div>
                                    <div class="block-item block-item-active animation-2 ml-3.5 mr-3.5 w-14">
                                        <div class="bar w-3.5"></div>
                                        <span class="text my-2">6 %</span>
                                        <div class="box box-pink"></div>
                                    </div>
                                    <div class="block-item mr-3.5 w-14">
                                        <div class="bar w-14"></div>
                                        <span class="text my-2">62 %</span>
                                        <div class="box box-green"></div>
                                    </div>
                                    <div class="block-item w-14">
                                        <div class="bar w-7"></div>
                                        <span class="text my-2">39 %</span>
                                        <div class="box box-blue"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prime-block flex self-stretch p-1">
                        <div class="block-sidebar p-3.5">
                            <div class="logo">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-2.svg" alt="block logo" />
                            </div>
                            <div class="sidebar-menu mt-7">
                                <div class="circle my-3.5"></div>
                                <div class="circle my-3.5"></div>
                                <div class="circle my-3.5"></div>
                            </div>
                        </div>
                        <div class="block-sidebar-list px-5">
                            <div class="bar w-7 my-3.5"></div>
                            <div class="bar w-11 my-3.5"></div>
                            <div class="bar w-7 my-3.5"></div>
                            <div class="bar w-7 my-3.5"></div>
                            <div class="bar w-3.5 my-3.5"></div>
                            <div class="bar w-11 my-3.5"></div>
                            <div class="bar w-11 my-3.5"></div>
                            <div class="bar w-7 my-3.5"></div>
                        </div>
                        <div class="block-content flex-1 my-7 mx-5 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col px-2">
                                <div class="flex justify-between">
                                    <div class="block-item w-3/12 flex justify-between flex-col">
                                        <div class="bar w-full"></div>
                                        <div class="flex items-center mt-3.5">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar w-7"></div>
                                        </div>
                                        <div class="bar bar-button w-14 mt-5"></div>
                                    </div>
                                    <div class="block-item block-item-active animation-3 mx-3.5 w-3/12 flex justify-between flex-col">
                                        <div class="bar w-full"></div>
                                        <div class="flex items-center mt-3.5">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar w-7"></div>
                                        </div>
                                        <div class="flex items-center mt-3.5">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar w-11"></div>
                                        </div>
                                        <div class="bar bar-button w-14 mt-5"></div>
                                    </div>
                                    <div class="block-item w-3/12 flex justify-between flex-col">
                                        <div class="bar w-full"></div>
                                        <div class="flex items-center mt-3.5">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar w-7"></div>
                                        </div>
                                        <div class="flex items-center mt-3.5">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar w-7"></div>
                                        </div>
                                        <div class="flex items-center mt-3.5">
                                            <div class="circle circle-small circle-highlight mr-2"></div>
                                            <div class="bar w-7"></div>
                                        </div>
                                        <div class="bar bar-button w-14 mt-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex -mr-20">
                    <div class="prime-block flex self-stretch p-1">
                        <div class="block-sidebar w-1/12 p-3.5">
                            <div class="logo">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" alt="block logo" />
                            </div>
                            <div class="sidebar-menu mt-7">
                                <div class="bar w-8/12 my-3.5"></div>
                                <div class="bar w-9/12 my-3.5"></div>
                                <div class="bar w-7/12 my-3.5"></div>
                                <div class="bar w-6/12 my-3.5"></div>
                                <div class="bar w-9/12 my-3.5"></div>
                            </div>
                        </div>
                        <div class="block-content flex-1 p-5 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col">
                                <div class="bar w-3/12 mb-3.5"></div>
                                <div class="bar w-4/12 mb-7"></div>
                                <div class="flex justify-between">
                                    <div class="block-item w-21 p-0">
                                        <div class="block-image"></div>
                                        <div class="p-2">
                                            <div>
                                                <div class="bar w-14 my-2"></div>
                                                <div class="bar w-7 mb-2"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight circle-medium"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item block-item-active mx-3.5 animation-1 w-21 p-0">
                                        <div class="block-image"></div>
                                        <div class="p-2">
                                            <div>
                                                <div class="bar w-14 my-2"></div>
                                                <div class="bar w-7 mb-2"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight circle-medium"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-item w-21 p-0">
                                        <div class="block-image"></div>
                                        <div class="p-2">
                                            <div>
                                                <div class="bar w-14 my-2"></div>
                                                <div class="bar w-7 mb-2"></div>
                                            </div>
                                            <div>
                                                <div class="flex-1">
                                                    <div class="circle circle-highlight circle-medium"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="prime-block flex self-stretch p-1">
                        <div class="block-sidebar p-3.5">
                            <div class="logo">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-2.svg" alt="block logo" />
                            </div>
                            <div class="sidebar-menu mt-7">
                                <div class="circle my-3.5"></div>
                                <div class="circle my-3.5"></div>
                                <div class="circle my-3.5"></div>
                            </div>
                        </div>
                        <div class="block-sidebar-list px-5">
                            <div class="bar w-7 my-3.5"></div>
                            <div class="bar w-11 my-3.5"></div>
                            <div class="bar w-7 my-3.5"></div>
                            <div class="bar w-7 my-3.5"></div>
                            <div class="bar w-3.5 my-3.5"></div>
                            <div class="bar w-11 my-3.5"></div>
                            <div class="bar w-11 my-3.5"></div>
                            <div class="bar w-7 my-3.5"></div>
                        </div>
                        <div class="block-content flex-1 my-7 mx-5 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col px-2">
                                <div class="flex justify-between">
                                    <div class="block-item block-item-table block-item-active animation-1 flex">
                                        <div class="bar w-11 mx-3.5"></div>
                                        <div class="bar w-11 mx-3.5"></div>
                                        <div class="bar w-11 mx-3.5"></div>
                                        <div class="bar w-11 mx-3.5"></div>
                                    </div>
                                </div>
                                <div class="block-item block-item-col flex">
                                    <div class="flex">
                                        <div class="circle circle-small circle-highlight -mr-1"></div>
                                        <div class="bar w-11 mx-3.5"></div>
                                    </div>
                                    <div class="bar w-11 mx-3.5"></div>
                                    <div class="bar w-11 mx-3.5"></div>
                                    <div class="bar w-11 mx-3.5"></div>
                                </div>
                                <div class="block-item block-item-col flex">
                                    <div class="flex">
                                        <div class="circle circle-small circle-highlight -mr-1"></div>
                                        <div class="bar w-11 mx-3.5"></div>
                                    </div>
                                    <div class="bar w-11 mx-3.5"></div>
                                    <div class="bar w-11 mx-3.5"></div>
                                    <div class="bar w-11 mx-3.5"></div>
                                </div>
                                <div class="block-item block-item-col flex">
                                    <div class="flex">
                                        <div class="circle circle-small circle-highlight -mr-1"></div>
                                        <div class="bar w-11 mx-3.5"></div>
                                    </div>
                                    <div class="bar w-11 mx-3.5"></div>
                                    <div class="bar w-11 mx-3.5"></div>
                                    <div class="bar w-11 mx-3.5"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <div class="prime-block p-1 flex self-stretch flex-col">
                        <div class="block-header py-3.5 px-5 flex justify-between items-center">
                            <div class="logo pr-7">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/blocks/logo-1.svg" alt="block logo" />
                            </div>
                            <div class="flex-auto sidebar-menu flex">
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                                <div class="bar w-7 mx-2"></div>
                            </div>
                            <div class="circle"></div>
                        </div>
                        <div class="block-content flex-1 p-5 flex flex-col">
                            <div class="block-main h-full flex justify-center items-center flex-col">
                                <div class="block-item block-item-active animation-2 mx-3.5 w-28 text-center flex flex-col items-center overflow-visible">
                                    <div>
                                        <img src="https://primefaces.org/cdn/primevue/images/landing/blocks/question.svg" alt="question mark" />
                                    </div>
                                    <div class="bar w-7 mt-2"></div>
                                    <div class="bar w-21 mt-2"></div>
                                    <div class="bar w-14 mt-2"></div>
                                    <div class="flex">
                                        <div class="bar bar-highlight bar-button w-14 mr-2 mt-5"></div>
                                        <div class="bar bar-button w-14 mr-2 mt-5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    `
})
export class BlockSectionComponent {}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <div class="doc-intro">
                <h1>Meet the Team</h1>
                <p>
                    <a href="https://www.primetek.com.tr" class="text-primary font-medium hover:underline"> PrimeTek </a>
                    is a world renowned vendor of popular UI Component suites including
                    <a href="https://primefaces.org" class="text-primary font-medium hover:underline"> PrimeFaces </a>
                    ,
                    <a href="https://primeng.org" class="text-primary font-medium hover:underline"> PrimeNG </a>
                    ,
                    <a href="https://primereact.org" class="text-primary font-medium hover:underline"> PrimeReact </a>
                    and
                    <a href="https://primevue.org" class="text-primary font-medium hover:underline"> PrimeVue </a>
                    . All the members in our team are full time employees of PrimeTek who share the same passion and vision for open source to create awesome UI libraries.
                </p>
            </div>

            <div class="card p-20">
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-20">
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/cagatay.jpg" class="rounded-full mb-6" alt="Cagatay Civici" />
                        <span class="mb-2 text-xl font-bold text-center">Çağatay Çivici</span>
                        <span class="text-center">Founder</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/mert.jpg" class="rounded-full mb-6" alt="Mert Sincan" />
                        <span class="mb-2 text-xl font-bold text-center">Mert Sincan</span>
                        <span class="text-center">CTO</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/onur.jpg" class="rounded-full mb-6" alt="Onur Şentüre" />
                        <span class="mb-2 text-xl font-bold text-center">Onur Şentüre</span>
                        <span class="text-center">Design Lead</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/dilara.jpg" class="rounded-full mb-6" alt="Dilara Can" />
                        <span class="mb-2 text-xl font-bold text-center">Dilara Güngenci</span>
                        <span class="text-center">Business Administration</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/cetin.jpg" class="rounded-full mb-6" alt="Çetin Çakıroğlu" />
                        <span class="mb-2 text-xl font-bold text-center">Çetin Çakıroğlu</span>
                        <span class="text-center">Front-End Developer</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/tugce.jpg" class="rounded-full mb-6" alt="Tuğçe Küçükoğlu" />
                        <span class="mb-2 text-xl font-bold text-center">Tuğçe Küçükoğlu</span>
                        <span class="text-center">Front-End Developer</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/atakan.jpg" class="rounded-full mb-6" alt="Atakan Tepe" />
                        <span class="mb-2 text-xl font-bold text-center">Atakan Tepe</span>
                        <span class="text-center">Front-End Developer</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/mehmet.jpg" class="rounded-full mb-6" alt="Mehmet Çetin" />
                        <span class="mb-2 text-xl font-bold text-center">Mehmet Çetin</span>
                        <span class="text-center">Front-End Developer</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/taner.jpg" class="rounded-full mb-6" alt="Taner Engin" />
                        <span class="mb-2 text-xl font-bold text-center">Taner Engin</span>
                        <span class="text-center">Front-End Developer</span>
                    </div>
                    <div class="flex flex-col items-center flex-auto">
                        <img src="https://primefaces.org/cdn/primeng/images/team/giray.jpg" class="rounded-full mb-6" alt="Giray Maviş" />
                        <span class="mb-2 text-xl font-bold text-center">Giray Maviş</span>
                        <span class="text-center">Front-End Developer</span>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class TeamDemo {}

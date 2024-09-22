import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <div class="flex flex-col md:flex-row mb-8 gap-8">
                <div class="card flex-1 !m-0 relative overflow-hidden">
                    <i
                        class="pi pi-github absolute opacity-20"
                        style="bottom: -50px; right: -50px; font-size: 200px; transform: rotateX(45deg) rotateY(0deg) rotateZ(-45deg)"
                    ></i>
                    <div class="text-2xl font-semibold mb-4 relative">Community Support</div>
                    <p class="m-0 leading-normal relative text-lg">
                        <a href="https://github.com/orgs/primefaces/discussions" class="doc-link" target="_blank" rel="noopener noreferrer"
                            >Forum</a
                        >
                        and
                        <a href="https://discord.gg/gzKFYnpmCY" class="doc-link" target="_blank" rel="noopener noreferrer">Discord</a> are
                        where the community users gather to seek support, post topics and discuss the technology. GitHub issue is the
                        channel for the community users to create tickets however PrimeTek does not guarantee a response time although they
                        are monitored and maintained by our staff. If you need to secure a response, you may consider PRO support instead.
                    </p>
                </div>
                <div class="card !m-0 flex-1 !bg-primary !text-primary-contrast font-medium">
                    <div class="text-2xl font-semibold mb-4">Professional Support</div>
                    <p class="m-0 leading-normal text-lg">
                        With PRO support, it's easy to support, tune, and add features to PrimeNG as an in-house library. With the exclusive
                        services of a PRO account, you no longer need to post questions in the community forum and the community issue
                        tracker at GitHub. Service is delivered via a private issue tracker based on a one-business-day response time.
                    </p>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-8 mb-8">
                <div class="card !m-0 col-span-full lg:col-span-1">
                    <div class="flex items-center justify-between mb-4">
                        <div class="text-2xl font-semibold">Service Features</div>
                        <span class="font-bold text-lg">$200/h</span>
                    </div>
                    <div class="gap-8 px-4">
                        <ul class="flex-auto list-none m-0 p-0 text-lg">
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">Private Issue Tracker</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">Response within 1 business day</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">Unlimited Number of Tickets</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">Hourly Support Model</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">1 year term</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">Minimum 25 Hours for initiation</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">Up to 5 accounts</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">Maintenance for Any Version</span>
                            </li>
                            <li class="flex items-center mb-4">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">New Features</span>
                            </li>
                            <li class="flex align-items-center">
                                <i class="pi pi-check-circle mr-4 text-green-500"></i>
                                <span class="leading-normal">POC implementations of a requirement</span>
                            </li>
                        </ul>
                    </div>
                    <a
                        href="mailto:primetek.com.tr?subject=PrimeNG%20PRO%20Support"
                        class="block mt-4 w-full bg-primary rounded-border py-3 px-4 hover:bg-primary-emphasis text-center transition-all duration-300 text-primary-contrast font-semibold text-lg leading-none"
                    >
                        Buy Now
                    </a>
                </div>

                <div class="card !m-0 col-span-full lg:col-span-2">
                    <div class="text-2xl font-semibold mb-4">How It Works</div>
                    <ul class="flex flex-col gap-4 list-none m-0 p-0 text-lg">
                        <li>
                            <div class="font-semibold mb-1">1. Purchase PRO Support</div>
                            <span class="leading-normal"
                                >Contact
                                <a href="mailto:contact@primetek.com.tr" target="_blank" rel="noopener noreferrer" class="doc-link"
                                    >PrimeTek</a
                                >
                                to purchase support.</span
                            >
                        </li>
                        <li>
                            <div class="font-semibold mb-1">2. Setup</div>
                            <span class="leading-normal"
                                >A private repository with an exclusive issue tracker is created for you at GitHub.</span
                            >
                        </li>
                        <li>
                            <div class="font-semibold mb-1">3. Request Support</div>
                            <span class="leading-normal"
                                >Create a ticket with a description of the issue and receive a reply within 1 business day.</span
                            >
                        </li>
                        <li>
                            <div class="font-semibold mb-1">4. Estimate and Approval</div>
                            <span class="leading-normal"
                                >An estimate is provided to resolve the issue, upon your approval the PrimeTek team commences work.</span
                            >
                        </li>
                        <li>
                            <div class="font-semibold mb-1">5. Resolution</div>
                            <span class="leading-normal">Issue is resolved and the approved hours are deducted from your account.</span>
                        </li>
                        <li>
                            <div class="font-semibold mb-1">6. Delivery</div>
                            <span class="leading-normal"
                                >If the issue requires an update in the library, it gets published to npm by as part of the public PrimeNG
                                package. A patch update on an older version can also be requested if you are not using the latest version.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card !mb-8">
                <div class="text-2xl font-semibold mb-4">Consulting</div>

                <p class="m-0 leading-normal mb-8 text-lg">
                    Unlock the full potential of your software projects in addition to PRO Support with the premier consulting services of
                    our partners. The team of seasoned consultants is available to provide tailored expertise and guidance, ensuring your
                    software development initiatives are successful, efficient, and innovative.
                </p>

                <div class="flex flex-col md:flex-row gap-8 mb-8">
                    <div class="flex-1">
                        <div class="font-semibold mb-2 text-xl">Deep Expertise</div>
                        <p class="!m-0 leading-normal mb-4 text-lg">
                            Our consultants are experts with extensive experience in various aspects of software development, including
                            design, architecture, coding, testing, and deployment. They bring a wealth of knowledge and best practices to
                            your project.
                        </p>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold mb-2 text-xl">Customized Solutions</div>
                        <p class="!m-0 leading-normal mb-4 text-lg">
                            We understand that every project is unique. Our consultants work closely with you to understand your specific
                            requirements and challenges, delivering solutions that are perfectly aligned with your business goals..
                        </p>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold mb-2 text-xl">Scalable Engagements</div>
                        <p class="!m-0 leading-normal mb-4 text-lg">
                            Whether you need short-term advice for a specific problem or long-term strategic guidance, our consulting
                            services are flexible and scalable to meet your needs.
                        </p>
                    </div>
                </div>

                <div class="border-t border-surface pt-8 flex flex-col items-center">
                    <p class="leading-normal mb-8 text-lg">
                        We are proud to collaborate with
                        <a href="https://unvoid.com/" target="_blank" rel="noopener noreferrer" class="doc-link">Unvoid</a> and
                        <a href="https://www.t2.com.tr/" target="_blank" rel="noopener noreferrer" class="doc-link">T2</a> that share our
                        commitment to excellence and open source values.
                    </p>

                    <div class="flex items-center gap-4">
                        <div class="flex flex-col gap-4 items-center">
                            <a href="https://unvoid.com/" target="_blank" rel="noopener noreferrer">
                                <svg width="60" height="60" viewBox="0 0 274 274" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="274" height="274" fill="#3355FF" />
                                    <path
                                        d="M0 15.2222C0 6.81523 6.81486 0 15.2214 0H258.764C267.171 0 273.985 6.81522 273.985 15.2222V258.778C273.985 267.185 267.171 274 258.764 274H15.2214C6.81487 274 0 267.185 0 258.778V15.2222Z"
                                        fill="var(--p-primary-color)"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M196.224 121.906L136.997 15.2197L49.8813 171.82L0 188.835V215.252L39.5676 205.54L136.997 255.003L240.148 201.068L218.293 161.671L274 147.997V95.3779L196.224 121.906ZM158.719 134.698L104.343 153.244L136.553 94.8194L158.719 134.698ZM92.6167 192.519L136.569 215.257L188.601 188.41L179.062 171.3L92.6167 192.519Z"
                                        fill="#ffffff"
                                    />
                                </svg>
                            </a>
                            <a
                                href="https://calendly.com/unvoid/discovery-call"
                                class="inline-block bg-primary rounded-border py-3 px-4 hover:bg-primary-emphasis transition-all duration-300 text-primary-contrast font-semibold text-lg leading-none"
                            >
                                Get a Quote
                            </a>
                        </div>
                        <div class="flex flex-col items-center gap-4">
                            <a href="https://www.t2.com.tr/" target="_blank" rel="noopener noreferrer">
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 595.3 342.5"
                                    style="enable-background: new 0 0 595.3 342.5"
                                    xml:space="preserve"
                                    height="60"
                                >
                                    <g id="Layer_1"></g>
                                    <g id="Layer_2">
                                        <path
                                            fill="var(--p-primary-color)"
                                            d="M263,173.3c0-28.1,8.1-54.4,22.1-76.6c-24.3-35-64.7-57.9-110.5-57.9C100.3,38.8,40.1,99,40.1,173.3
		c0,74.3,60.2,134.5,134.5,134.5c45.8,0,86.2-22.9,110.5-57.9C271.1,227.7,263,201.4,263,173.3z M240,127.4h-44.6v132.4h-47.2V127.4
		h-43.9V86.2H240V127.4z"
                                        />
                                        <path
                                            fill="var(--p-primary-color)"
                                            d="M416.9,38.8c-74.3,0-134.5,60.2-134.5,134.5c0,74.3,60.2,134.5,134.5,134.5c74.3,0,134.5-60.2,134.5-134.5
		C551.3,99,491.1,38.8,416.9,38.8z M481.4,253.4H359.5v-29.6l22-19.9c33.5-30,49.6-47.1,50-63.3c0-11.6-7.2-17.8-20.9-17.8
		c-9.9,0-20.2,4-30.6,12.1l-5.3,4.1l-14.3-36.2l3.1-2.3c14.5-11,34.4-17.3,54.7-17.3c36.7,0,60.3,21.4,60.3,54.5
		c0,28.7-21,51.4-43.6,71.7l-4.6,3.8h51.1V253.4z"
                                        />
                                    </g>
                                    <g id="Layer_3" class="st12"></g>
                                </svg>
                            </a>
                            <a
                                href="https://www.t2.com.tr/consulting"
                                class="inline-block bg-primary rounded-border py-3 px-4 hover:bg-primary-emphasis transition-all duration-300 text-primary-contrast font-semibold text-lg leading-none"
                            >
                                Get a Quote
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card m-0">
                <div class="text-2xl font-semibold mb-8">Frequently Asked Questions</div>
                <div class="flex flex-col md:flex-row text-lg gap-8">
                    <div class="flex-1 flex flex-col gap-8">
                        <div>
                            <div class="leading-normal mb-2 font-semibold">How many issue tracker accounts do we get?</div>
                            <p class="!m-0 leading-normal">We provide at most 5 accounts per organization.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">What is the duration of the service?</div>
                            <p class="!m-0 leading-normal">Service ends either when all support hours are used or after 1 year.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">
                                What happens if we extend after 1 year and we have unused hours?
                            </div>
                            <p class="!m-0 leading-normal">Unused hours expire and are not transferred to the new term.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">What are hours used for?</div>
                            <p class="!m-0 leading-normal">
                                Hours are utilized when creating tickets, filing defects, requesting enhancements, POC implementations of a
                                use case and questions.
                            </p>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col gap-8">
                        <div>
                            <div class="leading-normal mb-2 font-semibold">Are the changes delivered with a custom build?</div>
                            <p class="!m-0 leading-normal">
                                No, changes become part of the PrimeNG core and pushed to the public npm package on next update.
                            </p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">Who provides the support service?</div>
                            <p class="!m-0 leading-normal">Support service is provided by the PrimeNG team at PrimeTek.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">Is there a minimum hour requirement?</div>
                            <p class="!m-0 leading-normal">At least 25 hours are required to initiate the service.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">
                                What happens if the issue takes longer or shorter than the approved estimate?
                            </div>
                            <p class="!m-0 leading-normal">
                                The confirmed estimate is still used even if it takes longer to resolve the issue.
                            </p>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col gap-8">
                        <div>
                            <div class="leading-normal mb-2 font-semibold">Can we request new features and enhancements?</div>
                            <p class="!m-0 leading-normal">
                                Yes, initially the request needs to be approved by PrimeTek based on project roadmap fit. As a result, not
                                all requests may be accepted.
                            </p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">What are the payment terms?</div>
                            <p class="!m-0 leading-normal">Payment in advance is required to initiate the service.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">What payment methods are available?</div>
                            <p class="!m-0 leading-normal">Credit card and bank wire transfers are the available options.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">
                                We are a reseller, can we purchase this support for our client?
                            </div>
                            <p class="!m-0 leading-normal">
                                That is possible, the service will be provided to your client even if you are the contact in purchase
                                process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class Support {}

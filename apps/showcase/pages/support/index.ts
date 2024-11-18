import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: `
        <div>
            <div class="flex flex-col md:flex-row mb-8 gap-8">
                <div class="card flex-1 !m-0 relative overflow-hidden">
                    <i class="pi pi-github absolute opacity-20" style="bottom: -50px; right: -50px; font-size: 200px; transform: rotateX(45deg) rotateY(0deg) rotateZ(-45deg)"></i>
                    <div class="text-2xl font-semibold mb-4 relative">Community Support</div>
                    <p class="m-0 leading-normal relative text-lg">
                        <a href="https://github.com/orgs/primefaces/discussions" class="doc-link" target="_blank" rel="noopener noreferrer">Forum</a>
                        and
                        <a href="https://discord.gg/gzKFYnpmCY" class="doc-link" target="_blank" rel="noopener noreferrer">Discord</a> are where the community users gather to seek support, post topics and discuss the technology. GitHub issue is the
                        channel for the community users to create tickets however PrimeTek does not guarantee a response time although they are monitored and maintained by our staff. If you need to secure a response, you may consider PRO support
                        instead.
                    </p>
                </div>
                <div class="card !m-0 flex-1 !bg-primary !text-primary-contrast font-medium">
                    <div class="text-2xl font-semibold mb-4">Professional Support</div>
                    <p class="m-0 leading-normal text-lg">
                        With PRO support, it's easy to support, tune, and add features to PrimeNG as an in-house library. With the exclusive services of a PRO account, you no longer need to post questions in the community forum and the community
                        issue tracker at GitHub. Service is delivered via a private issue tracker based on a one-business-day response time.
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
                                <a href="mailto:contact@primetek.com.tr" target="_blank" rel="noopener noreferrer" class="doc-link">PrimeTek</a>
                                to purchase support.</span
                            >
                        </li>
                        <li>
                            <div class="font-semibold mb-1">2. Setup</div>
                            <span class="leading-normal">A private repository with an exclusive issue tracker is created for you at GitHub.</span>
                        </li>
                        <li>
                            <div class="font-semibold mb-1">3. Request Support</div>
                            <span class="leading-normal">Create a ticket with a description of the issue and receive a reply within 1 business day.</span>
                        </li>
                        <li>
                            <div class="font-semibold mb-1">4. Estimate and Approval</div>
                            <span class="leading-normal">An estimate is provided to resolve the issue, upon your approval the PrimeTek team commences work.</span>
                        </li>
                        <li>
                            <div class="font-semibold mb-1">5. Resolution</div>
                            <span class="leading-normal">Issue is resolved and the approved hours are deducted from your account.</span>
                        </li>
                        <li>
                            <div class="font-semibold mb-1">6. Delivery</div>
                            <span class="leading-normal"
                                >If the issue requires an update in the library, it gets published to npm by as part of the public PrimeNG package. A patch update on an older version can also be requested if you are not using the latest version.
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card !mb-8">
                <div class="text-2xl font-semibold mb-4">Consulting</div>

                <p class="m-0 leading-normal mb-8 text-lg">
                    Unlock the full potential of your software projects in addition to PRO Support with the premier consulting services of our partners. The team of seasoned consultants is available to provide tailored expertise and guidance,
                    ensuring your software development initiatives are successful, efficient, and innovative.
                </p>

                <div class="flex flex-col md:flex-row gap-8 mb-8">
                    <div class="flex-1">
                        <div class="font-semibold mb-2 text-xl">Deep Expertise</div>
                        <p class="!m-0 leading-normal mb-4 text-lg">
                            Our consultants are experts with extensive experience in various aspects of software development, including design, architecture, coding, testing, and deployment. They bring a wealth of knowledge and best practices to your
                            project.
                        </p>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold mb-2 text-xl">Customized Solutions</div>
                        <p class="!m-0 leading-normal mb-4 text-lg">
                            We understand that every project is unique. Our consultants work closely with you to understand your specific requirements and challenges, delivering solutions that are perfectly aligned with your business goals..
                        </p>
                    </div>
                    <div class="flex-1">
                        <div class="font-semibold mb-2 text-xl">Scalable Engagements</div>
                        <p class="!m-0 leading-normal mb-4 text-lg">Whether you need short-term advice for a specific problem or long-term strategic guidance, our consulting services are flexible and scalable to meet your needs.</p>
                    </div>
                </div>

                <div class="border-t border-surface pt-8 flex flex-col items-center">
                    <p class="leading-normal mb-8 text-lg">
                        We are proud to collaborate with
                        <a href="https://unvoid.com/" target="_blank" rel="noopener noreferrer" class="doc-link">Unvoid</a>,
                        <a href="https://virtua.tech" target="_blank" rel="noopener noreferrer" class="doc-link">Virtua</a>
                        and
                        <a href="https://www.t2.com.tr/" target="_blank" rel="noopener noreferrer" class="doc-link">T2</a> that share our commitment to excellence and open source values.
                    </p>

                    <div class="flex flex-wrap items-center gap-20">
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
                            <a href="https://calendly.com/unvoid/discovery-call" class="inline-block bg-primary rounded-border py-3 px-4 hover:bg-primary-emphasis transition-all duration-300 text-primary-contrast font-semibold text-lg leading-none">
                                Get a Quote
                            </a>
                        </div>
                        <div class="flex flex-col gap-4 items-center">
                            <a href="https://virtua.tech" target="_blank" rel="noopener noreferrer">
                                <svg width="191" height="60" viewBox="0 0 191 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.13 43.599L0 0H9.686L22.197 33.73L34.322 0H40.831L25.2 43.599H16.131H16.13Z" fill="var(--p-primary-color)" />
                                    <path d="M47.222 5.803V0H53.025V5.803H47.222ZM47.222 43.599V11.606H53.025V43.598L47.222 43.599Z" fill="var(--p-primary-color)" />
                                    <path
                                        d="M64.662 43.599V11.606H70.465V17.588C71.565 15.447 72.994 13.792 74.752 12.624C76.51 11.455 78.419 10.871 80.481 10.871C81.07 10.871 81.689 10.92 82.337 11.018V16.438C81.355 16.104 80.471 15.937 79.686 15.937C77.86 15.937 76.176 16.483 74.634 17.574C73.092 18.665 71.702 20.302 70.465 22.484V43.599H64.662Z"
                                        fill="var(--p-primary-color)"
                                    />
                                    <path
                                        d="M103.606 43.599C101.819 44.09 100.267 44.336 98.952 44.336C96.085 44.336 93.807 43.506 92.118 41.847C90.429 40.187 89.584 37.826 89.584 34.762V15.967H85.578V11.607H89.584V5.804L95.388 5.245V11.608H103.754V15.968H95.388V33.702C95.388 35.941 95.819 37.546 96.683 38.519C97.547 39.491 98.922 39.977 100.807 39.977C101.573 39.977 102.506 39.85 103.606 39.594V43.599Z"
                                        fill="var(--p-primary-color)"
                                    />
                                    <path
                                        d="M131.915 43.599V37.589C130.423 39.75 128.704 41.414 126.76 42.583C124.815 43.752 122.793 44.336 120.691 44.336C118.001 44.336 115.806 43.477 114.107 41.758C112.409 40.039 111.559 37.649 111.559 34.585V11.606H117.362V32.698C117.362 34.918 117.558 36.381 117.951 37.088C118.344 37.795 118.893 38.345 119.6 38.738C120.307 39.131 121.073 39.327 121.898 39.327C123.312 39.327 124.849 38.885 126.508 38.001C128.168 37.117 129.97 35.232 131.913 32.345V11.606H137.716V43.598H131.913L131.915 43.599Z"
                                        fill="var(--p-primary-color)"
                                    />
                                    <path
                                        d="M166.117 39.534C164.366 41.124 162.638 42.323 160.936 43.128C159.234 43.933 157.566 44.336 155.934 44.336C153.644 44.336 151.515 43.589 149.543 42.097C147.572 40.604 146.586 38.424 146.586 35.557C146.586 32.415 147.961 29.817 150.71 27.766C153.46 25.713 157.852 24.687 163.889 24.687H165.264V20.816C165.264 19.28 165.054 18.162 164.635 17.462C164.216 16.763 163.561 16.216 162.673 15.822C161.784 15.429 160.681 15.231 159.363 15.231C156.307 15.231 152.971 16.174 149.357 18.06V13.258C153.314 11.667 157.041 10.872 160.54 10.872C162.449 10.872 164.203 11.172 165.804 11.771C167.405 12.371 168.682 13.314 169.637 14.601C170.591 15.889 171.069 17.958 171.069 20.808V35.316C171.069 36.928 171.196 38.015 171.451 38.574C171.706 39.134 172.065 39.563 172.527 39.858C172.988 40.152 173.524 40.3 174.132 40.3C174.387 40.3 174.761 40.26 175.252 40.182L175.665 43.393C174.349 44.021 172.896 44.335 171.305 44.335C170.245 44.335 169.223 43.991 168.241 43.304C167.259 42.617 166.552 41.36 166.12 39.534H166.117ZM165.263 36.381V28.103L163.368 28.044C160.26 28.044 157.653 28.634 155.548 29.812C153.443 30.991 152.39 32.591 152.39 34.614C152.39 36.008 152.907 37.187 153.939 38.149C154.972 39.111 156.18 39.592 157.563 39.592C158.807 39.592 160.07 39.322 161.353 38.782C162.637 38.242 163.939 37.442 165.263 36.381Z"
                                        fill="var(--p-primary-color)"
                                    />
                                    <path
                                        d="M179.205 13.378C178.801 13.496 178.482 13.555 178.249 13.555C177.694 13.555 177.265 13.476 176.961 13.32C176.655 13.164 176.428 12.951 176.274 12.682C176.121 12.412 176.045 12.018 176.045 11.495V8.186H175.341V7.127H176.045V6.067L177.74 5.872V7.126H179.085V8.185H177.74V11.266C177.74 11.72 177.819 12.026 177.979 12.183C178.139 12.341 178.374 12.42 178.682 12.42C178.83 12.42 179.003 12.398 179.204 12.352V13.377L179.205 13.378Z"
                                        fill="var(--p-primary-color)"
                                    />
                                    <path
                                        d="M180.716 13.412V7.126H182.342V8.312C182.555 7.93 182.837 7.613 183.183 7.361C183.53 7.11 183.955 6.984 184.46 6.984C184.765 6.984 185.029 7.03 185.255 7.124C185.481 7.217 185.68 7.364 185.854 7.565C186.028 7.765 186.139 8.014 186.188 8.312C186.502 7.838 186.819 7.498 187.141 7.292C187.463 7.087 187.854 6.984 188.316 6.984C188.827 6.984 189.241 7.133 189.56 7.433C189.877 7.732 190.036 8.216 190.036 8.884V13.412H188.412V9.434C188.412 8.965 188.336 8.661 188.186 8.523C188.036 8.386 187.867 8.317 187.68 8.317C187.426 8.317 187.173 8.408 186.924 8.593C186.674 8.777 186.43 9.052 186.189 9.419V13.412H184.564V9.439C184.564 8.974 184.49 8.67 184.343 8.529C184.195 8.387 184.02 8.317 183.814 8.317C183.567 8.317 183.318 8.408 183.072 8.59C182.827 8.773 182.583 9.048 182.342 9.419V13.412H180.716Z"
                                        fill="var(--p-primary-color)"
                                    />
                                </svg>
                            </a>
                            <a href="https://virtua.tech/contact" class="inline-block bg-primary rounded-border py-3 px-4 hover:bg-primary-emphasis transition-all duration-300 text-primary-contrast font-semibold text-lg leading-none">
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
                            <a href="https://www.t2.com.tr/consulting" class="inline-block bg-primary rounded-border py-3 px-4 hover:bg-primary-emphasis transition-all duration-300 text-primary-contrast font-semibold text-lg leading-none">
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
                            <div class="leading-normal mb-2 font-semibold">What happens if we extend after 1 year and we have unused hours?</div>
                            <p class="!m-0 leading-normal">Unused hours expire and are not transferred to the new term.</p>
                        </div>
                        <div>
                            <div class="leading-normal mb-2 font-semibold">What are hours used for?</div>
                            <p class="!m-0 leading-normal">Hours are utilized when creating tickets, filing defects, requesting enhancements, POC implementations of a use case and questions.</p>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col gap-8">
                        <div>
                            <div class="leading-normal mb-2 font-semibold">Are the changes delivered with a custom build?</div>
                            <p class="!m-0 leading-normal">No, changes become part of the PrimeNG core and pushed to the public npm package on next update.</p>
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
                            <div class="leading-normal mb-2 font-semibold">What happens if the issue takes longer or shorter than the approved estimate?</div>
                            <p class="!m-0 leading-normal">The confirmed estimate is still used even if it takes longer to resolve the issue.</p>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col gap-8">
                        <div>
                            <div class="leading-normal mb-2 font-semibold">Can we request new features and enhancements?</div>
                            <p class="!m-0 leading-normal">Yes, initially the request needs to be approved by PrimeTek based on project roadmap fit. As a result, not all requests may be accepted.</p>
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
                            <div class="leading-normal mb-2 font-semibold">We are a reseller, can we purchase this support for our client?</div>
                            <p class="!m-0 leading-normal">That is possible, the service will be provided to your client even if you are the contact in purchase process.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Support {}

import { Component, Input } from '@angular/core';

@Component({
    selector: 'events-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>onBeforeUpload</td>
                        <td>event.formData: FormData object.</td>
                        <td>Callback to invoke before file upload is initialized.</td>
                    </tr>
                    <tr>
                        <td>onSend</td>
                        <td>
                            event.originalEvent: Http Event <br />
                            event.formData: FormData object.
                        </td>
                        <td>An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.</td>
                    </tr>
                    <tr>
                        <td>onUpload</td>
                        <td>
                            event.originalEvent: Http Event<br />
                            event.files: Uploaded files.
                        </td>
                        <td>Callback to invoke when file upload is complete.</td>
                    </tr>
                    <tr>
                        <td>onError</td>
                        <td>
                            event.files: Files that are not uploaded.<br />
                            event.error: Request Error.
                        </td>
                        <td>Callback to invoke if file upload fails.</td>
                    </tr>
                    <tr>
                        <td>onClear</td>
                        <td>-</td>
                        <td>Callback to invoke when files in queue are removed without uploading using clear all button.</td>
                    </tr>
                    <tr>
                        <td>onRemove</td>
                        <td>
                            event.originalEvent: Original browser event. <br />
                            event.file: Selected file.
                        </td>
                        <td>Callback to invoke when a file is removed without uploading using clear button of a file.</td>
                    </tr>
                    <tr>
                        <td>onSelect</td>
                        <td>
                            event.originalEvent: Original browser event. <br />
                            event.files: Selected files of the select event. event.currentFiles: All files to be uploaded.
                        </td>
                        <td>Callback to invoke when files are selected.</td>
                    </tr>
                    <tr>
                        <td>onProgress</td>
                        <td>
                            event.originalEvent: Original browser event. <br />
                            event.progress: Calculated progress value.
                        </td>
                        <td>Callback to invoke when files are being uploaded.</td>
                    </tr>
                    <tr>
                        <td>uploadHandler</td>
                        <td>event.files: List of selected files.</td>
                        <td>Callback to invoke in custom upload mode to upload the files manually.</td>
                    </tr>
                    <tr>
                        <td>onImageError</td>
                        <td>event: Browser event</td>
                        <td>This event is triggered if an error occurs while loading an image file.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class EventsDoc {
    @Input() id: string;

    @Input() title: string;
}

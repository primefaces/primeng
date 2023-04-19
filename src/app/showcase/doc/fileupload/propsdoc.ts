import { Component, Input } from '@angular/core';

@Component({
    selector: 'props-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id"></app-docsectiontext>
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>name</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Name of the request parameter to identify the files at backend.</td>
                    </tr>
                    <tr>
                        <td>url</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Remote url to upload the files.</td>
                    </tr>
                    <tr>
                        <td>method</td>
                        <td>string</td>
                        <td>post</td>
                        <td>HTTP method to send the files to the url such as "post" and "put".</td>
                    </tr>
                    <tr>
                        <td>multiple</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Used to select multiple files at once from file dialog.</td>
                    </tr>
                    <tr>
                        <td>accept</td>
                        <td>string</td>
                        <td>false</td>
                        <td>Pattern to restrict the allowed file types such as "image/*".</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Disables the upload functionality.</td>
                    </tr>
                    <tr>
                        <td>auto</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>When enabled, upload begins automatically after selection is completed.</td>
                    </tr>
                    <tr>
                        <td>maxFileSize</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum file size allowed in bytes.</td>
                    </tr>
                    <tr>
                        <td>fileLimit</td>
                        <td>number</td>
                        <td>null</td>
                        <td>Maximum number of files that can be uploaded.</td>
                    </tr>
                    <tr>
                        <td>invalidFileSizeMessageSummary</td>
                        <td>string</td>
                        <td>"&#123;0&#125;: Invalid file size, "</td>
                        <td>Summary message of the invalid file size.</td>
                    </tr>
                    <tr>
                        <td>invalidFileSizeMessageDetail</td>
                        <td>string</td>
                        <td>"maximum upload size is &#123;0&#125;."</td>
                        <td>Detail message of the invalid file size.</td>
                    </tr>
                    <tr>
                        <td>invalidFileTypeMessageSummary</td>
                        <td>string</td>
                        <td>"&#123;0&#125;: Invalid file type, "</td>
                        <td>Summary message of the invalid file type.</td>
                    </tr>
                    <tr>
                        <td>invalidFileLimitMessageDetail</td>
                        <td>string</td>
                        <td>"limit is &#123;0&#125; at most."</td>
                        <td>Detail message of the invalid file type.</td>
                    </tr>
                    <tr>
                        <td>invalidFileLimitMessageSummary</td>
                        <td>string</td>
                        <td>"Maximum number of files exceeded, "</td>
                        <td>Summary message of the invalid file type.</td>
                    </tr>
                    <tr>
                        <td>invalidFileTypeMessageDetail</td>
                        <td>string</td>
                        <td>"allowed file types: &#123;0&#125;."</td>
                        <td>Detail message of the invalid file type.</td>
                    </tr>
                    <tr>
                        <td>style</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Inline style of the component.</td>
                    </tr>
                    <tr>
                        <td>styleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the component.</td>
                    </tr>
                    <tr>
                        <td>chooseStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the choose button.</td>
                    </tr>
                    <tr>
                        <td>cancelStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the cancel button.</td>
                    </tr>
                    <tr>
                        <td>removeStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the remove button.</td>
                    </tr>
                    <tr>
                        <td>uploadStyleClass</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Style class of the upload button.</td>
                    </tr>
                    <tr>
                        <td>previewWidth</td>
                        <td>number</td>
                        <td>50</td>
                        <td>Width of the image thumbnail in pixels.</td>
                    </tr>
                    <tr>
                        <td>chooseLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label of the choose button. Defaults to global value in i18n translation configuration.</td>
                    </tr>
                    <tr>
                        <td>uploadLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label of the upload button. Defaults to global value in i18n translation configuration.</td>
                    </tr>
                    <tr>
                        <td>cancelLabel</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Label of the cancel button. Defaults to global value in i18n translation configuration.</td>
                    </tr>
                    <tr>
                        <td>chooseIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the choose button.</td>
                    </tr>
                    <tr>
                        <td>uploadIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the upload button.</td>
                    </tr>
                    <tr>
                        <td>cancelIcon</td>
                        <td>string</td>
                        <td>null</td>
                        <td>Icon of the cancel button.</td>
                    </tr>
                    <tr>
                        <td>withCredentials</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.</td>
                    </tr>
                    <tr>
                        <td>mode</td>
                        <td>string</td>
                        <td>advanced</td>
                        <td>Defines the UI of the component, possible values are "advanced" and "basic".</td>
                    </tr>
                    <tr>
                        <td>customUpload</td>
                        <td>boolean</td>
                        <td>false</td>
                        <td>Whether to use the default upload or a manual implementation defined in uploadHandler callback.</td>
                    </tr>
                    <tr>
                        <td>showUploadButton</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Defines the visibility of upload button for Client-side FileUpload.</td>
                    </tr>
                    <tr>
                        <td>showCancelButton</td>
                        <td>boolean</td>
                        <td>true</td>
                        <td>Defines the visibility of cancel button for Client-side FileUpload.</td>
                    </tr>
                    <tr>
                        <td>files</td>
                        <td>array</td>
                        <td>null</td>
                        <td>List of files to be provide to the FileUpload externally.</td>
                    </tr>
                    <tr>
                        <td>headers</td>
                        <td>HttpHeaders</td>
                        <td>null</td>
                        <td>HttpHeaders class represents the header configuration options for an HTTP request.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>`
})
export class PropsDoc {
    @Input() id: string;

    @Input() title: string;
}

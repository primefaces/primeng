import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {TreeNode} from '../../../components/common/api';

@Injectable()
export class NodeService {
    
    constructor(private http: Http) {}

    getFiles() {
        return this.http.get('showcase/resources/data/files.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data)
                    .then(data => { return data; });
    }
    
    getLazyFiles() {
        return this.http.get('showcase/resources/data/files-lazy.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data)
                    .then(data => { return data; });
    }
    
    getFilesystem() {
        return this.http.get('showcase/resources/data/filesystem.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data)
                    .then(data => { return data; });
    }
    
    getLazyFilesystem() {
        return this.http.get('showcase/resources/data/filesystem-lazy.json')
                    .toPromise()
                    .then(res => <TreeNode[]> res.json().data)
                    .then(data => { return data; });
    }
}
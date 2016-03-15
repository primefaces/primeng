import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {TreeNode} from '../../../components/api/treenode';

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
}
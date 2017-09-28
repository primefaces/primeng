import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TreeNode } from '../../../components/common/api';

@Injectable()
export class NodeService {

  constructor(private http: HttpClient) { }

  getFiles() {
    return this.http.get<any>('showcase/resources/data/files.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }

  getLazyFiles() {
    return this.http.get<any>('showcase/resources/data/files-lazy.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }

  getFilesystem() {
    return this.http.get<any>('showcase/resources/data/filesystem.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }

  getLazyFilesystem() {
    return this.http.get<any>('showcase/resources/data/filesystem-lazy.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
  }
}

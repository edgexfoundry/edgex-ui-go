/*******************************************************************************
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  profileYamlSource?: any;
  codeMirrorEditor: any;
  profileName?: string;

  constructor(private metaSvc: MetadataService, 
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.renderYamlSource();
    this.route.queryParams.subscribe(params => {
      if (params['profileName']) {
        this.profileName = params['profileName'];
        this.metaSvc.findProfileYamlByNameViaUIBackend(params['profileName']).subscribe((data: any) => {
          // this.profileYamlSource = data;
          this.codeMirrorEditor.setValue(data);
          this.codeMirrorEditor.refresh();
        });
      }
    });
  }

  update() {
    this.codeMirrorEditor.refresh();
    this.metaSvc.updateProfileYamlContentViaUIBackend(this.codeMirrorEditor.getValue()).subscribe(data => {
      this.msgSvc.success('Update profile', `name: ${this.profileName}`);
      this.router.navigate(['../device-profile-list'], { relativeTo: this.route });
    })
  }

  renderYamlSource() {
    let myTextarea = document.getElementById('editor-edit');
    this.codeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
      mode: "yaml",
      theme: "gruvbox-dark",
      foldGutter: true,
      smartIndent: true,
      showCursorWhenSelecting: true,
      lineNumbers: true,
      lineWrapping: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
      autofocus: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      // scrollbarStyle: 'simple',

      // allowDropFileTypes: ['text/plain'],
      cursorHeight: 0.85,
      autocorrect: true
    });
    this.codeMirrorEditor.setSize('auto', '600px')
  }
  
  ngOnDestroy():void {
    this.codeMirrorEditor = null;
  }
}

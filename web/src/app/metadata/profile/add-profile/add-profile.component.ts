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

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {

  profileYamlSource?: any;
  codeMirrorEditor: any;
  yamlFile?: File;

  constructor(private metaSvc: MetadataService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.renderYamlSource()
  }

  renderYamlSource() {
    let myTextarea = document.getElementById('editor');
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
    this.codeMirrorEditor.on('drop', (instance: any, event: Event) => {
      // console.log((event as DragEvent).dataTransfer?.files)
      this.yamlFile = (event as DragEvent).dataTransfer?.files[0];
    });

    this.codeMirrorEditor.on('paste', (instance: any, event: Event) => {
      // console.log(event)
      // console.log((event as DragEvent).dataTransfer?.files)
      // this.yamlFile = (event as DragEvent).dataTransfer?.files[0];
    });

  }

  submit() {

    this.profileYamlSource = this.codeMirrorEditor.getValue()

    // let blob = new Blob([this.profileYamlSource]);
    // console.log(this.profileYamlSource)
    // let formData = new FormData();
    // // formData.set('file', this.yamlFile as File, (this.yamlFile as File).name)
    // formData.set('file', blob, 'ssssss');
    // this.metaSvc.uploadProfileYamlFile(formData).subscribe(() => {
    //   this.msgSvc.success('submit');
    //   this.router.navigate(['../device-profile-list'], { relativeTo: this.route });
    // });

    this.metaSvc.addProfileYamlByNameViaUIBackend(this.profileYamlSource).subscribe((data: string) => {
      this.msgSvc.success('Add profile');
      this.router.navigate(['../device-profile-list'], { relativeTo: this.route })
    });

    // this.metaSvc.uploadProfileYamlContent(this.profileYamlSource).subscribe((data: string) => {
    //   this.msgSvc.success('Add profile');
    //   this.router.navigate(['../device-profile-list'], { relativeTo: this.route })
    // });
  }
}

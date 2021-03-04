import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';
import { MessageService } from '../../../message/message.service';
import { DeviceProfileResponse } from '../../../contracts/v2/responses/device-profile-response';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

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
          this.profileYamlSource = data;
          this.codeMirrorEditor.setValue(this.profileYamlSource);
        });
      }
    });
  }

  submit() {
    // let blob = new Blob([this.profileYamlSource], { type: 'text/plain' });
    this.profileYamlSource = this.codeMirrorEditor.getValue()
    this.metaSvc.updateProfileYamlContentViaUIBackend(this.profileYamlSource).subscribe(data => {
      this.msgSvc.success('Update profile', `name: ${this.profileName}`);
      this.router.navigate(['../device-profile-list'], { relativeTo: this.route });
    })
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
  }
}

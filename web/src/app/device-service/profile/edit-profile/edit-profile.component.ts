import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MetadataService } from '../../../services/metadata.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileYamlSource?: any;
  codeMirrorEditor: any;
  profileName?: string;

  constructor(private metaSvc: MetadataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.renderYamlSource();
    this.route.queryParams.subscribe(params => {
      if (params['profileId']) {
        this.profileName = params['profileName'];
        this.metaSvc.findProfileYamlById(params['profileId']).subscribe((data: any) => {
          this.profileYamlSource = data;
          this.codeMirrorEditor.setValue(this.profileYamlSource);
        });
      }
    });
  }

  submit() {
    let blob = new Blob([this.profileYamlSource], { type: 'text/plain' });
    // this.metaSvc.updateDeviceProfile(this.renderYamlSource).subscribe()
  }

  renderYamlSource() {
    let myTextarea = document.getElementById('editor');
    this.codeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
      mode: "yaml",
      // theme: "3024-night",
      theme: "gruvbox-dark",
      // theme: "elegant",
      // theme: "abcdef",
      // theme: "material-darker",
      // theme: "base16-dark",
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

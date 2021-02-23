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
<<<<<<< HEAD
<<<<<<< HEAD
      theme: "gruvbox-dark",
=======
      // theme: "3024-night",
      theme: "gruvbox-dark",
      // theme: "elegant",
      // theme: "abcdef",
      // theme: "material-darker",
      // theme: "base16-dark",
>>>>>>> 75ad599... Add Device Profile Center component for internal router
=======
      theme: "gruvbox-dark",
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
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
<<<<<<< HEAD
<<<<<<< HEAD
      // console.log((event as DragEvent).dataTransfer?.files)
=======
      console.log((event as DragEvent).dataTransfer?.files)
>>>>>>> 75ad599... Add Device Profile Center component for internal router
=======
      // console.log((event as DragEvent).dataTransfer?.files)
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
      this.yamlFile = (event as DragEvent).dataTransfer?.files[0];
    });

    this.codeMirrorEditor.on('paste', (instance: any, event: Event) => {
<<<<<<< HEAD
<<<<<<< HEAD
      // console.log(event)
=======
      console.log(event)
>>>>>>> 75ad599... Add Device Profile Center component for internal router
=======
      // console.log(event)
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
      // console.log((event as DragEvent).dataTransfer?.files)
      // this.yamlFile = (event as DragEvent).dataTransfer?.files[0];
    });

  }

  submit() {

    this.profileYamlSource = this.codeMirrorEditor.getValue()

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
    // let blob = new Blob([this.profileYamlSource]);
    // console.log(this.profileYamlSource)
    // let formData = new FormData();
    // // formData.set('file', this.yamlFile as File, (this.yamlFile as File).name)
    // formData.set('file', blob, 'ssssss');
    // this.metaSvc.uploadProfileYamlFile(formData).subscribe(() => {
<<<<<<< HEAD
    //   this.msgSvc.success('submit');
    //   this.router.navigate(['../device-profile-list'], { relativeTo: this.route });
    // });

    this.metaSvc.uploadProfileYamlContent(this.profileYamlSource).subscribe((data: string) => {
      this.msgSvc.success('Add profile');
      this.router.navigate(['../device-profile-list'], { relativeTo: this.route })
    });
=======
    let blob = new Blob([this.profileYamlSource]);
    console.log(this.profileYamlSource)
    let formData = new FormData();
    // formData.set('file', this.yamlFile as File, (this.yamlFile as File).name)
    formData.set('file', blob, 'ssssss');
    this.metaSvc.uploadProfileYamlFile(formData).subscribe(() => {
      this.msgSvc.success('submit');
      this.router.navigate(['../device-profile-list'], { relativeTo: this.route });
    });
    // this.metaSvc.uploadProfileYamlContent(this.profileYamlSource).subscribe((data: string) => {
=======
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
    //   this.msgSvc.success('submit');
    //   this.router.navigate(['../device-profile-list'], { relativeTo: this.route });
    // });
<<<<<<< HEAD
>>>>>>> 75ad599... Add Device Profile Center component for internal router
=======

    this.metaSvc.uploadProfileYamlContent(this.profileYamlSource).subscribe((data: string) => {
      this.msgSvc.success('Add profile');
      this.router.navigate(['../device-profile-list'], { relativeTo: this.route })
    });
>>>>>>> dc1a989... Add errorHandler for all services and Add delete dialog for all delete operations
  }
}

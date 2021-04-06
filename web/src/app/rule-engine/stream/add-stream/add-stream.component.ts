import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { RuleEngineService } from 'src/app/services/rule-engine.service';

import { MessageService } from '../../../message/message.service';

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.css']
})
export class AddStreamComponent implements OnInit {
  addStreamSimple:string = '';

  constructor(private ruleSvc: RuleEngineService,
    private msgSvc: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.addStreamSimple = '{"sql":"create stream demo () WITH ( FORMAT = \\"JSON\\", TYPE=\\"edgex\\")"}';
  }

  submit() {
    this.ruleSvc.addStream(this.addStreamSimple).subscribe(() => {
      this.msgSvc.success('Add Stream Success!');
      this.router.navigate(['../stream-list'], { relativeTo: this.route })
    });
  }
}

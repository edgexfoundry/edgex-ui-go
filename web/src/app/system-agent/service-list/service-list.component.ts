import { Component, OnInit } from '@angular/core';
import { SystemAgentService } from '../../services/system-agent.service';

import { MessageService } from '../../message/message.service';

interface service {
  name: string,
  state: string,
  metrics?: string,
  config?: string,
  operation?: string,
  health?: boolean,
}

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  defaultServcies = [
    "edgex-core-metadata", "edgex-core-data", "edgex-core-command",
    "edgex-support-notifications", "edgex-support-scheduler",
    "edgex-redis",
    "rule-engine",
    "edgex-ui-go",
    //"edgex-sys-mgmt-agent",
    "edgex-app-service-configurable-rules"];

  disabled: boolean = false;
  toggleClass: string = "";

  availServices: service[] = [];

  constructor(private sysService: SystemAgentService, private msgSvc: MessageService) { }

  ngOnInit(): void {
    this.sysService.getHealth(this.defaultServcies.join(",")).subscribe(data => {
      for (const [k, v] of Object.entries(data)) {
        if (v) {
          let s: service = { name: `${k}`, state: `${v}` }
          this.availServices.push(s)
        }
      }
    });
  }

  refresh() {
    this.disabled = true;
    this.sysService.getHealth(this.defaultServcies.join(",")).subscribe(data => {

      this.availServices = [];

      for (const [k, v] of Object.entries(data)) {
        if (v) {
          let s: service = { name: `${k}`, state: `${v}` }
          this.availServices.push(s)
        }
      }
      this.disabled = false;
      this.msgSvc.success('refresh');
    });
  }

  start(name: string) {
    this.disabled = true;
    this.toggleClass = "badge badge-secondary";
    let self = this;
    this.sysService.start(name).subscribe(() => {
      this.availServices.forEach(function (svc) {
        if (svc.name == name) {
          svc.state = "true";
          self.disabled = false;
          self.toggleClass = "";
          return
        }
      });
    });
  }

  restart(name: string) {
    this.disabled = true;
    let self = this;
    this.sysService.restart(name).subscribe(() => {
      this.availServices.forEach(function (svc) {
        if (svc.name == name) {
          svc.state = "true";
          self.disabled = false;
          return
        }
      });
    });
  }

  stop(name: string) {
    this.disabled = true;
    let self = this;
    this.sysService.stop(name).subscribe(() => {
      this.availServices.forEach(function (svc) {
        if (svc.name == name) {
          svc.state = "false";
          self.disabled = false;
          return
        }
      });
    });
  }

}

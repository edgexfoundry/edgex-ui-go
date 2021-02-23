import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { SystemAgentService } from '../../services/system-agent.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  service?: string;
  config?: any;

  constructor(private sysService: SystemAgentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.service = this.route.snapshot.paramMap.get('name') as string;
    this.getConfigs();
  }

  getConfigs() {
    this.sysService.getConfig(this.service as string).subscribe((data: any) => {
      this.config = JSON.stringify(data, null, 3);
    });
  }
}

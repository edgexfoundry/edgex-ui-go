import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/contracts/v2/app-service/app-service';
import { MessageService } from '../../message/message.service';
import { AppServiceService } from '../../services/app-service.service';
 

@Component({
  selector: 'app-app-service-list',
  templateUrl: './app-service-list.component.html',
  styleUrls: ['./app-service-list.component.css']
})
export class AppServiceListComponent implements OnInit {
  appServiceList: any[] = [
    'app-rules-engine'
  ];
  appServiceTempStr:string = '';

  constructor(private appSvc: AppServiceService,private msgSvc: MessageService) { }

  ngOnInit(): void {
    
  }

  appServiceDetail(){
    this.appSvc.getAppServiceConfig().subscribe((data: AppService) => {
      this.appServiceTempStr = JSON.stringify(data, null, 3);
      $("#appServiceDetailDialog").modal('show');
    });
  }

  toEditAppService(){

  }
}

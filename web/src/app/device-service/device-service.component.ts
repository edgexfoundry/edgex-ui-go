import { Component, OnInit } from '@angular/core';
import { Device } from '../contracts/device';
import { DeviceService } from '../contracts/device-service';

@Component({
  selector: 'app-device-service',
  templateUrl: './device-service.component.html',
  styleUrls: ['./device-service.component.css']
})
export class DeviceServiceComponent implements OnInit {
  devices?: Device[];
  deviceServices?: DeviceService[];

  constructor() { }

  ngOnInit(): void {
  }

}

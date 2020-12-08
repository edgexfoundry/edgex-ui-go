import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Device } from '../contracts/device';
import { DeviceService } from '../contracts/device-service';
=======
>>>>>>> f61e69e... add init component for each module

@Component({
  selector: 'app-device-service',
  templateUrl: './device-service.component.html',
  styleUrls: ['./device-service.component.css']
})
export class DeviceServiceComponent implements OnInit {
<<<<<<< HEAD
  devices?: Device[];
  deviceServices?: DeviceService[];
=======
>>>>>>> f61e69e... add init component for each module

  constructor() { }

  ngOnInit(): void {
  }

}

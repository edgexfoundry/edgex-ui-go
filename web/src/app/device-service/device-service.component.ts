import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
import { Device } from '../contracts/device';
import { DeviceService } from '../contracts/device-service';
=======
>>>>>>> f61e69e... add init component for each module
=======
import { Device } from '../contracts/device';
import { DeviceService } from '../contracts/device-service';
>>>>>>> 727932f... Finished system agent module basic feature

@Component({
  selector: 'app-device-service',
  templateUrl: './device-service.component.html',
  styleUrls: ['./device-service.component.css']
})
export class DeviceServiceComponent implements OnInit {
<<<<<<< HEAD
<<<<<<< HEAD
  devices?: Device[];
  deviceServices?: DeviceService[];
=======
>>>>>>> f61e69e... add init component for each module
=======
  devices?: Device[];
  deviceServices?: DeviceService[];
>>>>>>> 727932f... Finished system agent module basic feature

  constructor() { }

  ngOnInit(): void {
  }

}

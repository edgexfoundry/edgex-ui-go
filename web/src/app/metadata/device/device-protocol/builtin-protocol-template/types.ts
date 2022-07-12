/*******************************************************************************
 * Copyright © 2022-2023 VMware, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 * 
 * @author: Huaqiao Zhang, <huaqiaoz@vmware.com>
 *******************************************************************************/

export class MqttProtocolTemplate {
  Schema: string = "";
  Host: string = "";
  Port: string = "";
  User: string = "";
  Password: string = "";
  ClientId: string = "";
  CommandTopic: string = "";
}

export class ModusTCPProtocolTemplate {
  Address: string = "";
  Port: string = "";
  UnitID: string = "";
  Timeout: string = "";
  IdleTimeout: string = "";
}

export class ModusRTUProtocolTemplate {
  Address: string = "";
  UnitID: string = "";
  BaudRate: string = "";
  DataBits: string = "";
  StopBits: string = "";
  Parity: string = ""; // Parity: N - None, O - Odd, E - Even
  Timeout: string = "";
  IdleTimeout: string = "";
}

export class VirtualProtocolTemplate {
  Address: string = "";
  Port: string = "";
}

export class OnvifProtocolTemplate {
  Address: string = "";
  Port: string = "";
  MACAddress: string = "";
}

export class TCPProtocolTemplate {
  host: string = "";
  port: string = "";
}
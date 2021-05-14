/*******************************************************************************
 * Copyright © 2021-2022 VMware, Inc. All Rights Reserved.
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { SystemAgentService } from '../../services/system-agent.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit, OnDestroy {

  service$?: Observable<any>;
  metrics$?: Observable<any>;
  metrics?: any;
  memoryUsageChart: any;
  cpuUsageChart: any;
  networkUsageChart: any;
  timer: any;
  service?: string;
  refreshRate: number = 3;

  option = {
    tooltip: {
      show: true,
      trigger: 'axis',
      formatter: '{c0}%'
    },
    legend: {
      data: [""]
    },
    dateZoom: {
      show: false,
      start: 0,
      end: 100,
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        "name": "",
        "type": "line",
        "smooth": true,
        "itemStyle": { normal: { color: "#425CC7", areaStyle: { type: "default" } } },
        "data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };

  netChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#922C48'
        }
      }
    },
    legend: {
      data: ['RX', 'TX']
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // axisLabel: {
        //   interval: 0,
        //   rotate: 40
        // },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ],
    yAxis: [
      {
        // axisLine: { show: true },
        // axisTick: { show: true },
        type: 'value'
      }
    ],
    series: [
      {
        name: 'RX',
        type: 'line',
        smooth: true,
        stack: '总量',
        itemStyle: { normal: { color: "#922C48", areaStyle: { type: "default" } } },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      {
        name: 'TX',
        type: 'line',
        smooth: true,
        stack: '总量',
        itemStyle: { normal: { color: "#425CC7", areaStyle: { type: "default" } } },
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public sysService: SystemAgentService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['svcName']) {
        this.service = params['svcName'];
        this.memoryUsageChart = echarts.init(document.getElementById('memory-usage'));
        this.cpuUsageChart = echarts.init(document.getElementById('cpu-usage'));
        this.networkUsageChart = echarts.init(document.getElementById('network-usage'));

        this.option.legend.data.shift();
        this.option.legend.data.push("Memory");
        this.memoryUsageChart.setOption(this.option);

        this.option.legend.data.shift();
        this.option.legend.data.push("CPU");
        this.cpuUsageChart.setOption(this.option);

        this.networkUsageChart.setOption(this.netChartOption);

        this.sysService.getMetrics(params['svcName']).subscribe((data: any) => {
          this.metrics = data[0];
          this.feedAllCharts();
        })

        this.timer = window.setInterval(this.metricsTimer, this.refreshRate * 1000, this)
      }
    })

  }

  metricsTimer(self: any) {
    self.sysService.getMetrics(self.service as string).subscribe((data: any) => {
      self.metrics = data[0];
      self.feedAllCharts();
    });
  }

  feedAllCharts() {
    let cpuOpt = this.cpuUsageChart.getOption();
    cpuOpt.series[0].data.shift();
    cpuOpt.series[0].data.push(this.metrics.result.cpuUsedPercent);

    cpuOpt.xAxis[0].data.shift();
    cpuOpt.xAxis[0].data.push(this.timestamp());

    this.cpuUsageChart.setOption(cpuOpt);

    let memOpt = this.memoryUsageChart.getOption();
    memOpt.series[0].data.shift();
    memOpt.series[0].data.push(this.metrics.result.raw.mem_perc.substring(0, this.metrics.result.raw.mem_perc.length - 1));

    memOpt.xAxis[0].data.shift();
    memOpt.xAxis[0].data.push(this.timestamp());

    this.memoryUsageChart.setOption(memOpt);

    let netOpt = this.networkUsageChart.getOption();
    let rx_tx_array = this.metrics.result.raw.net_io.split('/');
    let rx = rx_tx_array[0].trim().replace("kB", "").replace("MB", "");
    let tx = rx_tx_array[1].trim().replace("kB", "").replace("MB", "");

    netOpt.series[0].data.shift();
    netOpt.series[0].data.push(rx);

    netOpt.series[1].data.shift();
    netOpt.series[1].data.push(tx);

    netOpt.xAxis[0].data.shift();
    netOpt.xAxis[0].data.push(this.timestamp());

    this.networkUsageChart.setOption(netOpt);
  }

  onRateSelect() {
    console.log(this.refreshRate)
    clearInterval(this.timer);
    this.timer = window.setInterval(this.metricsTimer, this.refreshRate * 1000, this)
  }

  timestamp(): string {
    let ts = new Date();
    return `${ts.getHours()}:${ts.getMinutes()}:${ts.getSeconds()}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}

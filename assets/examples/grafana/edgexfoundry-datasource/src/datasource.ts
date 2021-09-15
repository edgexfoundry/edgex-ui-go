import { getBackendSrv } from '@grafana/runtime';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions } from './types';
// import { lastValueFrom, of } from 'rxjs';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  routePath = '/edgexfoundry';
  url?: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.url = instanceSettings.url;
  }

  async doRequest(query: MyQuery) {
    let url = `${this.url}${this.routePath}/api/v2/reading/device/name/${query.deviceName}/resourceName/${query.resourceName}`;
    const result = await getBackendSrv().get(url);
    return result;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map((query) => {
      // if (!query.deviceName && !query.resourceName) {
      //   return;
      // }
      // if (query.deviceName.trim() === '' && query.resourceName.trim() === '') {
      //   return;
      // }
      this.doRequest(query).then((response) => {
        const frame = new MutableDataFrame({
          // meta: {} as any,
          refId: query.refId,
          fields: [
            { name: 'Time', type: FieldType.time },
            { name: 'Value', type: FieldType.number },
          ],
        });
        console.log(response.readings);
        response.readings.forEach((point: any) => {
          console.log(point.origin, point.value);
          frame.appendRow([point.origin / 1000000, Number(point.value)]);
        });

        return frame;
      });
    });

    return Promise.all(promises).then((data) => ({ data }));
  }

  async testDatasource() {
    let url = `${this.url}${this.routePath}/api/v2/ping`;

    return getBackendSrv()
      .get(url)
      .then(() => {
        return { status: 'success', message: 'EdgeXFoundry Connection OK' };
      })
      .catch((err: any) => {
        let msg = 'EdgeXFoundry Unreachable';
        if (err.message) {
          return { status: 'error', message: `${msg}, ${err.message}` };
        } else {
          return { status: 'error', message: `${err.status}, ${err.statusText}, ${msg}` };
        }
      });
  }
}

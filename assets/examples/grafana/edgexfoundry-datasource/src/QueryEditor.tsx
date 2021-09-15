import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './datasource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onDeviceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, deviceName: event.target.value });
    // executes the query
    // onRunQuery();
  };

  onResourceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, resourceName: event.target.value });
    // executes the query
    // onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { deviceName, resourceName } = query;

    return (
      <div className="gf-form">
        <FormField
          labelWidth={8}
          value={deviceName}
          onChange={this.onDeviceNameChange}
          label="deviceName"
          type="string"
        />
        <FormField
          width={4}
          value={resourceName}
          onChange={this.onResourceNameChange}
          label="resourceName"
          type="string"
        />
      </div>
    );
  }
}

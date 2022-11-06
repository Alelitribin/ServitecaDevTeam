import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {Llaves} from '../config/llaves';

//'mongodb+srv://betonarmo:X50QfCEjMy21KWhg@mintics2022.dthpinf.mongodb.net/servitecadevteam?retryWrites=true&w=majority'

const config = {
  name: 'serviteca',
  connector: 'mongodb',
  url: `${Llaves.cadenaConexion}`,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ServitecaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'serviteca';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.serviteca', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}

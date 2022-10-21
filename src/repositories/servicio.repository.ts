import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {Servicio, ServicioRelations} from '../models';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.Id,
  ServicioRelations
> {
  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource,
  ) {
    super(Servicio, dataSource);
  }
}

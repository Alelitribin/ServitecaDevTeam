import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {VentaServicio, VentaServicioRelations} from '../models';

export class VentaServicioRepository extends DefaultCrudRepository<
  VentaServicio,
  typeof VentaServicio.prototype.Id,
  VentaServicioRelations
> {
  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource,
  ) {
    super(VentaServicio, dataSource);
  }
}

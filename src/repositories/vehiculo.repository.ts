import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations} from '../models';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.Id,
  VehiculoRelations
> {
  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource,
  ) {
    super(Vehiculo, dataSource);
  }
}

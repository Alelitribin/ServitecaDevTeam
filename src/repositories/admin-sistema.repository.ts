import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {AdminSistema, AdminSistemaRelations} from '../models';

export class AdminSistemaRepository extends DefaultCrudRepository<
  AdminSistema,
  typeof AdminSistema.prototype.Id,
  AdminSistemaRelations
> {
  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource,
  ) {
    super(AdminSistema, dataSource);
  }
}

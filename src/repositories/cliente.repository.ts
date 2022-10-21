import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ServitecaDataSource} from '../datasources';
import {Cliente, ClienteRelations} from '../models';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.Id,
  ClienteRelations
> {
  constructor(
    @inject('datasources.serviteca') dataSource: ServitecaDataSource,
  ) {
    super(Cliente, dataSource);
  }
}

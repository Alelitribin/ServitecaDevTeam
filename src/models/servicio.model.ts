import {Entity, model, property} from '@loopback/repository';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoServicio?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  costoServicio: string;


  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;

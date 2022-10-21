import {Entity, model, property} from '@loopback/repository';

@model()
export class VentaServicio extends Entity {
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
  codigoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  placaVehiculo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaServicio: string;

  @property({
    type: 'number',
    required: true,
  })
  valorServicio: number;


  constructor(data?: Partial<VentaServicio>) {
    super(data);
  }
}

export interface VentaServicioRelations {
  // describe navigational properties here
}

export type VentaServicioWithRelations = VentaServicio & VentaServicioRelations;

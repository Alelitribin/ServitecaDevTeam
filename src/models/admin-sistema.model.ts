import {Entity, model, property} from '@loopback/repository';

@model()
export class AdminSistema extends Entity {
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
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<AdminSistema>) {
    super(data);
  }
}

export interface AdminSistemaRelations {
  // describe navigational properties here
}

export type AdminSistemaWithRelations = AdminSistema & AdminSistemaRelations;

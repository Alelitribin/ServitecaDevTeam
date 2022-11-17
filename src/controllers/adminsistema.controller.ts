import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {AdminSistema, Credenciales} from '../models';
import {AdminSistemaRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');


export class AdminSitemaController {
  constructor(
    @repository(AdminSistemaRepository)
    public adminSistemaRepository: AdminSistemaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService
  ) { }

  @post('/admin/identificar')
  @response(200, {
    description: 'Identificación de usuarios'
  })
  async identificar(
    @requestBody() creds: Credenciales
  ) {
    const a = await
      this.servicioAutenticacion.IdentificarAdminSistema(creds.usuario,
        creds.clave);

    if (a) {
      const token = this.servicioAutenticacion.GenerarTokenJWT(a)
      return {
        datos: {nombre: a.nombre, email: a.email, id: a.Id},
        tk: token
      }
    } else {
      throw new HttpErrors[401]('Datos invalidos');
    }

  }

  @post('/admin')
  @response(200, {
    description: 'AdminSistema model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdminSistema)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdminSistema, {
            title: 'NewAdminSistema',
            exclude: ['Id'],
          }),
        },
      },
    })
    adminSistema: Omit<AdminSistema, 'id'>,
  ): Promise<AdminSistema> {
    //return this.adminSistemaRepository.create(adminSistema);
    // reemplazar linea anterior por:
    const clave = this.servicioAutenticacion.GenerarClave();
    const cifrada = this.servicioAutenticacion.CifrarClave(clave);
    adminSistema.clave = cifrada;
    const a = await this.adminSistemaRepository.create(adminSistema);
    const destino = adminSistema.email;
    const asunto = 'Registro en la plataforma';
    const contenido = `Hola ${adminSistema.nombre}, su usuario es:
    ${adminSistema.email} y su contraseña es: ${clave}`;

    fetch(`${Llaves.urlServicioCorreo}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      //fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
    return a;
  }

  @get('/admin/count')
  @response(200, {
    description: 'AdminSistema model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdminSistema) where?: Where<AdminSistema>,
  ): Promise<Count> {
    return this.adminSistemaRepository.count(where);
  }

  @get('/admin')
  @response(200, {
    description: 'Array of AdminSistema model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdminSistema, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdminSistema) filter?: Filter<AdminSistema>,
  ): Promise<AdminSistema[]> {
    return this.adminSistemaRepository.find(filter);
  }

  @patch('/admin')
  @response(200, {
    description: 'AdminSistema PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdminSistema, {partial: true}),
        },
      },
    })
    adminSistema: AdminSistema,
    @param.where(AdminSistema) where?: Where<AdminSistema>,
  ): Promise<Count> {
    return this.adminSistemaRepository.updateAll(adminSistema, where);
  }

  @get('/admin/{id}')
  @response(200, {
    description: 'AdminSistema model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdminSistema, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AdminSistema, {exclude: 'where'}) filter?: FilterExcludingWhere<AdminSistema>
  ): Promise<AdminSistema> {
    return this.adminSistemaRepository.findById(id, filter);
  }

  @patch('/admin/{id}')
  @response(204, {
    description: 'AdminSistema PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdminSistema, {partial: true}),
        },
      },
    })
    adminSistema: AdminSistema,
  ): Promise<void> {
    await this.adminSistemaRepository.updateById(id, adminSistema);
  }

  @put('/admin/{id}')
  @response(204, {
    description: 'AdminSistema PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() adminSistema: AdminSistema,
  ): Promise<void> {
    await this.adminSistemaRepository.replaceById(id, adminSistema);
  }

  @del('/admin/{id}')
  @response(204, {
    description: 'AdminSistema DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.adminSistemaRepository.deleteById(id);
  }
}

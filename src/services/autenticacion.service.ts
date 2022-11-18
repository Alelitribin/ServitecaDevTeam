import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {AdminSistema} from '../models';
import {AdminSistemaRepository} from '../repositories';

const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdminSistemaRepository)
    public adminSistemaRepository: AdminSistemaRepository
  ) { }


  // eslint-disable-next-line @typescript-eslint/naming-convention
  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CifrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  IdentificarAdminSistema(usuario: string, clave: string) {
    try {
      let p = this.adminSistemaRepository.findOne({
        where: {
          email: usuario,
          clave: clave
        }
      });
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  GenerarTokenJWT(admin: AdminSistema) {
    const token = jwt.sign({
      data: {
        id: admin.Id,
        email: admin.email,
        nombre: admin.nombre + " " + admin.apellido
      }
    },
      Llaves.llaveJWT);
    return token;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  ValidarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, Llaves.llaveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}

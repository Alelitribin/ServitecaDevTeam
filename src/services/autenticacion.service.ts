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


  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CifrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

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

  GenerarTokenJWT(admin: AdminSistema) {
    let token = jwt.sign({
      data: {
        id: admin.Id,
        email: admin.email,
        nombre: admin.nombre + " " + admin.apellido
      }
    },
      Llaves.llaveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.llaveJWT);
      return datos;
    } catch {
      return false;
    }
  }

}

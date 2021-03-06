import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HospitalizacionModel } from '../definiciones/hospitalizacion.model';
import { HospitalizacionModule } from '../modulos/hospitalizacion/hospitalizacion.module';

@Injectable({
  providedIn: 'root'
})
export class HospitalizacionService {

  constructor(private httpCliente:HttpClient) { }

  async listarTodos(): Promise<HospitalizacionModel[]> {
    const res = await this.httpCliente.get<any>("http://localhost:9094/hospitalizaciones").toPromise();
    return res;
  }

  async registrar( hospitalizacion:HospitalizacionModule): Promise<HospitalizacionModel> {
    const res = await this.httpCliente.post<any>("http://localhost:9094/hospitalizaciones", hospitalizacion).toPromise();
    return res;
  }
}

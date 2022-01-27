import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServicioModel } from '../definiciones/servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private httpCliente: HttpClient) { }

  async listarPor( areaMedicaId:number ): Promise<ServicioModel[]> {
    const res = await this.httpCliente.get<any>(`http://localhost:9094/servicios/${areaMedicaId}/areas-medicas`).toPromise();
    return res;
  }
}

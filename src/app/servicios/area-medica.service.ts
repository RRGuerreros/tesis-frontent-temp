import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AreaMedicaModel } from '../definiciones/area-medica.model';

@Injectable({
  providedIn: 'root'
})
export class AreaMedicaService {

  constructor(private httpCliente: HttpClient) { }

  async listarTodos(): Promise<AreaMedicaModel[]> {
    const res = await this.httpCliente.get<any>("http://localhost:9094/areas-medicas").toPromise();
    return res;
  }

}

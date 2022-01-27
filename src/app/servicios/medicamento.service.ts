import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedicamentoModel } from '../definiciones/medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  constructor(private httpCliente: HttpClient) { }

  async listarTodos(): Promise<MedicamentoModel[]> {
    const res = await this.httpCliente.get<any>("http://localhost:9094/medicamentos").toPromise();
    return res;
  }
}

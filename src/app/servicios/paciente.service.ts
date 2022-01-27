import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PacienteModel } from '../definiciones/paciente.model';
import { PaginadorModel } from '../definiciones/paginador.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor( private httpCliente:HttpClient) { }

  async listar( parametros:any ): Promise<PaginadorModel> {
    const paginador = await this.httpCliente.post<any>("http://localhost:9094/pacientes/paginado", parametros ).toPromise();
    return paginador;
  }

  async registrar( pacienteModel: PacienteModel ): Promise<PacienteModel>{
    return await this.httpCliente.post<any>("http://localhost:9094/pacientes", pacienteModel).toPromise();
  }

  async eliminar( pacienteId:number ): Promise<PacienteModel>{
    return await this.httpCliente.delete<any>(`http://localhost:9094/pacientes/${pacienteId}`).toPromise();
  }

  async buscarPorId( pacienteId:number ): Promise<PacienteModel>{
    return await this.httpCliente.get<any>(`http://localhost:9094/pacientes/${pacienteId}`).toPromise();
  }

  async editar( pacienteModel: PacienteModel ): Promise<PacienteModel>{
    return await this.httpCliente.put<any>("http://localhost:9094/pacientes", pacienteModel).toPromise();
  }

  async buscarPor( numeroDocumento:string ): Promise<PacienteModel>{
    return await this.httpCliente.get<any>(`http://localhost:9094/pacientes/documentos/${numeroDocumento}`).toPromise();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PacienteModel } from 'src/app/definiciones/paciente.model';
import { PacienteService } from 'src/app/servicios/paciente.service';
import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { HcCrearDetalleMedicacionComponent } from '../hc-crear-detalle-medicacion/hc-crear-detalle-medicacion.component';
import { HcListarMedicacionComponent } from '../hc-listar-medicacion/hc-listar-medicacion.component';

@Component({
  selector: 'app-actualizar-historia-clinica',
  templateUrl: './actualizar-historia-clinica.component.html',
  styleUrls: ['./actualizar-historia-clinica.component.css']
})
export class ActualizarHistoriaClinicaComponent implements OnInit {

  form: FormGroup;
  pacienteId: number = null;
  historiaClinicaId: number = null;

  @ViewChild(HcListarMedicacionComponent) HCLM: HcListarMedicacionComponent;

  constructor(
    private routerActived: ActivatedRoute
  ) { 
    this.pacienteId = this.routerActived.snapshot.params.pacienteId;
    this.historiaClinicaId = this.routerActived.snapshot.params.historiaClinicaId;
  }

  async ngOnInit(): Promise<any> { }
}

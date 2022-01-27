import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DetalleMedicacionModel } from 'src/app/definiciones/detalle-medicacion.model';
import { DosisMedicacionModel } from 'src/app/definiciones/dosis-medicacion.model';
import { MedicamentoModel } from 'src/app/definiciones/medicamento.model';
import { DosisMedicacionService } from 'src/app/servicios/dosis-medicacion.service';
import { LoginService } from 'src/app/servicios/login.service';
import { MedicacionService } from 'src/app/servicios/medicacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-hospitalizacion',
  templateUrl: './edit-hospitalizacion.component.html',
  styleUrls: ['./edit-hospitalizacion.component.css']
})
export class EditHospitalizacionComponent implements OnInit {

  cargando = true;
  mensajeCarga = "Cargando datos...";
  columnasDetalleMedicacion: string [] = ["medicamento", "indicaciones", "dosis", "frecuencia", "via"];
  columnasDosis: string [] = ["numeroDosis", "fechaDosis", "horaDosis", "medicamento"];
  dataSourceMedicamentos: DetalleMedicacionModel[] = [];
  dataSourceDosis: DosisMedicacionModel[] = [];
  historiaClinicaId: number = null;

  @ViewChild(MatTable) matTableDetalleMedicacion: MatTable<DetalleMedicacionModel>;

  /*
    detalleMedicacionId: number = null;
    frecuencia: string = null;
    dosis: string = null;
    via: string = null;
    siguienteDosis: string = null;
    indicaciones: string = null;
    medicacion: MedicacionModel = null;
    medicamento: MedicamentoModel = null;
  
  */
  constructor(
    private medicacionService: MedicacionService,
    private dosisMedicacionService: DosisMedicacionService,
    private routerActived: ActivatedRoute,
    private authService: LoginService
  ) { 

    this.routerActived.queryParams.subscribe( res => {
      this.historiaClinicaId = res.historiaClinicaId;
    });

    if(this.tienePermisoRol("ROLE_MARCAR_DOSIS_HOSPITALIZACION","HOSPITALIZACION"))
      this.columnasDosis.push("acciones");
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  async ngAfterViewInit(): Promise<void> {}
  
  async cargarDatos(): Promise<void> {
    this.cargando = true;
    this.dataSourceMedicamentos = await this.medicacionService.listarUltimaMedicacion(this.historiaClinicaId);
    this.dataSourceDosis = await this.dosisMedicacionService.listarSiguienteMedicacion(this.historiaClinicaId);
    this.cargando = false;
  }

  dosisRealizada( dosis: DosisMedicacionModel ){
    Swal.fire({
      title: `¿Se realizó la medicación de ${dosis.detalleMedicacion.medicamento.nombre} al paciente?`,
      text: 'Al presionar si, se procede a actualizar.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar.',
      cancelButtonText: 'No, cancelar'
    }).then( async (result) => {
      if (result.value) {
        try {
          this.cargando = true;
          this.mensajeCarga = "Actualizando dosis...";
          await this.dosisMedicacionService.actualizar(dosis.dosisMedicacionId);
          this.cargarDatos();          
          Swal.fire('Éxito!','Se guardó la dosis realizada correctamente.','success');
        } catch (error) {
          Swal.fire('Error!','hubo un problema al eliminar.','error');
        }
      }
    });

  }

  tienePermisoRol( codigoRol:string, codigoModulo: string ): boolean{
    const tienePermiso = this.authService.validarPermisoRol(codigoRol, codigoModulo);
    return tienePermiso;
  }

  getDosisMedicacion1(): DosisMedicacionModel {
    let dm = new DosisMedicacionModel();
    dm.dosisMedicacionId = 1;
    dm.fechaDosis = "2021-01-01";
    dm.horaDosis = "08:00";
    dm.numeroDosis = 1;
    dm.detalleMedicacion = this.getDetalleMedicamento1();
    return dm;
  }
  getDosisMedicacion2(): DosisMedicacionModel {
    let dm = new DosisMedicacionModel();
    dm.dosisMedicacionId = 2;
    dm.fechaDosis = "2021-01-01";
    dm.horaDosis = "08:00";
    dm.numeroDosis = 1;
    dm.detalleMedicacion = this.getDetalleMedicamento2();
    return dm;
  }


  getDetalleMedicamento1() : DetalleMedicacionModel{
    let dm = new DetalleMedicacionModel();
    dm.medicamento = new MedicamentoModel();
    dm.medicamento.nombre = "paracetamol";
    dm.medicamento.medicamentoId = 10;
    dm.dosis = "1 unidad";
    dm.frecuencia = 8;
    dm.indicaciones = "sin problemas";
    dm.via = "oral";    
    return dm;
  }

  getDetalleMedicamento2(): DetalleMedicacionModel{
    let dm = new DetalleMedicacionModel();
    dm.medicamento = new MedicamentoModel();
    dm.medicamento.nombre = "amoxicilina";
    dm.medicamento.medicamentoId = 11;
    dm.dosis = "1 unidad";
    dm.frecuencia = 8;
    dm.indicaciones = "comer antes";
    dm.via = "oral";   
    return dm; 
  }

}

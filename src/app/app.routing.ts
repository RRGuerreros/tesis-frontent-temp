import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccesoModuloGuard } from './guard/acceso-modulo.guard';
import { AuthGuard } from './guard/auth.guard';
import { SidebarComponent } from './modulos/estructura/sidebar/sidebar.component';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () =>
      import("./modulos/authenticacion/authenticacion.module").then(
         (m) => m.AuthenticacionModule )
  },
  { path: "",   
    redirectTo: '/reporte/principal', 
    pathMatch: 'full' 
  },
  {
    path: "",
    component: SidebarComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AccesoModuloGuard],
    children: [
      {
        path: "personal-medico",
        loadChildren: () =>
          import("./modulos/personal-medico/personal-medico.module").then(
            (m) => m.PersonalMedicoModule
          ),
        canActivate: [],
        data: { codigoModulo: "PERSONAL_MEDICO" },
      },
      {
        path: "paciente",
        loadChildren: () =>
          import("./modulos/paciente/paciente.module").then(
            (m) => m.PacienteModule
          ),
        canActivate: [],
        data: { codigoModulo: "PACIENTE" },
      },
      {
        path: "cita-medica",
        loadChildren: () =>
          import("./modulos/cita-medica/cita-medica.module").then(
            (m) => m.CitaMedicaModule
          ),
        canActivate: [],
        data: { codigoModulo: "CITA_MEDICA" },
      },
      {
        path: "hospitalizacion",
        loadChildren: () =>
          import("./modulos/hospitalizacion/hospitalizacion.module").then(
            (m) => m.HospitalizacionModule
          ),
        canActivate: [],
        data: { codigoModulo: "HOSPITALIZACION" },
      },
      {
        path: "historia-clinica",
        loadChildren: () =>
          import("./modulos/historia-clinica/historia-clinica.module").then(
            (m) => m.HistoriaClinicaModule
          ),
        canActivate: [],
        data: { codigoModulo: "HISTORIA_CLINICA" },
      },
      {
        path: "usuario",
        loadChildren: () =>
          import("./modulos/usuario/usuario.module").then(
            (m) => m.UsuarioModule
          ),
        canActivate: [],
        data: { codigoModulo: "USUARIOS" },
      },
      {
        path: "reporte",
        loadChildren: () =>
          import("./modulos/reportes/reportes.module").then(
            (m) => m.ReportesModule
          ),
        canActivate: [],
        data: { codigoModulo: "USUARIOS" },
      }
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
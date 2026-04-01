import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EquipoService } from '../../../../service/equipo';
import { NotificacionService } from '../../../../service/notificacion';;
import { EquipoTeamadminDetail } from '../../../../component/equipo/teamadmin/detail/detail';

@Component({
  selector: 'app-equipo-teamadmin-delete-page',
  imports: [EquipoTeamadminDetail],
  templateUrl: './delete.html',
})
export class EquipoTeamadminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private equipoService = inject(EquipoService);
  private notificacion = inject(NotificacionService);
  error = signal<string | null>(null);
  id_equipo = signal<number>(0);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(id ? Number(id) : NaN);
    if (isNaN(this.id_equipo())) this.error.set('ID no válido');
  }

  doDelete(): void {
    this.equipoService.delete(this.id_equipo()).subscribe({
      next: () => {
        this.notificacion.info('Equipo eliminado/a');
        this.router.navigate(['/equipo/teamadmin']);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error eliminando el registro');
        this.notificacion.error('Error eliminando el registro');
        console.error(err);
      },
    });
  }

  doCancel(): void { window.history.back(); }
}

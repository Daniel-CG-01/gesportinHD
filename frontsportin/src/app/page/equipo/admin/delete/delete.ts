import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificacionService } from '../../../../service/notificacion';;
import { EquipoAdminDetail } from '../../../../component/equipo/admin/detail/detail';
import { EquipoService } from '../../../../service/equipo';

@Component({
  selector: 'app-equipo-admin-delete-page',
  imports: [EquipoAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class EquipoAdminDeletePage implements OnInit {
  private route = inject(ActivatedRoute);
  private oEquipoService = inject(EquipoService);
  private notificacion = inject(NotificacionService);

  id_equipo = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_equipo.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_equipo())) {
      this.error.set('ID no válido');
      return;
    }
  }

  doDelete() {
    this.oEquipoService.delete(this.id_equipo()).subscribe({
      next: (data: any) => {
        this.notificacion.info('Equipo eliminado');
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error eliminando el equipo');
        this.notificacion.error('Error eliminando el equipo');
        console.error(err);
      },
    });
  }

  doCancel() {
    window.history.back();
  }
}

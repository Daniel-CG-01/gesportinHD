import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PuntuacionService } from '../../../../service/puntuacion';
import { NotificacionService } from '../../../../service/notificacion';;
import { PuntuacionAdminDetail } from '../../../../component/puntuacion/admin/detail/detail';

@Component({
  selector: 'app-puntuacion-admin-delete-page',
  imports: [PuntuacionAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class PuntuacionAdminDeletePage {
  private route = inject(ActivatedRoute);
  private puntuacionService = inject(PuntuacionService);
  private notificacion = inject(NotificacionService);

  id_puntuacion = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_puntuacion.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_puntuacion())) {
      this.error.set('ID no válido');
      return;
    }
  }

  doDelete(): void {
    this.puntuacionService.delete(this.id_puntuacion()).subscribe({
      next: () => {
        this.notificacion.info('Puntuación eliminada');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando la puntuación');
        this.notificacion.error('Error eliminando la puntuación');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}

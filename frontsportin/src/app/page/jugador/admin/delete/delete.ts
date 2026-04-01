import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JugadorService } from '../../../../service/jugador-service';
import { NotificacionService } from '../../../../service/notificacion';;
import { JugadorAdminDetail } from '../../../../component/jugador/admin/detail/detail';

@Component({
  selector: 'app-jugador-admin-delete-page',
  imports: [JugadorAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class JugadorAdminDeletePage {
  private route = inject(ActivatedRoute);
  private jugadorService = inject(JugadorService);
  private notificacion = inject(NotificacionService);

  id_jugador = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de jugador no válido');
      return;
    }
    this.id_jugador.set(id);
  }

  doDelete(): void {
    this.jugadorService.delete(this.id_jugador()).subscribe({
      next: () => {
        this.notificacion.info('Jugador eliminado');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando el jugador');
        this.notificacion.error('Error eliminando el jugador');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}

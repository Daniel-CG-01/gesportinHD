import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartidoService } from '../../../../service/partido';
import { NotificacionService } from '../../../../service/notificacion';;
import { PartidoAdminDetail } from '../../../../component/partido/admin/detail/detail';

@Component({
  selector: 'app-partido-admin-delete-page',
  imports: [PartidoAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class PartidoAdminDeletePage {
  private route = inject(ActivatedRoute);
  private partidoService = inject(PartidoService);
  private notificacion = inject(NotificacionService);

  id_partido = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de partido no válido');
      return;
    }
    this.id_partido.set(id);
  }

  doDelete(): void {
    this.partidoService.delete(this.id_partido()).subscribe({
      next: () => {
        this.notificacion.info('Partido eliminado');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando el partido');
        this.notificacion.error('Error eliminando el partido');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}

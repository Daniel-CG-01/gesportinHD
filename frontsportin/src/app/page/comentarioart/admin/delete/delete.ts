import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComentarioartService } from '../../../../service/comentarioart';
import { NotificacionService } from '../../../../service/notificacion';;
import { ComentarioartAdminDetail } from '../../../../component/comentarioart/admin/detail/detail';

@Component({
  selector: 'app-comentarioart-admin-delete-page',
  imports: [ComentarioartAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class ComentarioartAdminDeletePage {
  private route = inject(ActivatedRoute);
  private comentarioartService = inject(ComentarioartService);
  private notificacion = inject(NotificacionService);

  id_comentarioart = signal<number>(0);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (isNaN(id) || id <= 0) {
      this.error.set('ID de comentario de artículo no válido');
      return;
    }
    this.id_comentarioart.set(id);
  }

  doDelete(): void {
    this.comentarioartService.delete(this.id_comentarioart()).subscribe({
      next: () => {
        this.notificacion.info('Comentario de artículo eliminado');
        window.history.back();
      },
      error: (err) => {
        this.error.set('Error eliminando el comentario de artículo');
        this.notificacion.error('Error eliminando el comentario de artículo');
        console.error(err);
      },
    });
  }

  doCancel(): void {
    window.history.back();
  }
}

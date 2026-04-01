import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from '../../../../service/noticia';
import { NotificacionService } from '../../../../service/notificacion';;
import { INoticia } from '../../../../model/noticia';
import { HttpErrorResponse } from '@angular/common/http';
import { NoticiaAdminDetail } from '../../../../component/noticia/admin/detail/detail';

@Component({
  selector: 'app-noticia-admin-delete-page',
  imports: [NoticiaAdminDetail],
  templateUrl: './delete.html',
  styleUrl: './delete.css',
})
export class NoticiaAdminDeletePage {

  private route = inject(ActivatedRoute);
  private oNoticiaService = inject(NoticiaService);
  private notificacion = inject(NotificacionService);

  oNoticia = signal<INoticia | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  id_noticia = signal<number>(0);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id_noticia.set(idParam ? Number(idParam) : NaN);
    if (isNaN(this.id_noticia())) {
      this.error.set('ID no válido');
      this.loading.set(false);
      return;
    }
  }

  doDelete() {
    this.oNoticiaService.delete(this.id_noticia()).subscribe({
      next: (data: any) => {
        this.notificacion.info('Noticia eliminada');
        console.log('Noticia eliminada');
        window.history.back();
      },
      error: (err: HttpErrorResponse) => {
        this.error.set('Error eliminando la noticia');
        this.notificacion.error('Error eliminando la noticia');
        console.error(err);
      },
    });
  }

  doCancel() {
    window.history.back();
  }
}

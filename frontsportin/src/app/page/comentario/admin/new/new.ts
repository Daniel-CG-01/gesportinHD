import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../../service/notificacion';;
import { ComentarioAdminForm } from '../../../../component/comentario/admin/form/form';

@Component({
  selector: 'app-comentario-admin-new-page',
  imports: [CommonModule, ComentarioAdminForm],
  templateUrl: './new.html',
  styleUrl: './new.css',
})
export class ComentarioAdminNewPage {
  private router = inject(Router);

  onFormSuccess(): void {
    this.router.navigate(['/comentario']);
  }

  onFormCancel(): void {
    this.router.navigate(['/comentario']);
  }
}

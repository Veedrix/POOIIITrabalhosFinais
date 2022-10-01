import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { livrosFirebaseService } from 'src/app/services/livro-firebase.service';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  livros: Livro[];

  constructor(
    private router: Router,
    private livroFs: livrosFirebaseService,
  ) {
    this.carregarLivro();
  }
  carregarLivro() {
    this.livroFs.getLivros().subscribe((res) => {
      this.livros = res.map((c) => {
        return {
          id: c.payload.doc.id,
          ...(c.payload.doc.data() as Livro),
        } as Livro;
      });
    });
  }
  irParaCadastrar() {
    this.router.navigate(['cadastrar']);
  }
  irParaDetalhar(livro: Livro) {
    this.router.navigateByUrl('/detalhar', { state: { objeto: livro } });
  }
}

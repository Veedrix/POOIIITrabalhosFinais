import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../../models/Livro';
import { LivroServices } from '../../services/Livro.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  livros: Livro[];

  constructor(
    private router: Router,
    private livroService: LivroServices) {
    this.livros = this.livroService.Livros;
  }

  irParaCadastrar() {
    this.router.navigate(['cadastrar']);
  }
  irParaDetalhar(livro: Livro) {
    this.router.navigateByUrl("/detalhar",
      { state: { objeto: livro } })
  }
}
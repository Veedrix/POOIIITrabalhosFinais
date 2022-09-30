import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { livrosFirebaseService } from 'src/app/services/livro-firebase.service';
import { Livro } from '../../models/Livro';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  searchBook: string;
  livros: Livro[];

  constructor(
    private router: Router,
    private livroFs: livrosFirebaseService,
    private alertController: AlertController
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
  Detalhar(livro: Livro) {
    this.presentAlertConfirm(
      'Livraria',
      'Detalhes livro',
      'Deseja ver os detalhes do livro?',
      livro
    );
  }
  async presentAlertConfirm(
    header: string,
    subHeader: string,
    message: string,
    livro: Livro
  ) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message:
        message + '<br> Nome: ' + livro.nome + '<br> Autor: ' + livro.autor,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.irParaDetalhar(livro);
          },
        },
      ],
    });

    await alert.present();
  }
}

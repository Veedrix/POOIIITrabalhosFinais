import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Livro } from 'src/app/models/Livro';
import { livrosFirebaseService } from 'src/app/services/livro-firebase.service';
import { LivroServices } from 'src/app/services/Livro.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  livro: Livro;
  openEdit: boolean = true;
  data: string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private livroFS: livrosFirebaseService,
    private loadingCtrl: LoadingController,
    private formBuider: FormBuilder
  ) {}

  iniciarForm() {
    this.form_cadastrar = this.formBuider.group({
      nome: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      edicao: [
        '',
        [Validators.required, Validators.min(1), Validators.max(50)],
      ],
      paginas: [
        '',
        [Validators.required],
        Validators.min(1),
        Validators.max(10000),
      ],
      genero: ['', [Validators.required]],
      subGenero: ['', [Validators.required]],
      data_lancamento: ['', [Validators.required]],
      editora: ['', [Validators.required]],
      encadernacao: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.form_cadastrar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_cadastrar.valid) {
      this.presentAlert(
        'Livraria',
        'Error',
        'Todos os campos são Obrigatórios!'
      );
      return false;
    } else {
      this.editar();
    }
  }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    this.livro = nav.extras.state.objeto;
    this.data = new Date().toISOString();
    this.iniciarForm();
  }
  editar() {
    this.showLoading('Aguarde', 10000);
    this.livroFS
      .editarLivro(this.form_cadastrar.value, this.livro.id)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Livraria', 'Sucesso', 'Livro Editado com sucesso!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Livraria', 'Error', 'livro não encontrado!');
        console.log(error);
      });
  }

  excluir() {
    this.presentAlertConfirm(
      'Livraria',
      'Exluir livro',
      'Você realmente deseja excluir o livro?'
    );
  }

  private excluirlivro() {
    this.showLoading('Aguarde', 10000);
    this.livroFS
      .excluirlivros(this.livro)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Livraria', 'Sucesso', 'Livro Excluido com sucesso!');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Livraria', 'Excluir', 'livro não encontrado!');
        console.log(error);
      });
  }

  liberarEdicao() {
    if (this.openEdit) {
      this.openEdit = false;
    } else {
      this.openEdit = true;
    }
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async presentAlertConfirm(
    header: string,
    subHeader: string,
    message: string
  ) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
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
            this.excluirlivro();
          },
        },
      ],
    });

    await alert.present();
  }
  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }
}

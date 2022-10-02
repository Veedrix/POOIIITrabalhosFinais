import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Livro } from 'src/app/models/Livro';
import { livrosFirebaseService } from 'src/app/services/livro-firebase.service';

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
  imagem: any; //Alteração teste image

  constructor(
    private alertController: AlertController,
    private router: Router,
    private livroFS: livrosFirebaseService,
    private loadingCtrl: LoadingController,
    private formBuider: FormBuilder
  ) {}

  iniciarForm() {
    this.form_cadastrar = this.formBuider.group({
      nome: [this.livro.nome, [Validators.required]],
      autor: [this.livro.autor, [Validators.required]],
      edicao: [
        this.livro.edicao,
        [Validators.required, Validators.min(1), Validators.max(50)],
      ],
      paginas: [
        this.livro.paginas,
        [Validators.required, Validators.min(1), Validators.max(10000)],
      ],
      genero: [this.livro.genero, [Validators.required]],
      subGenero: [this.livro.subGenero, [Validators.required]],
      data_lancamento: [this.livro.data_lancamento, [Validators.required]],
      editora: [this.livro.editora, [Validators.required]],
      encadernacao: [this.livro.encadernacao, [Validators.required]],
      //Alteração teste imagem
      imagem: [this.livro.downloadURL, [Validators.required]],
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
        'Erro',
        'Todos os campos são Obrigatórios!'
      );
      return false;
    } else {
      this.editar();
    }
  }

  ngOnInit() {
    this.data = new Date().toISOString();
    const nav = this.router.getCurrentNavigation();
    this.livro = nav.extras.state.objeto;
    console.log(this.livro.encadernacao);
    this.iniciarForm();
  }

  liberarEdicao() {
    if (this.openEdit) {
      this.openEdit = false;
    } else {
      this.openEdit = true;
    }
  }

  editar() {
    this.showLoading('Aguarde', 10000);
    this.livroFS
      //.editarLivro(this.form_cadastrar.value, this.livro.id) //original
      //Teste imagem
      .editarImagem(this.imagem, this.form_cadastrar.value, this.livro.id)
      .then(() => {
        this.livroFS.excluirImagemFire(this.downloadFile()); //Incluso
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

  //Teste imagem
  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  downloadFile() {
    return this.livro.downloadURL;
  }
}

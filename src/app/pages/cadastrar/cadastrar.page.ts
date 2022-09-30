import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { livrosFirebaseService } from 'src/app/services/livro-firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  data: string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;
  imagem: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private livroFS: livrosFirebaseService,
    private formBuider: FormBuilder,
    private loadingCtrl: LoadingController
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
        [Validators.required,
        Validators.min(1),
        Validators.max(10000)],
      ],
      genero: ['', [Validators.required]],
      subGenero: ['', [Validators.required]],
      data_lancamento: ['', [Validators.required]],
      editora: ['', [Validators.required]],
      encadernacao: ['', [Validators.required]],
      imagem: ['', [Validators.required]],
    });
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
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
      this.cadastrar();
    }
  }

  ngOnInit() {
    this.data = new Date().toISOString();
    this.iniciarForm();
  }

  private cadastrar() {
    this.showLoading('Aguarde', 10000);
    this.livroFS
      .enviarImage(this.imagem, this.form_cadastrar.value)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.presentAlert(
          'Livraria',
          'Sucesso',
          'Livro Cadastrado com sucesso!'
        );
        this.router.navigate(['/home']);
      })
      .catch((error) =>{
        this.loadingCtrl.dismiss();
        this.presentAlert(
          'Livraria',
          'Error',
          'Todos os campos são Obrigatórios!'
        );
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
  async showLoading(mensagem: string, duracao: number) {
    const loading = await this.loadingCtrl.create({
      message: mensagem,
      duration: duracao,
    });

    loading.present();
  }
}

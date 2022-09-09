import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Livro } from 'src/app/models/Livro';
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
    private livroService: LivroServices,
    private formBuider: FormBuilder
  ) {}

  iniciarForm() {
    this.form_cadastrar = this.formBuider.group({
      nome: [this.livro.nome, [Validators.required]],
      autor: [this.livro.autor, [Validators.required]],
      edicao: [this.livro.edicao, [Validators.required]],
      paginas: [this.livro.paginas, [Validators.required]],
      genero: [this.livro.genero, [Validators.required]],
      subGenero: [this.livro.subGenero, [Validators.required]],
      data_lancamento: [this.livro.data_lancamento, [Validators.required]],
      editora: [this.livro.editora, [Validators.required]],
      encadernacao: [this.livro.encadernacao, [Validators.required]],
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
    if (!this.form_cadastrar.valid) {
      this.presentAlert(
        'Livraria',
        'Error',
        'Todos os campos são Obrigatórios!'
      );
    } else {
      if (
        this.livroService.editar(
          this.livro,
          this.form_cadastrar.value.nome,
          this.form_cadastrar.value.autor,
          this.form_cadastrar.value.edicao,
          this.form_cadastrar.value.paginas,
          this.form_cadastrar.value.data_lancamento,
          this.form_cadastrar.value.genero,
          this.form_cadastrar.value.subGenero,
          this.form_cadastrar.value.editora,
          this.form_cadastrar.value.encadernacao
        )
      ) {
        this.router.navigate(['/home']);
        this.presentAlert('Livraria', 'Sucesso', 'Livro Editado com sucesso!');
      } else {
        this.presentAlert('Livraria', 'Error', 'livro não encontrado!');
      }
    }
  }

  excluir() {
    this.presentAlertConfirm(
      'Livraria',
      'Exluir livro',
      'Você realmente deseja excluir o livro?'
    );
  }

  private excluirlivro() {
    if (this.livroService.excluir(this.livro)) {
      this.presentAlert(
        'Livraria',
        'Excluir',
        'Exclusão realizada com Sucesso!'
      );
      this.router.navigate(['/home']);
    } else {
      this.presentAlert('Livraria', 'Excluir', 'livro não encontrado!');
    }
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
}

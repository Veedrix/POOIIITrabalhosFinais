import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LivroServices } from 'src/app/services/Livro.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  data: string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private livroService: LivroServices,
    private formBuider: FormBuilder
  ) { }

  iniciarForm() {
    this.form_cadastrar = this.formBuider.group({
      nome: ["", [Validators.required]],
      autor: ["", [Validators.required]],
      edicao: ["", [Validators.required]],
      paginas: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      subGenero: ["", [Validators.required]],
      data_lancamento: ["", [Validators.required]],
      editora: ["", [Validators.required]],
      encadernacao: ["", [Validators.required]],
    });
  }

  get errorControl() {
    return this.form_cadastrar.controls;
  }

  submitForm(): boolean {
    this.isSubmitted = true;
    if (!this.form_cadastrar.valid) {
      this.presentAlert('Livraria', 'Error', 'Todos os campos são Obrigatórios!');
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
    this.form_cadastrar.value.nome
    this.livroService.inserir(this.form_cadastrar.value);
    this.presentAlert('Livraria', 'Sucesso', 'Livro Cadastrado com sucesso!');
    this.router.navigate(['/home']);
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
}
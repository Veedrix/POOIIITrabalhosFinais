import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Livro } from '../models/livro';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class livrosFirebaseService {
  private PATH: string = 'livros';
  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {}

  getLivro(id: string) {
    return this.angularFirestore.collection(this.PATH).doc(id).valueChanges();
  }

  getLivros() {
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

  inserirLivro(livros: Livro) {
    return this.angularFirestore.collection(this.PATH).add({
      nome: livros.nome,
      autor: livros.autor,
      edicao: livros.edicao,
      paginas: livros.paginas,
      editora: livros.editora,
      data_lancamento: livros.data_lancamento,
      genero: livros.genero,
      subGenero: livros.subGenero,
      downloadURL: livros.downloadURL,
    });
  }

  editarLivro(livros: Livro, id: string) {
    return this.angularFirestore.collection(this.PATH).doc(id).update({
      nome: livros.nome,
      autor: livros.autor,
      edicao: livros.edicao,
      paginas: livros.paginas,
      editora: livros.editora,
      data_lancamento: livros.data_lancamento,
      genero: livros.genero,
      subGenero: livros.subGenero,
    });
  }

  excluirlivros(livros: Livro) {
    return this.angularFirestore.collection(this.PATH).doc(livros.id).delete();
  }
  enviarImage(imagem: any, livros: Livro) {
    const file = imagem.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Tipo não suportado!');
      return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          let uploadedFileURL = fileRef.getDownloadURL();
          uploadedFileURL.subscribe((res) => {
            livros.downloadURL = res;
            this.inserirLivro(livros);
          });
        })
      )
      .subscribe();
    return task;
  }
}

import { Injectable } from '@angular/core';
import { Livro } from '../models/Livro';

@Injectable({
    providedIn: 'root',
})
export class LivroServices {
    private _livros: Livro[] = [];

    constructor() {
    }

    public get Livros(): Livro[] {
        return this._livros;
    }

    public inserir(Livro: Livro) {
        this._livros.push(Livro);
    }

    public editar(
        livro: Livro,
        nome: string,
        autor: string,
        edicao: number,
        paginas: number,
        data_lancamento: string,
        genero: string,
        subGenero: string,
        editora: string,
        encadernacao: string
    ): boolean {
        for (let i = 0; i < this._livros.length; i++) {
            if (this._livros[i].id === livro.id) {
                this._livros[i].nome = nome;
                this._livros[i].autor = autor;
                this._livros[i].edicao = edicao;
                this._livros[i].paginas = paginas;
                this._livros[i].genero = genero;
                this._livros[i].subGenero = subGenero;
                this._livros[i].data_lancamento = data_lancamento;
                this._livros[i].editora = editora;
                this._livros[i].encadernacao = encadernacao;
                return true;
            }
        }
        return false;
    }

    public excluir(livro: Livro): boolean {
        for (let i = 0; i < this._livros.length; i++) {
            if (this._livros[i].id === livro.id) {
                this._livros.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}

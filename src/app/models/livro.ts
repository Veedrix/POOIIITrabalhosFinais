export class Livro {
  private _id: any;
  private _nome: string;
  private _autor: string;
  private _edicao: number;
  private _paginas: number;
  private _editora: string;
  private _data_lancamento: string;
  private _genero: string;
  private _subGenero: string;
  private _encadernacao: string;
  private _downloadURL: any;

  constructor(
    nome: string,
    autor: string,
    edicao: number,
    paginas: number,
    data_lancamento: string,
    genero: string,
    subGenero: string,
    editora: string,
    encadernacao: string
  ) {
    this._nome = nome;
    this._autor = autor;
    this._edicao = edicao;
    this._paginas = paginas;
    this._genero = genero;
    this._subGenero = subGenero;
    this._data_lancamento = data_lancamento;
    this._editora = editora;
    this._encadernacao = encadernacao;
  }

  public get subGenero(): string {
    return this._subGenero;
  }
  public set subGenero(subGenero: string) {
    this._subGenero = subGenero;
  }
  public get id(): any {
    return this._id;
  }
  public get edicao(): number {
    return this._edicao;
  }
  public set edicao(edicao: number) {
    this._edicao = edicao;
  }
  public get paginas(): number {
    return this._paginas;
  }
  public set paginas(paginas: number) {
    this._paginas = paginas;
  }
  public get nome(): string {
    return this._nome;
  }
  public set nome(nome: string) {
    this._nome = nome;
  }
  public get autor(): string {
    return this._autor;
  }
  public set autor(autor: string) {
    this._autor = autor;
  }
  public get editora(): string {
    return this._editora;
  }
  public set editora(editora: string) {
    this._editora = editora;
  }
  public get encadernacao(): string {
    return this._encadernacao;
  }
  public set encadernacao(encadernacao: string) {
    this._encadernacao = encadernacao;
  }
  public get data_lancamento(): string {
    return this._data_lancamento;
  }
  public set data_lancamento(data_lancamento: string) {
    this._data_lancamento = data_lancamento;
  }
  public get genero(): string {
    return this._genero;
  }
  public set genero(genero: string) {
    this._genero = genero;
  }
  public get downloadURL(): any {
    return this._downloadURL;
  }

  public set downloadURL(downloadURL: any) {
    this._downloadURL = downloadURL;
  }
}

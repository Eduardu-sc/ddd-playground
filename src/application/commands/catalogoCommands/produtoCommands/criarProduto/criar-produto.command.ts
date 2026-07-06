export class CriarProdutoCommand{
    constructor(
        public readonly nome:string,
        public readonly codigo:number,
        public readonly preco:number,
        public readonly categoriaId:number,
        public readonly estoqueIncial:number,
        public  readonly Decricao?:string,
    ){
        
    }
}
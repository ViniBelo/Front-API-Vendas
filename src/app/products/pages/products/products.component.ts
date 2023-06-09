import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Product from '../../models/Products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products: Product[] = []
  form_cadastrar: FormGroup
  isSubmitted: boolean = false

  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private router:Router) {
    this.form_cadastrar = formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    })
  }

  ngOnInit(): void{
    console.log(this.listarTodos())
  }

  listarTodos(){
    this.productService.listarTodos().subscribe(
      resultado => {
        this.products = resultado
      }
    )
  }

  cadastrar(){
    this.productService.adicionarProduto(this.form_cadastrar.value).subscribe(
      resultado => {
        console.log('Produto Salvo' + resultado)
        window.location.reload()
      }
    )
  }

  editar(produto: Product){
    console.log(produto.id)
    this.router.navigate(['product-detail', produto.id])
  }

  excluir(produto: Product){
    this.productService.excluirProduto(produto.id).subscribe(
      resultado => {
        console.log(resultado)
        window.location.reload()
      },
      error => {
        console.log(error)
      }
    )
  }

  get errorControl(){
    return this.form_cadastrar?.controls
  }

  submitForm(): boolean{
    this.isSubmitted = true
    if(!this.form_cadastrar.valid){
      return false
    } else{
      this.cadastrar()
      return true
    }
  }
}

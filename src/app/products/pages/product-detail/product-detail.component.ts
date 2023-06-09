import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Product from '../../models/Products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product()
  form_editar: FormGroup
  isSubmitted: boolean = false

  constructor(private productService: ProductsService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.form_editar = formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      quantity: ['', [Validators.required]]
    })
    let id = (String(route.snapshot.paramMap.get('id')))
    productService.listarProduto(id).subscribe(
      resultado => {
        this.product = resultado
        this.form_editar = formBuilder.group({
          name: [this.product.name, [Validators.required]],
          price: [this.product.price, [Validators.required]],
          quantity: [this.product.quantity, [Validators.required]]
        })
      }
    )
  }

  editar(){
    this.productService.editarProduto(this.product.id, this.form_editar.value).subscribe(
      resultado => {
        console.log("Produto Editado")
        this.router.navigate(['products'])
      }
    )
  }

  get errorControl(){
    return this.form_editar?.controls
  }

  submitForm(): boolean{
    this.isSubmitted = true
    if(!this.form_editar.valid){
      return false
    } else{
      this.editar()
      return true
    }
  }

  ngOnInit(): void {
    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ProductService} from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
public productForm!:FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
      this.productForm = this.fb.group({
      //id: this.fb.control(1),  
      name: this.fb.control('',[Validators.required] ),
      price: this.fb.control(0,[Validators.required]),
      checked: this.fb.control(false),
      })
  }

  saveProduct(){
    let product: Product= this.productForm.value;
    this.productService.saveProduct(product)
    .subscribe({
      next: data => {
        alert(JSON.stringify(data));
      },
      error: err => {
        console.log(err);
      }
    });

  }

}

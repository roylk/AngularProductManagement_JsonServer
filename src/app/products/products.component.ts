import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from '../services/product.service';
import { Observable } from 'rxjs';
import {Product} from '../model/product.model';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

public keyword:string = ""
public products:Array<Product>= [];
totalPages:number = 0;
pageSize:number = 3;
currentPage:number = 1;
 //products$!:Observable<Array<Product>>;

  constructor(private productService:ProductService, private router:Router, public appState:AppStateService) { }

  ngOnInit(): void {
//     this.http.get<Array<any>>("http://localhost:8087/products")
     this.getProducts();
    //this.products$=this.productService.getProducts();
  }

  //v1 souscription à la liste de produits
 /*  getProducts(){
    this.productService.getProducts(1,2)
    .subscribe({
      next: data => {
            this.products=data;
            },
      error: err => {
            console.log(err);
      }
    })
  } */
  
  getProducts(){
    this.productService.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.pageSize)
    .subscribe({
      next: (resp) => {
            //this.products=resp.body as Product[]; 
            this.products=this.appState.productsState.products = resp.data;
            //this.products =resp;
            console.log(this.appState.productsState.products)
            console.log(resp)
            //let totalProducts: number = parseInt(resp.headers.get('x-total-count')!)
            //let totalProducts = 4;
            let totalProducts = resp.items
            console.log(totalProducts);
            //this.totalPages = Math.floor(totalProducts/this.pageSize)
            this.totalPages = this.appState.productsState.totalPages= resp.pages;
            console.log(this.appState.productsState.totalPages);
            /*if(totalProducts % this.pageSize != 0){
              this.totalPages = this.totalPages + 1
            }*/
            },
      error: err => {
            console.log(err);
      }
    })
  }

handleCheck(product:Product):void{
    /*this.http.patch<any>(`http://localhost:8087/products/${product.id}`,
     {checked:!product.checked}) */
    this.productService.checkProduct(product)
     .subscribe({
        next: updatedProduct =>{
            product.checked=!product.checked;
          }
     })
    //product.checked=!product.checked;
  }
handleDelete(product:Product){
    if(confirm("Voulez vous supprimer?"))
    this.productService.deleteProduct(product)
    .subscribe({
        next: value =>{
         this.products = this.products.filter(p=>p.id != product.id);
        },
        error: err =>{
          console.log(err);
        }
    })
}

searchProducts(){
    this.currentPage = 1;
    this.totalPages = 0;
    this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize)
    .subscribe({
      next: value=>{
        this.products=value;
        console.log(this.keyword)
        console.log(value)
      },
      error: err =>{
        console.log(err);
      }
    });
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getProducts();
    }


  handleEdit(product: Product) {
      this.router.navigateByUrl(`/editProduct/${product.id}`); 
      }
}

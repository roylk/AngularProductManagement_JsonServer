import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from '../model/product.model'

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  constructor(private http:HttpClient) { }
//version 1 sans la lecture du header
 /* public getProducts(page : number = 1, size : number = 3) :Observable<Product[]> {
     return this.http.get<Product[]>(`http://localhost:8087/products?_page=${page}&_limit=${size}`);
     //return this.http.get <Array<Product>>(`http://localhost:8087/products?_page=${page}&_limit=${size}`,{observe:'response'});

  } */

  public getProducts(keyword : string ="", page : number, size : number):Observable<any>  {
    return this.http.get<any>(`http://localhost:8087/products?name=${keyword}&_page=${page}&_per_page=${size}`);
    //return this.http.get <Array<Product>>(`http://localhost:8087/products?_page=${page}&_limit=${size}`,{observe:'response'});
 }

 public checkProduct(product:any):Observable<Product>{
    return this.http.patch<any>(`http://localhost:8087/products/${product.id}`,
         {checked:!product.checked})
  }

 public deleteProduct(product:Product){
     return this.http.delete<any>(`http://localhost:8087/products/${product.id}`)
   }

 public saveProduct(product:Product): Observable<Product>{
      return this.http.post<Product>(`http://localhost:8087/products`, product)
    }

 public searchProducts(keyword:string,page:number, size:number):Observable<Array<Product>> {
      return this.http.get<Array<Product>>(`http://localhost:8087/products?name=${keyword}&_page=${page}&_per_page=${size}`);
   }

   getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8087/products/${productId}`)

  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8087/products/${product.id}`,product)
  }
}

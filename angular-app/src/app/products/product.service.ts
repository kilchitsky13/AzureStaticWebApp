import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, merge , of} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { EntityActionOptions } from "@ngrx/data";

@Injectable({ providedIn: 'root' })
export class ProductService implements OnInit {

  entities$: Observable<Product[]>;
  heroesUrl: string = "https://productstest12221.azurewebsites.net/api/products";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): Observable<Product[]>{ 
    const prod = this.http.get<Product[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched product')),
      catchError(this.handleError<Product[]>('getProducts', [])) // then handle the error
    );

    this.entities$ = prod;
    return prod;
  }

  delete(id: number): Observable<Product>{    
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      tap(_ => this.log(`deleted Product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  add(product: Product) : Observable<Product>{    
    return this.http.post<Product>(this.heroesUrl, product).pipe(
      tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  update(product: Product): Observable<any>{    
    return this.http.put(this.heroesUrl, product).pipe(
      tap(_ => this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`HeroService: ${message}`);
  }
}

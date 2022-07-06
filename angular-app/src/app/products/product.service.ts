import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../core';
import { Observable, of, Subject} from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { EntityActionOptions } from "@ngrx/data";

@Injectable({ providedIn: 'root' })
export class ProductService implements OnInit {

  entities$: Subject<Product[]> = new Subject();
  entities: Product[];
  heroesUrl: string = "https://productstest12221.azurewebsites.net/api/products";

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getAll();
  }

  getAll(): Observable<Product[]>{ 
    this.http.get<Product[]>(this.heroesUrl)
    .pipe(
      tap(value => {
        this.entities = value;
        this.log("getAll products");
        this.entities$.next(this.entities);
      }),
      catchError(this.handleError<Product[]>('getProducts', [])) // then handle the error
    ).subscribe();
    return this.entities$;
  }

  delete(id: number): Observable<Product>{    
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(
      tap(_ => {
        this.log(`deleted Product id=${id}`);
        this.entities = this.entities.filter(x => x.id !== id);
        this.entities$.next(this.entities);    
      }),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  add(product: Product) : Observable<Product>{    
    return this.http.post<Product>(this.heroesUrl, product).pipe(
      tap((newProduct: Product) => {
        this.log(`added product w/ id=${newProduct.id}`);
        this.entities = [...this.entities, newProduct];
        this.entities$.next(this.entities);    
      }),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  update(product: Product): Observable<any>{    
    const url = `${this.heroesUrl}/${product.id}`;
    return this.http.put(url, product).pipe(
      tap(_ => {
        this.log(`updated product id=${product.id}`)
        const i = this.entities.findIndex(x => x.id === product.id);
        this.entities[i] = product;
        this.entities$.next([...this.entities]);    
      }),
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

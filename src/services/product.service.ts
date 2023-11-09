import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Product } from "src/app/models/product";

//local service
@Injectable()

export class ProductService{

    private url = "https://ng-shopapp-c9feb-default-rtdb.firebaseio.com/";

    constructor(private http: HttpClient){
         
    }

    getProducts(categoryId: number) : Observable<Product[]>{
       return this.http.
       get<Product[]>(this.url + "products.json")
       .pipe(
            map(data => {
                const products: Product[] = [];

                for(const key in data) {
                    if(categoryId){
                        if(categoryId == data[key].categoryId ){
                        products.push({ ...data[key], id: key});
                        }
                    }else{
                        products.push({ ...data[key], id: key});

                    }
                }
                return products;
            })
       );

    }

    getProductById(id: string) : Observable<Product>{

        return this.http.get<Product>(this.url + "products/" + id +".json")
    }

    createProduct(product: Product): Observable<Product>{
        return this.http.post<Product>(this.url + "products.json", product);
    }

}

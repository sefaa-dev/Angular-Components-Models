import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [CategoryService]
})
export class ProductCreateComponent implements OnInit {

  categories: Category[] = [];
  error: string =" ";

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  saveProduct(name:any, price:any, imageUrl:any, description:any, isActive:any, categoryId:any){
   
    if(name.value == "" || name.value.length < 5) {
      this.error = "ürün ismi en az 5 karakter giriniz.";
      return;
    }

    if(price.value == "") {
      this.error ="ürün fiyatı girmelisiniz.";
      return;
    }

    if(imageUrl.value == "") {
      this.error ="resim ismi girmelisiniz.";
      return;
    }

    const extensions = ["jpeg","jpg","png"];
    const extension = imageUrl.value.split(".").pop();

    if(extensions.indexOf(extension) == -1) {
      this.error ="resim uzantısı sadece jpeg, jpg, png olmalıdır.";
      return;
    }

    if(categoryId.value == "0") {
      this.error ="kategori seçmelisiniz.";
      return;
    }

      const product = {
        id: 1,
        name: name.value,
        price: price.value,
        imageUrl: imageUrl.value,
        description: description.value,
        isActive: isActive.checked,
        categoryId: categoryId.value
      }
  
      this.productService.createProduct(product).subscribe(data => {
         this.router.navigate(['/products']);
    });
    
  }

}

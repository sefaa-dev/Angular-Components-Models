import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from 'src/services/category.service';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService]
})
export class CategoryListComponent implements OnInit {

  categories : Category[];
  selectedCategory: Category | null;

  constructor(private categoryService: CategoryService) {
  
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;

    })
  }

  displayAll = true
  selectCategory(category?: Category){
    if(category){
      this.selectedCategory = category;
      this.displayAll = false;
    }else{
      this.selectedCategory = null
      this.displayAll = true;

    }
  
  }

}




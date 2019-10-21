import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ImageData, Option, ProductDetail} from '../services/product/product';
import {isNotEmpty, isNotNull, isNull} from '../services/helper/nullSave';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productDetail: ProductDetail;
  selectedOption: Option;
  selectedImage: ImageData;
  singlePrice: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.productService.getProduct(params.get('id'))))
      .subscribe(detail => this.updateProduct(detail));
  }

  private updateProduct(detail) {
    if (isNull(detail)) {
      this.productDetail = null;
      this.selectedOption = null;
      this.singlePrice = null;
      this.selectedImage = null;
      return;
    }
    this.productDetail = detail;
    if (isNotEmpty(this.productDetail.options)) {
      this.selectedOption = this.productDetail.options[0];
      this.singlePrice = this.selectedOption.price;
    }
    if (isNotEmpty(this.productDetail.images)) {
      this.selectedImage = this.productDetail.images[0];
    }
  }

  hasProduct() {
    return isNotNull(this.productDetail);
  }
}

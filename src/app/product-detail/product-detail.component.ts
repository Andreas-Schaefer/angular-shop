import {Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ImageData, Option, ProductDetail} from '../services/product/product';
import {isNotEmpty, isNotNull, isNull} from '../services/helper/nullSave';
import {CartService} from '../services/cart/cart.service';

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
  cartSum = 0;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.productService.getProduct(params.get('id'))))
      .subscribe(detail => this.initProduct(detail));
  }

  private initProduct(detail) {
    if (isNull(detail)) {
      this.productDetail = null;
      this.selectedOption = null;
      this.singlePrice = null;
      this.selectedImage = null;
      this.cartSum = 0;
      return;
    }
    this.productDetail = detail;
    if (isNotEmpty(this.productDetail.options)) {
      this.selectedOption = this.productDetail.options[0];
      this.singlePrice = this.selectedOption.price;
      this.cartSum = this.getCartSum();
    }
    if (isNotEmpty(this.productDetail.images)) {
      this.selectedImage = this.productDetail.images[0];
    }
  }

  getCartSum() {
    if (isNull(this.productDetail)) {
      return 0;
    }

    const id = isNotNull(this.selectedOption) ? this.selectedOption.id : this.productDetail.id;
    return this.cartService.getItemCount(id);
  }

  onOptionChange() {
    this.cartSum = this.getCartSum();
  }

  onAdd() {
    if (isNotNull(this.selectedOption)) {
      this.cartService.addItem(this.selectedOption.id);
    } else {
      this.cartService.addItem(this.productDetail.id);
    }
    this.cartSum = this.getCartSum();
  }

  onSub() {
    if (isNotNull(this.selectedOption)) {
      this.cartService.removeItem(this.selectedOption.id);
    } else {
      this.cartService.removeItem(this.productDetail.id);
    }
    this.cartSum = this.getCartSum();
  }

  onClear() {
    if (isNotNull(this.selectedOption)) {
      this.cartService.clearItem(this.selectedOption.id);
    } else {
      this.cartService.clearItem(this.productDetail.id);
    }
    this.cartSum = this.getCartSum();
  }
}

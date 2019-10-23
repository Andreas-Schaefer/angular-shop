export interface Product {
  localeProducts: LocaleProduct[];
}

export interface LocaleProduct {
  locale: string;
  productDetail: ProductDetail;
}

export interface ProductDetail {
  id: string;
  title: string;
  link: string;
  description: string;
  images: ImageData[];
  options: Option[];
}

export interface ImageData {
  imagePath: string;
  imageAlt: string;
}

export interface Option {
  id: string;
  display: string;
  price: number;
}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new Map(); // stores product id as key and number as value
  registeredChangeFunctions = [];

  constructor() {
  }

  public registerOnChange(changeFunction: () => void) {
    this.registeredChangeFunctions.push(changeFunction);
  }

  public triggerChangeFunctions() {
    this.registeredChangeFunctions.forEach(changeFunction => changeFunction());
  }

  public addItem(id) {
    if (!this.cart.has(id)) {
      this.cart.set(id, 1);
    } else {
      const currentCount = this.cart.get(id);
      this.cart.set(id, currentCount + 1);
    }
    this.triggerChangeFunctions();
  }

  public removeItem(id) {
    if (this.cart.has(id)) {
      if (this.cart.get(id) <= 1) {
        this.cart.delete(id);
      } else {
        const currentCount = this.cart.get(id);
        this.cart.set(id, currentCount - 1);
      }
    }
    this.triggerChangeFunctions();
  }

  public clearItem(id) {
    if (this.cart.has(id)) {
      this.cart.delete(id);
    }
    this.triggerChangeFunctions();
  }

  public isEmpty() {
    return this.cart.size === 0;
  }

  public clearCart() {
    this.cart.clear();
    this.triggerChangeFunctions();
  }

  public getCart() {
    return new Map(this.cart);
  }

  public getItemCount(id: string) {
    return this.cart.has(id) ? this.cart.get(id) : 0;
  }
}

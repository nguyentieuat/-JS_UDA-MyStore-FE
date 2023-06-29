import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product, productCount } from 'src/app/models/Product';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products: Product[] = [];
  cartProducts: CartProduct[] = [];
  productCount: string[] = productCount;
  totalPrice = 0;

  constructor(private productService: ProductService, private route: Router, private dataService: DataTransferService) { }


  ngOnInit(): void {
    const cartProductsStore = this.productService.getCartProduct();

    this.cartProducts = cartProductsStore
      .map((item, i, array) => {
        const defaultValue = {
          id: item.id,
          name: item.name,
          price: item.price,
          url: item.url,
          description: item.description,
          quantity: 0
        }
        const finalValue = array
          .filter(other => other.id === item.id)
          .reduce((accum, currentVal) => {
            accum.quantity += Number(currentVal.quantity);
            return accum;
          }, defaultValue);

        return finalValue;
      })
      .filter((item, thisIndex, array) => {
        const index = array.findIndex((otherItem, otherIndex) => otherItem.id === item.id && otherIndex !== thisIndex && otherIndex > thisIndex);

        return index === -1
      })

    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartProducts.reduce((acc: number, val: any) => {
      return acc + val.price * val.quantity;
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  onChange(id: number, inputQuantity: number ): void {
    if(inputQuantity <= 0){
      this.removeCart(id);
    }
    const cartIdx = this.cartProducts.findIndex(cart => cart.id === id);
    cartIdx != -1 && this.cartProducts.length > 0 ? this.cartProducts[cartIdx].quantity = inputQuantity : null;
    this.cartProducts.length > 0 ? this.productService.addToCart(this.cartProducts) : null;
    this.calculateTotalPrice()

  }

  removeCart(id: number): void {
    const cartIdx = this.cartProducts ? this.cartProducts.findIndex(cart => cart.id === id) : -1;
    if (cartIdx != -1 && this.cartProducts.length > 0) {
      const cart = this.cartProducts.find(cart => cart.id == id);
      const message = `Removed ${cart?.name} from cart!`;

      this.cartProducts.splice(cartIdx, 1)
      this.productService.addToCart(this.cartProducts)
      this.calculateTotalPrice()
      alert(message);
    }
  }

  checkoutSuccess(firstName: string): void{
    this.productService.clearCart();
    const dataTranfer = {"firstName": firstName,
                        "totalPrice": this.totalPrice};
    this.dataService.addNewData(dataTranfer);

    this.route.navigateByUrl(`confirmation`);
  }

}

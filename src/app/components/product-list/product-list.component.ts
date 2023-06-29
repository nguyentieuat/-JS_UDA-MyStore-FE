import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product, productCount } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  productCount: string[] = productCount;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => { this.products = res })
  }

  onSubmit(cartProduct: Product, event: any): boolean {
    let newCartProduct: CartProduct[] = [];
    let message = '';

    const selectedQuantity = event.target[0].options[event.target[0].options.selectedIndex].value;
    const cartProducts: CartProduct[] | [] = this.productService.getCartProduct();

    const cartIdx = cartProducts.findIndex(cart => cart.id === cartProduct.id)
    newCartProduct = cartProducts;

    if ((cartIdx === -1) || (cartProducts.length === 0)) {
      message = `New Item '${cartProduct.name}' added to cart`;
    } else {

      const totalQuantityOld: number = cartProducts.filter(item => item.id === cartProduct.id)
                  .reduce((sum, current) => sum + Number(current.quantity), 0);

      const option: number = totalQuantityOld + Number(selectedQuantity); 
      message = `${option} Item(s) of '${cartProduct.name}' added to cart.`;
    }

    newCartProduct.push(Object.assign(cartProduct, { quantity: selectedQuantity }))
    
    this.productService.addToCart(newCartProduct);

    alert(message);
    return false;
  }
}

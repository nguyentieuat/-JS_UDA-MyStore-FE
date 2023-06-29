import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProduct } from 'src/app/models/CartProduct';
import { Product, productCount } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit{
  id: number | null = null;
  products: Product[]= [];
  product: Product | null = null;
  productCount: string[] = productCount;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {this.id = Number(params.get("id"))});
  
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.product = this.products.filter(product => product.id === this.id)[0];
    });
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

      const quantity: number = totalQuantityOld + Number(selectedQuantity); 
      message = `${quantity} Item(s) of '${cartProduct.name}' added to cart.`;
    }

    newCartProduct.push(Object.assign(cartProduct, { quantity: selectedQuantity }))
    
    this.productService.addToCart(newCartProduct);

    alert(message);
    return false;
  }

}

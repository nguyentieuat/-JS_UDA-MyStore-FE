import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();
  
  firstName = '';
  address = '';
  creditCard: number | string = '';

  ngOnInit(): void {
  }
  onSubmitCheckout():void{
    this.checkoutSuccess.emit(this.firstName);
  }
}

import { Component, OnInit } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  // constructor(private route: ActivatedRoute,) { }
  firstName: string | null = '';
  totalPrice: number | null = 0;

  constructor(private dataService: DataTransferService) {
     
   }
  
  ngOnInit(): void {
    this.dataService.transferArray.subscribe(value => {
      this.firstName = value.firstName;
      this.totalPrice = Number(value.totalPrice);
    })
  }

}

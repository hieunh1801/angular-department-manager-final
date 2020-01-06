import { Component, OnInit } from '@angular/core';

import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { StatisticalService } from '../../../core/services/statistical.service';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';


@Component({
  selector: 'app-bill-month',
  templateUrl: './bill-month.component.html',
  styleUrls: ['./bill-month.component.css']
})
export class BillMonthComponent extends BaseComponent implements OnInit {

  formconfig = {
    year: [''],
    month: ['']
  };
  constructor(   
    public actr: ActivatedRoute,
    public router: Router,
    public statisticalService : StatisticalService
    ) {
    super(actr,RESOURCE.BILL, ACTION_FORM.SEARCH);
    this.setMainService(statisticalService);
    this.formSearch = this.buildForm({}, this.formconfig);
   }

  public get f () {
    return this.formSearch.controls;
  }
  ngOnInit() {
    this.processSearch();
  }

}

import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { BillService } from '../../../../core/services/bill.service';
import { BillWaterElectrictService } from '../../../../core/services/bill-water-electrict.service';
import { CommonUtils } from '../../../../shared/service/common-utils.service';
import { DepartmentService } from '../../../../core/services/department.service';

@Component({
  selector: 'app-bill-electric-water-form',
  templateUrl: './bill-electric-water-form.component.html',
  styleUrls: ['./bill-electric-water-form.component.css']
})
export class BillElectricWaterFormComponent extends BaseComponent implements OnInit {

  
  private formConfig = {
    id :    [''],
    codeBill :  ['',[Validators.required, Validators.maxLength(10)]],
    oldNumber :  ['',[Validators.required, Validators.maxLength(5), Validators.min(1), Validators.max(99999)]],
    newNumber :  ['',[Validators.required, Validators.maxLength(5),Validators.min(1), Validators.max(99999)]],
    fromDate :  ['',[Validators.required]],
    toDate :  ['',[Validators.required]],
    idApartment :  ['',[Validators.required, Validators.maxLength(10)]],
    type :  ['',[Validators.required, Validators.maxLength(10)]],
    amount:[''],
    totalPrice: [''],
    unitElectrict:[''],
    unitWater:['']
  }
  private id: any;
  private apartmentList: any;
  private formSave : FormGroup;
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private billService: BillWaterElectrictService,
    private departmentService: DepartmentService
  ) {
    super (null);
    this.setMainService(billService);
    this.formSave = this.buildForm({}, this.formConfig);
    this.actr.params.subscribe(params => {
      if (params && params.id != null) {
        this.id = params.id;
      } 
    });
   }
    
  ngOnInit() {
    this.setPriceUnit();
    this.setFormValue(this.id);
    this.departmentService.getAllApartment().subscribe( res =>{
      this.apartmentList = res.data;
    } );
  
  }

  private setFormValue (id) {
      this.billService.findOne(id).subscribe(res => {
        this.formSave = this.buildForm(res.data, this.formConfig);
        this.formSave.controls['codeBill'].setValue(res.data.code)
        
        this.formSave.controls['type'].setValue(res.data.idBillType)
        
      }
    )
  }
  private setPriceUnit(){
    this.billService.findPriceUnit().subscribe(res=>{
      this.formSave.controls['unitElectrict'].setValue(res[0].price);
      this.formSave.controls['unitWater'].setValue(res[1].price);
    })
  }


  private processSaveOrUpdate() {
    if (!CommonUtils.isValidForm(this.formSave)) {
      return;
    }
    this.app.confirmMessage(null, () => {// on accepted
      this.formSave.controls['amount'].setValue(this.formSave.controls['newNumber'].value - this.formSave.controls['oldNumber'].value )
      this.formSave.controls['totalPrice'].setValue( this.formSave.controls['amount'].value *4000)
      const formInput = this.formSave.value;
      this.billService.saveOrUpdate(formInput)
        .subscribe(res => {
          if (this.billService.requestIsSuccess(res)) {
            this.router.navigate(['/bill/bill-water-electrict']);
          } 
        });
    }, () => {
      // on rejected
    });
  }
  
  private back() {
    this.router.navigate(['/bill/bill-water-electrict']);
  }

  get f () {
    return this.formSave.controls;
  }

}

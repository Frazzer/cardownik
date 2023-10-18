import {Component, OnInit} from '@angular/core';
import {DialogService} from '../core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {Barcode, BarcodeFormat, BarcodeScanner, BarcodeValueType, LensFacing} from '@capacitor-mlkit/barcode-scanning';
import {FilePicker} from '@capawesome/capacitor-file-picker';
import {BarcodeScanningModalComponent} from '../barcode-scanning-modal/barcode-scanning-modal.component';
import {AppStorageService} from '../core/services/app-storage/app-storage.service';
import {Card} from '../core/interface/card';
import {barcode} from "ionicons/icons";


@Component({
  selector: 'app-Home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public value: any = '';

  card: Card[] = [];

  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;
  public barcodes: Barcode[] = [];
  public cards: Card[] = [];
  public isSupported = false;
  public isPermissionGranted = false;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
  });

  constructor(
    private appStorageService: AppStorageService,
    private dialogService: DialogService) {
  }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
  }


  async setValue() {
    await this.appStorageService.set('card', {
        modified: new Date().toLocaleString("pl-PL"),
        shopLocalization: "Rogowska 151/37",
        id: 1, shopName: "Biedronka",
        barcode: {displayValue: 'dupa',
            format: BarcodeFormat.Aztec,
            valueType: BarcodeValueType.Unknown,
            rawValue: 'dupa test'
        }
    })
    await this.appStorageService.set('country', 'Polska');
  }

  async getValue() {
    this.value = await this.appStorageService.get('country').then(r => r);
    console.log(this.value);
  }

  async removeValue() {
    await this.appStorageService.remove('country').then(r => r);
    console.log('removeValue');
    await this.appStorageService.keys();

  }



  public async startScan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const lensFacing =
      this.formGroup.get('lensFacing')?.value || LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.barcodes.push(barcode);
        this.cards.push({id: 0, modified: 0, shopLocalization: "dasdasd", shopName: "test", barcode: barcode});
      }
    });
  }

  public async readBarcodeFromImage(): Promise<void> {
    const { files } = await FilePicker.pickImages({ multiple: false });
    const path = files[0]?.path;
    if (!path) {
      return;
    }
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      formats,
      path,
    });
    this.barcodes.push(...barcodes);

  }



}

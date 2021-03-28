import { Component, OnInit } from '@angular/core';
import { AdresseService } from './../adresse.service';
import { Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';


@Component({
  selector: 'app-prise-rendez-vous',
  templateUrl: './prise-rendez-vous.component.html',
  styleUrls: ['./prise-rendez-vous.component.css']
})
export class PriseRendezVousComponent implements OnInit {

  formGroup: FormGroup;
  communes = [];
  streetNames = [];
  streetNumbers = [];
  modelChanged: Subject<string> = new Subject<string>();

  constructor(private formBuilder: FormBuilder, private adresseService: AdresseService) {
    this.modelChanged.pipe(
      debounceTime(500))
      .subscribe(model => {
        //console.log("commune", this.thirdFormGroup.value, "input", model);  // input
        //this.thirdFormGroup.value.inputStreetCtrl

        if (this.formGroup.value.selectCommuneCtrl) {
          let formCommune: String = this.formGroup.value.selectCommuneCtrl;
          let commune = this.communes.find(x => x === formCommune)
          if (commune) {
            this.adresseService.streetNames(commune, model).subscribe((resultStreet) => {
              console.log("Result Streets ", resultStreet);
              this.streetNames = resultStreet;
            })
          }
        }
      });
   }

  ngOnInit(): void {
    this.adresseService.communes().subscribe(resultCommunes => {
      console.log("Result Communes ", resultCommunes);
      this.communes = resultCommunes;
    })

    this.formGroup = this.formBuilder.group({
      selectCommuneCtrl: ['', Validators.required],
      inputStreetCtrl: ['', Validators.required],
      selectStreetNumberCtrl: ['', Validators.required]
      //postCodeCtrl: ['', Validators.required] // do i need it, it is generated ?
    });


  }


  changed(text: string) {
    this.modelChanged.next(text);
  }

  selectedStreet(street: string) {
    console.log("Street ", street, this.formGroup.value.selectCommuneCtrl);
    this.adresseService.streetNumbers(this.formGroup.value.selectCommuneCtrl, street).subscribe((resultStreetNumbers) => {
      console.log("Result Streets Numbers", resultStreetNumbers);
      this.streetNumbers = resultStreetNumbers;
    })
  }

  selectedStreetNumber(number: string) {
    console.log("Number ", number);

  }



}

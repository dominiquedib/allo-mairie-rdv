import { Component, OnInit, Inject } from '@angular/core';
import { AdresseService } from './../adresse.service';
import { EncombrantService } from './../encombrant.service';
import { Subject } from 'rxjs';
import { debounce, debounceTime } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewComponent } from './../dialog-overview/dialog-overview.component';


@Component({
  selector: 'app-prise-rendez-vous',
  templateUrl: './prise-rendez-vous.component.html',
  styleUrls: ['./mat-card.scss','./prise-rendez-vous.component.css']
})
export class PriseRendezVousComponent implements OnInit {

  dates: Array<string> = [];
  selectedDate: string= "";
  infoZone = "";
  userEncombrantDetails = [];

  formGroup: FormGroup;
  communes = [];
  streetNames = [];
  streetNumbers = [];
  modelChanged: Subject<string> = new Subject<string>();

  constructor(private formBuilder: FormBuilder,
              private adresseService: AdresseService,
              private encombrantService: EncombrantService,
              public dialog: MatDialog) {
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

    this.encombrantService.getEncombrantUserDetails().subscribe(resultEncombrantUserDetails => {
      console.log("Result Encombrant Details ", resultEncombrantUserDetails);
      this.userEncombrantDetails = resultEncombrantUserDetails;
    })

    this.formGroup = this.formBuilder.group({
      selectCommuneCtrl: ['', Validators.required],
      inputStreetCtrl: ['', Validators.required],
      selectStreetNumberCtrl: ['', Validators.required],
      nameCtrl: ['', Validators.required],
      emailCtrl: ['', Validators.email],
      phoneCtrl: ['', Validators.required]
      //postCodeCtrl: ['', Validators.required] // do i need it, it is generated ?
    });


  }


  changed(text: string) {
    this.modelChanged.next(text);
  }

  selectedStreet(street: string) {
    let commune: string = this.formGroup.value.selectCommuneCtrl;  // selected commune
    console.log("Street ", street, "Commune", commune);
   
    this.encombrantService.suggestionRdvByStreetName(commune, street).subscribe((resultRdv) => {
      console.log("Result Rdv", resultRdv.dates);
      this.infoZone = resultRdv.zone.zone_commentaire;
      this.dates = Object.values(resultRdv.dates);
    })

    this.adresseService.streetNumbers(commune, street).subscribe((resultStreetNumbers) => {
      console.log("Result Streets Numbers", resultStreetNumbers);
      this.streetNumbers = resultStreetNumbers;
    })
  }

  selectedStreetNumber(number: string) {
    console.log("Number ", number);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '450px',
      data: { dates: this.dates, selectedDate: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.selectedDate = result;
   });
  }


  /*public onCardClick(evt: MouseEvent){
    console.log(evt);
  }*/

  onCardClick(ElementId) {
    this.encombrantService.incrementEncombrantCpt(ElementId).subscribe(resultEncombrantUserDetails => {
      console.log("Result Encombrant Details ", resultEncombrantUserDetails);
      this.userEncombrantDetails = resultEncombrantUserDetails;
    })
  }

  onRemoveElement(ElementId) {
    this.encombrantService.decrementEncombrantCpt(ElementId).subscribe(resultEncombrantUserDetails => {
      console.log("Result Encombrant Details ", resultEncombrantUserDetails);
      this.userEncombrantDetails = resultEncombrantUserDetails;
    })
  }


}






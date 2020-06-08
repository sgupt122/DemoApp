import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, SimpleSnackBar, MatSnackBarRef } from '@angular/material';
import { IOrder, IOrderGeo } from '@/_interfaces';
import * as zipcodes from 'zipcodes'
import * as countryStateCity from 'country-state-city';
import * as  reverse from 'reverse-geocode';
import { order, commonBtn, commonInfo } from '@/_config/config';
import { SharedFunctions } from '@/shared/sharedFunctions';

interface Marker {
	city: string;
	latitude: number;
	longitude: number;
	state?: string;
	zip: string;
}

interface Zip {
	zip: string,
	checked: boolean
}

@Component({
	selector: 'app-geos',
	templateUrl: './geos.component.html',
	styleUrls: ['./geos.component.scss']
})
export class GeosComponent implements OnInit {
	@Input() public geosFormGroup: FormGroup;
	@Input() private isEditMode: boolean;
	@Input() private order: IOrder;
	public zipForm: FormGroup;
	public scfForm: FormGroup;
	public radiusForm: FormGroup;
	public zips: Array<string> = [];
	public allZips: Array<IOrderGeo> = [];
	public latitude: number = 37.0902; // set the latitude of usa country;
	public longitude: number = -95.7129; // set the longitude of usa country
	public markers: Array<Marker> = [];
	public mapZoom: number = 4;
	public zipSelect: boolean = false;
	public radiusSelect: boolean = false;
	public radiusInMile: number = 5;
	public radiusInMeter: number = 1609.344;
	public radiusMapValue: any;
	public scfSelect: boolean = false;
	private geos: FormArray;
	private checkedZips: Array<Zip> = [];
	public states = [];
	public cities = [];
	private stateId: string;
	private cityId: string;
	private selectedState;
	private selectedCity;
	public orderAddInfo = {
		commonBtn: commonBtn,
		commonInfo: commonInfo,
		commonLb: order.orderGeoAdd
	};

	constructor(private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private shared: SharedFunctions) { }

	public ngOnInit(): void {
		this.zipForm = this._formBuilder.group({
			zip: ['', [Validators.required, Validators.pattern('^((?!(0){5})[0-9]{5})$')]]
		});
		this.scfForm = this._formBuilder.group({
			scf: ['', [Validators.required, Validators.pattern('^((?!(0){3})[0-9]{3})$')]]
		});
		this.radiusForm = this._formBuilder.group({
			radius: ['5', [Validators.required, Validators.pattern('^((?!(0){5})[0-9]{5})$')]]
		});
		if (this.order) {
			this.order.geos.map(value => {
				this.markers.push(value);
				this.allZips.push(value);
			});
		}
		this.radiusInMeter = 1609.344 * this.radiusInMile;
	}

	/** on pressing key while adding zipcode */
	public _keyPress(event: any): void {
		this.shared._keyPress(event);
	}

	/** on clicking add button on adding zipcode */
	public addZip(): MatSnackBarRef<SimpleSnackBar> {
		this.zips = [];
		const zip = this.zipForm.controls.zip.value;
		this.zipForm.reset();
		this.zips.push(zip.toString());
		this.zips.map(value => {
			const data = zipcodes.lookup(value);
			if (data) {
				const zipData = reverse.lookup(data.latitude, data.longitude, 'US');
				data.state = zipData.state;
				const index = this.allZips.findIndex(elem => elem.zip === data.zip);
				if (index === -1) {
					this.allZips.push(data);
				}
				else {
					return this._snackBar.open('Zip Already Exists', null, { duration: 2000 });
				}
			}
			else {
				return this._snackBar.open('Zipcode is not available!', null, { duration: 2000 });
			}
		});
		return;
	}
	/**  return boolean on edit mode for zipcode */
	public onEditCheck(zip): boolean {
		for (let i = 0; i < this.checkedZips.length; i++) {
			if (this.checkedZips[i].zip === zip.zip) {
				return this.checkedZips[i].checked;
			}
		}
		// this.checkedZips.map((ele, i) => {
		// 	if (ele.zip == zip.zip) {
		// 		return ele.checked;
		// 	}
		// })
		if (this.order && this.isEditMode) {
			return this.order.geos.some(elem =>
				elem.zip === zip.zip
			)
		}
		else {
			return false;
		}
	}

	/** on clicking on map */
	public mapClicked(value): MatSnackBarRef<SimpleSnackBar> {
		this.radiusMapValue = value;
		this.latitude = parseFloat(value.coords.lat);
		this.longitude = parseFloat(value.coords.lng);
		this.mapZoom = 10;
		const data = reverse.lookup(value.coords.lat, value.coords.lng, 'US');
		let zipsData = [];
		let zip = []; // list of all zipcodes according to radius
		// if zip is not selected then remove on other map clicked
		if (this.allZips.length > 0) {
			this.removeUncheckedZips();
		}
		if (data) {
			zipsData = zipcodes.lookupByName(data.city, data.state);

			// When a radius option is selected from dropdown
			if (zipsData.length > 0) {
				if (this.radiusSelect) {
					zip = zipcodes.radius(zipsData[0].zip, this.radiusInMile); //getting a list of zip from radius
					if (zip) {
						zip.map(ele => {
							const zipList = zipcodes.lookup(ele); // getting all data like lat,lng,city from a zip
							this.latitude = zipList.latitude;
							this.longitude = zipList.longitude;
							const index = this.allZips.findIndex(elem => elem.zip === zipList.zip);
							zipList.state = data.state;
							if (index === -1) {
								this.allZips.push(zipList);
							}
							else {
								return this._snackBar.open('Zip Already Exists', null, { duration: 2000 });
							}
						});
					}
				}
				// when a zipcode is selected or a on clicking on map
				else {
					zipsData.map(ele => {
						const index = this.allZips.findIndex(elem => elem.zip === ele.zip);
						ele.state = data.state;
						if (index === -1) {
							this.allZips.push(ele);
						}
						else {
							return this._snackBar.open('Zip Already Exists', null, { duration: 2000 });
						}
					});
				}
			}
		}
		return;
	}
	/** on Zip select from checkbox */
	public selectZipCode(checked: boolean, value: IOrderGeo): void {
		this.geos = this.geosFormGroup.controls.data as FormArray;
		if (checked) {
			this.markers.push({
				latitude: value.latitude,
				longitude: value.longitude,
				zip: value.zip,
				state: value.state,
				city: value.city
			}); // adding marker on map

			this.mapZoom = 10;
			this.latitude = value.latitude;
			this.longitude = value.longitude;

			//adding zip in formgroup
			this.geos.push(this._formBuilder.group({ zip: value.zip, latitude: value.latitude, longitude: value.longitude, city: value.city, state: value.state }));
		}
		// removing zip on uncheck
		else {
			const index = this.markers.findIndex(ele => ele.zip === value.zip);
			this.markers.splice(index, 1);
			this.geos.removeAt(this.geos.value.findIndex(geo => geo.zip === value.zip));
		}
	}

	/** when a option is selected from mat-select dropdown */
	public onDropDownSelect(selected: string): void {
		this.removeUncheckedZips();
		this.states = [];
		this.cities = [];
		if (selected === 'radius') {
			this.radiusSelect = true;
			this.zipSelect = false;
			this.scfSelect = false;
			this.states = [];
		} else if (selected === 'zipcode') {
			this.zipSelect = true;
			this.radiusSelect = false;
			this.scfSelect = false;
			this.states = [];
		} else if (selected === 'scf') {
			this.zipSelect = false;
			this.radiusSelect = false;
			this.scfSelect = true;
			this.states = [];
		} else {
			this.zipSelect = false;
			this.radiusSelect = false;
			this.scfSelect = false;
			this.states = countryStateCity.default.getStatesOfCountry('231');
		}
	}
	/**  on zipcode add button click */
	public onAdd(val: string): void {
		if (val !== null) {
			// this.addZip();
			const zipDetails = zipcodes.lookup(val);
			if (zipDetails) {
				this.selectZipCode(true, zipDetails);
			};
			if (this.geos) {
				this.geos.value.forEach(element => {
					if (element.zip === val) {
						this.checkedZips.push({ zip: element.zip, checked: true });
					}
				});
			}
		}
	}
	/** on state change get the cities of that state */
	public getCities(stateId: string): void {
		this.removeUncheckedZips();
		this.stateId = stateId;
		this.selectedState = this.states.filter(val => val.id === stateId);
		this.cities = countryStateCity.default.getCitiesOfState(stateId);
	}

	/** on city change get  zipcodes of that city  */
	public getZipCodes(cityId): void {
		this.removeUncheckedZips();
		this.cityId = cityId;
		this.selectedCity = this.cities.filter(val => val.id === cityId);
		const zips = zipcodes.lookupByName(this.selectedCity[0].name.toString(), this.selectedState[0].name.toString());
		zips.map(ele => {
			const data = reverse.lookup(ele.latitude, ele.longitude, 'US');
			const index = this.allZips.findIndex(elem => elem.zip === ele.zip);
			ele.state = data.state;
			if (index === -1) {
				this.allZips.push(ele);
			}
			else {
				return this._snackBar.open('Zip Already Exists', null, { duration: 2000 });
			}
		});
	}

	/** called when zoom changes while clicking on map */
	public zoomChanged(value): void {
		this.mapZoom = value;
	}

	/** use to remove unchecked zips */
	private removeUncheckedZips(): void {
		this.allZips = [];
		this.geosFormGroup.value.data.map(geo => {
			this.allZips.push(geo);
			this.checkedZips.push({ zip: geo.zip, checked: true });
			this.onEditCheck(geo);
		});
	}

	/** for circle map radius change */
	public onRadiusChange(radiusMile): void {
		if (+radiusMile > 0) {
			this.radiusInMile = +radiusMile;
			this.radiusInMeter = 1609.344 * (+radiusMile);
			if (this.radiusSelect && this.radiusMapValue) {
				this.mapClicked(this.radiusMapValue);
			}
		}
	}
}
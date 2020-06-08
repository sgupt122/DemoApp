import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IStates, ITimezone, IUser } from '@/_interfaces';
import { fuseAnimations } from '@fuse/animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { commonBtn, commonInfo, agents } from '@/_config/config';
import { SharedFunctions } from '@/shared/sharedFunctions';
@Component({
	selector: 'app-agents-form',
	templateUrl: './agents-form.component.html',
	styleUrls: ['./agents-form.component.scss'],
	animations: fuseAnimations
})
export class AgentsFormComponent implements OnInit {
	@Input() public action: string;
	@Input() public agent: IUser;
	@Input() public states: IStates;
	@Input() public timezones: ITimezone;
	@Output() public create = new EventEmitter<IUser>();
	@Output() public update = new EventEmitter<IUser>();
	public agentFG: FormGroup;
	public agentConfigTxt = {
		commonbtn: commonBtn,
		commoninfo: commonInfo.commonFormLabels,
		errorTxt: commonInfo.errorTxt,
		agents: agents
	}
	constructor(private _router: Router, public fb: FormBuilder, private shared: SharedFunctions) { }
	public ngOnInit(): Promise<boolean> {
		if (this.agent) {
			this.agentFG = this.fb.group({
				email: new FormControl(this.agent.email || '', Validators.required),
				address: new FormControl(this.agent.profile.address || ''),
				address_2: new FormControl(this.agent.profile.address_2 || ''),
				birthdate: new FormControl(this.agent.profile.birthdate || ''),
				business_phone: new FormControl(this.agent.profile.business_phone || ''),
				city: new FormControl(this.agent.profile.city || ''),
				country: new FormControl(this.agent.profile.country || ''),
				county: new FormControl(this.agent.profile.county || ''),
				first_name: new FormControl(this.agent.profile.first_name || '', Validators.required),
				last_name: new FormControl(this.agent.profile.last_name || '', Validators.required),
				phone: new FormControl(this.agent.profile.phone || '', Validators.required),
				postal_code: new FormControl(this.agent.profile.postal_code || ''),
				state: new FormControl(this.agent.profile.state || ''),
				timezone: new FormControl(this.agent.profile.timezone || '', Validators.required),
			});
		}
		if (!this.agent) {
			return this._router.navigate(['/agents']);
		}
	}

	public save(agent: IUser): void {
		if (this.agent.id) {
			agent.id = this.agent.id;
			return this.update.emit(agent);
		}
		const agentObj = {
			email: this.agentFG.value.email,
			profile:
			{
				first_name: this.agentFG.value.first_name,
				last_name: this.agentFG.value.last_name,
				address: this.agentFG.value.address,
				address_2: this.agentFG.value.address_2,
				phone: this.agentFG.value.phone,
				birthdate: this.agentFG.value.birthdate,
				business_phone: this.agentFG.value.business_phone,
				city: this.agentFG.value.city,
				country: this.agentFG.value.country,
				county: this.agentFG.value.county,
				postal_code: this.agentFG.value.postal_code,
				state: this.agentFG.value.state,
				timezone: this.agentFG.value.timezone,
			},
			roles: []
		}
		this.create.emit(agentObj);
	}

	public _keyPress(event: any): void {
		this.shared._keyPress(event);
	}
}

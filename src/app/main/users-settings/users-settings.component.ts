import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'app-users-settings',
  templateUrl: './users-settings.component.html',
  styleUrls: ['./users-settings.component.scss'],
	animations: fuseAnimations,

})
export class UsersSettingsComponent implements OnInit {

  constructor(private _titleService: Title) { }

  ngOnInit(): void {
		this._titleService.setTitle(`Settings - Charcoal`);

  }

}

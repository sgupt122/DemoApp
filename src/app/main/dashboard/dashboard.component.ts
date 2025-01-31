import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { fuseAnimations } from '@fuse/animations';
import { DashboardService } from '@/_services';
import { IApiGeneric, IDashboard } from '@/_interfaces';

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class DashboardComponent implements OnInit {
	widgets: IDashboard;
	widget1SelectedYear = '2016';
	widget5SelectedDay = 'today';

	/**
	 * Constructor
	 *
	 * @param {DashboardService} _dashboardService
	 * @param {Title} _titleService
	 */
	constructor(private _dashboardService: DashboardService, private _titleService: Title) {
		// Register the custom chart.js plugin
		this._registerCustomChartJSPlugin();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this._titleService.setTitle(`Dashboard - Charcoal`);
		this._dashboardService.getDashboardData().subscribe((response: IApiGeneric) => {
			this.widgets = response.data;
		});
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Private methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Register a custom plugin
	 */
	private _registerCustomChartJSPlugin(): void {
		(<any>window).Chart.plugins.register({
			afterDatasetsDraw: function(chart, easing): any {
				// Only activate the plugin if it's made available
				// in the options
				if (
					!chart.options.plugins.xLabelsOnTop ||
					(chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
				) {
					return;
				}

				// To only draw at the end of animation, check for easing === 1
				const ctx = chart.ctx;

				chart.data.datasets.forEach(function(dataset, i): any {
					const meta = chart.getDatasetMeta(i);
					if (!meta.hidden) {
						meta.data.forEach(function(element, index): any {
							// Draw the text in black, with the specified font
							ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
							const fontSize = 13;
							const fontStyle = 'normal';
							const fontFamily = 'Roboto, Helvetica Neue, Arial';
							ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

							// Just naively convert to string for now
							const dataString = dataset.data[index].toString() + 'k';

							// Make sure alignment settings are correct
							ctx.textAlign = 'center';
							ctx.textBaseline = 'middle';
							const padding = 15;
							const startY = 24;
							const position = element.tooltipPosition();
							ctx.fillText(dataString, position.x, startY);

							ctx.save();

							ctx.beginPath();
							ctx.setLineDash([5, 3]);
							ctx.moveTo(position.x, startY + padding);
							ctx.lineTo(position.x, position.y - padding);
							ctx.strokeStyle = 'rgba(255,255,255,0.12)';
							ctx.stroke();

							ctx.restore();
						});
					}
				});
			}
		});
	}
}

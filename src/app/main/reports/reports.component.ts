import { Component, OnInit} from '@angular/core';
import { NavigationService } from '@/_services';

declare var tableau: any;

@Component({
	selector: 'app-reports',
	templateUrl: './reports.component.html',
	styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    private url;
    private viz;
    private options;
    private placeholderDiv;
	constructor( private navigationservice: NavigationService) {}

	public ngOnInit(): void {
        this.placeholderDiv = document.getElementById('vizContainer');
        // Replace this url with the url of your Tableau dashboard
        // 'http://public.tableau.com/views/RegionalSampleWorkbook/Flights'
        // 'http://public.tableau.com/views/RegionalSampleWorkbook/Stocks'
        // 'http://public.tableau.com/views/RegionalSampleWorkbook/Obesity',
        // 'http://public.tableau.com/views/RegionalSampleWorkbook/College',
        // const url = 'https://tableau.charcoaldata.net/views/DemoInsuranceWorkbook_Test/Dashboard1';
        this.options = {
            hideTabs: true,
            hidetoolbar: false,
            width: 1400,
            height: 925,
            onFirstInteractive: () => {
                console.log("The viz has finished loading....");
            }
        };
        this.navigationservice.getSingleNavigation().subscribe(table => {
            this.url = table["data"][0]["navigation"]["reports"]["tablau"];
            this.viz = new tableau.Viz(this.placeholderDiv, this.url, this.options);
        })
        
    }
}

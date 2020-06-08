export interface IDashboard {
	widget1: Widget1;
	widget2: Widget2;
	widget3: Widget3;
	widget4: Widget4;
	widget5: Widget5;
	widget6: Widget6;
	widget7: Widget7;
	widget8: Widget8;
	widget9: Widget9;
}

interface Widget9 {
	rows: Row[];
}

interface Row {
	title: string;
	clicks: number;
	conversion: number;
}

interface Widget8 {
	scheme: Scheme;
	today: string;
	change: Change;
	data: Datum[];
	dataMin: number;
	dataMax: number;
}

interface Datum {
	name: string;
	series: Series[];
}

interface Series {
	name: string;
	value: number;
}

interface Change {
	value: number;
	percentage: number;
}

interface Widget7 {
	scheme: Scheme;
	devices: Device[];
}

interface Device {
	name: string;
	value: number;
	change: number;
}

interface Scheme {
	domain: string[];
}

interface Widget6 {
	markers: Marker[];
	styles: Style[];
}

interface Style {
	featureType: string;
	elementType: string;
	stylers: Styler[];
}

interface Styler {
	color?: string;
	visibility?: string;
	saturation?: number;
	lightness?: number;
}

interface Marker {
	lat: number;
	lng: number;
	label: string;
}

interface Widget5 {
	chartType: string;
	datasets: Datasets2;
	labels: string[];
	colors: Color[];
	options: Options4;
}

interface Options4 {
	spanGaps: boolean;
	legend: Legend;
	maintainAspectRatio: boolean;
	tooltips: Tooltips;
	layout: Layout3;
	elements: Elements2;
	scales: Scales3;
	plugins: Plugins2;
}

interface Plugins2 {
	filler: Filler;
}

interface Scales3 {
	xAxes: XAx2[];
	yAxes: YAx3[];
}

interface YAx3 {
	gridLines: GridLines2;
	ticks: Ticks4;
}

interface Ticks4 {
	stepSize: number;
}

interface GridLines2 {
	tickMarkLength: number;
}

interface XAx2 {
	gridLines: Legend;
	ticks: Ticks;
}

interface Elements2 {
	point: Point;
}

interface Layout3 {
	padding: Padding3;
}

interface Padding3 {
	left: number;
	right: number;
}

interface Tooltips {
	position: string;
	mode: string;
	intersect: boolean;
}

interface Datasets2 {
	yesterday: Year[];
	today: Year[];
}

interface Widget4 {
	visits: Conversion;
	chartType: string;
	datasets: Dataset[];
	labels: string[];
	colors: Color2[];
	options: Options2;
}

interface Widget3 {
	impressions: Impressions;
	chartType: string;
	datasets: Dataset2[];
	labels: string[];
	colors: Color3[];
	options: Options3;
}

interface Options3 {
	spanGaps: boolean;
	legend: Legend;
	maintainAspectRatio: boolean;
	elements: Elements;
	layout: Layout2;
	scales: Scales2;
}

interface Color3 {
	borderColor: string;
}

interface Dataset2 {
	label: string;
	data: number[];
	fill: boolean;
}

interface Impressions {
	value: string;
	ofTarget: number;
}

interface Widget2 {
	conversion: Conversion;
	chartType: string;
	datasets: Dataset[];
	labels: string[];
	colors: Color2[];
	options: Options2;
}

interface Options2 {
	spanGaps: boolean;
	legend: Legend;
	maintainAspectRatio: boolean;
	layout: Layout2;
	scales: Scales2;
}

interface Scales2 {
	xAxes: Legend[];
	yAxes: YAx2[];
}

interface YAx2 {
	display: boolean;
	ticks: Ticks3;
}

interface Ticks3 {
	min: number;
	max: number;
}

interface Layout2 {
	padding: Padding2;
}

interface Padding2 {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

interface Color2 {
	borderColor: string;
	backgroundColor: string;
}

interface Dataset {
	label: string;
	data: number[];
}

interface Conversion {
	value: number;
	ofTarget: number;
}

interface Widget1 {
	chartType: string;
	datasets: Datasets;
	labels: string[];
	colors: Color[];
	options: Options;
}

interface Options {
	spanGaps: boolean;
	legend: Legend;
	maintainAspectRatio: boolean;
	layout: Layout;
	elements: Elements;
	scales: Scales;
	plugins: Plugins;
}

interface Plugins {
	filler: Filler;
	xLabelsOnTop: XLabelsOnTop;
}

interface XLabelsOnTop {
	active: boolean;
}

interface Filler {
	propagate: boolean;
}

interface Scales {
	xAxes: XAx[];
	yAxes: YAx[];
}

interface YAx {
	display: boolean;
	ticks: Ticks2;
}

interface Ticks2 {
	min: number;
	max: number;
	stepSize: number;
}

interface XAx {
	gridLines: GridLines;
	ticks: Ticks;
}

interface Ticks {
	fontColor: string;
}

interface GridLines {
	display: boolean;
	drawBorder: boolean;
	tickMarkLength: number;
}

interface Elements {
	point: Point;
	line: Line;
}

interface Line {
	tension: number;
}

interface Point {
	radius: number;
	borderWidth: number;
	hoverRadius: number;
	hoverBorderWidth: number;
}

interface Layout {
	padding: Padding;
}

interface Padding {
	top: number;
	left: number;
	right: number;
}

interface Legend {
	display: boolean;
}

interface Color {
	borderColor: string;
	backgroundColor: string;
	pointBackgroundColor: string;
	pointHoverBackgroundColor: string;
	pointBorderColor: string;
	pointHoverBorderColor: string;
}

interface Datasets {
	'2016': Year[];
	'2017': Year[];
	'2018': Year[];
}

interface Year {
	label: string;
	data: number[];
	fill: string;
}

import { ITimezone } from '@/_interfaces';

export const TIMEZONES: ITimezone[] = [
	{ name: 'Pacific/Niue', value: '(GMT-11:00) Niue' },
	{ name: 'Pacific/Pago_Pago', value: '(GMT-11:00) Pago Pago' },
	{ name: 'Pacific/Honolulu', value: '(GMT-10:00) Hawaii Time' },
	{ name: 'Pacific/Rarotonga', value: '(GMT-10:00) Rarotonga' },
	{ name: 'Pacific/Tahiti', value: '(GMT-10:00) Tahiti' },
	{ name: 'Pacific/Marquesas', value: '(GMT-09:30) Marquesas' },
	{ name: 'America/Anchorage', value: '(GMT-09:00) Alaska Time' },
	{ name: 'Pacific/Gambier', value: '(GMT-09:00) Gambier' },
	{ name: 'America/Los_Angeles', value: '(GMT-08:00) Pacific Time' },
	{ name: 'America/Tijuana', value: '(GMT-08:00) Pacific Time - Tijuana' },
	{ name: 'America/Vancouver', value: '(GMT-08:00) Pacific Time - Vancouver' },
	{ name: 'America/Whitehorse', value: '(GMT-08:00) Pacific Time - Whitehorse' },
	{ name: 'Pacific/Pitcairn', value: '(GMT-08:00) Pitcairn' },
	{ name: 'America/Dawson_Creek', value: '(GMT-07:00) Mountain Time - Dawson Creek' },
	{ name: 'America/Denver', value: '(GMT-07:00) Mountain Time' },
	{ name: 'America/Edmonton', value: '(GMT-07:00) Mountain Time - Edmonton' },
	{ name: 'America/Hermosillo', value: '(GMT-07:00) Mountain Time - Hermosillo' },
	{ name: 'America/Mazatlan', value: '(GMT-07:00) Mountain Time - Chihuahua, Mazatlan' },
	{ name: 'America/Phoenix', value: '(GMT-07:00) Mountain Time - Arizona' },
	{ name: 'America/Yellowknife', value: '(GMT-07:00) Mountain Time - Yellowknife' },
	{ name: 'America/Belize', value: '(GMT-06:00) Belize' },
	{ name: 'America/Chicago', value: '(GMT-06:00) Central Time' },
	{ name: 'America/Costa_Rica', value: '(GMT-06:00) Costa Rica' },
	{ name: 'America/El_Salvador', value: '(GMT-06:00) El Salvador' },
	{ name: 'America/Guatemala', value: '(GMT-06:00) Guatemala' },
	{ name: 'America/Managua', value: '(GMT-06:00) Managua' },
	{ name: 'America/Mexico_City', value: '(GMT-06:00) Central Time - Mexico City' },
	{ name: 'America/Regina', value: '(GMT-06:00) Central Time - Regina' },
	{ name: 'America/Tegucigalpa', value: '(GMT-06:00) Central Time - Tegucigalpa' },
	{ name: 'America/Winnipeg', value: '(GMT-06:00) Central Time - Winnipeg' },
	{ name: 'Pacific/Galapagos', value: '(GMT-06:00) Galapagos' },
	{ name: 'America/Bogota', value: '(GMT-05:00) Bogota' },
	{ name: 'America/Cancun', value: '(GMT-05:00) America Cancun' },
	{ name: 'America/Cayman', value: '(GMT-05:00) Cayman' },
	{ name: 'America/Guayaquil', value: '(GMT-05:00) Guayaquil' },
	{ name: 'America/Havana', value: '(GMT-05:00) Havana' },
	{ name: 'America/Iqaluit', value: '(GMT-05:00) Eastern Time - Iqaluit' },
	{ name: 'America/Jamaica', value: '(GMT-05:00) Jamaica' },
	{ name: 'America/Lima', value: '(GMT-05:00) Lima' },
	{ name: 'America/Nassau', value: '(GMT-05:00) Nassau' },
	{ name: 'America/New_York', value: '(GMT-05:00) Eastern Time' },
	{ name: 'America/Panama', value: '(GMT-05:00) Panama' },
	{ name: 'America/Port-au-Prince', value: '(GMT-05:00) Port-au-Prince' },
	{ name: 'America/Rio_Branco', value: '(GMT-05:00) Rio Branco' },
	{ name: 'America/Toronto', value: '(GMT-05:00) Eastern Time - Toronto' },
	{ name: 'Pacific/Easter', value: '(GMT-05:00) Easter Island' },
	{ name: 'America/Caracas', value: '(GMT-04:30) Caracas' },
	{ name: 'America/Asuncion', value: '(GMT-03:00) Asuncion' },
	{ name: 'America/Barbados', value: '(GMT-04:00) Barbados' },
	{ name: 'America/Boa_Vista', value: '(GMT-04:00) Boa Vista' },
	{ name: 'America/Campo_Grande', value: '(GMT-03:00) Campo Grande' },
	{ name: 'America/Cuiaba', value: '(GMT-03:00) Cuiaba' },
	{ name: 'America/Curacao', value: '(GMT-04:00) Curacao' },
	{ name: 'America/Grand_Turk', value: '(GMT-04:00) Grand Turk' },
	{ name: 'America/Guyana', value: '(GMT-04:00) Guyana' },
	{ name: 'America/Halifax', value: '(GMT-04:00) Atlantic Time - Halifax' },
	{ name: 'America/La_Paz', value: '(GMT-04:00) La Paz' },
	{ name: 'America/Manaus', value: '(GMT-04:00) Manaus' },
	{ name: 'America/Martinique', value: '(GMT-04:00) Martinique' },
	{ name: 'America/Port_of_Spain', value: '(GMT-04:00) Port of Spain' },
	{ name: 'America/Porto_Velho', value: '(GMT-04:00) Porto Velho' },
	{ name: 'America/Puerto_Rico', value: '(GMT-04:00) Puerto Rico' },
	{ name: 'America/Santo_Domingo', value: '(GMT-04:00) Santo Domingo' },
	{ name: 'America/Thule', value: '(GMT-04:00) Thule' },
	{ name: 'Atlantic/Bermuda', value: '(GMT-04:00) Bermuda' },
	{ name: 'America/St_Johns', value: '(GMT-03:30) Newfoundland Time - St. Johns' },
	{ name: 'America/Araguaina', value: '(GMT-03:00) Araguaina' },
	{ name: 'America/Argentina/Buenos_Aires', value: '(GMT-03:00) Buenos Aires' },
	{ name: 'America/Bahia', value: '(GMT-03:00) Salvador' },
	{ name: 'America/Belem', value: '(GMT-03:00) Belem' },
	{ name: 'America/Cayenne', value: '(GMT-03:00) Cayenne' },
	{ name: 'America/Fortaleza', value: '(GMT-03:00) Fortaleza' },
	{ name: 'America/Godthab', value: '(GMT-03:00) Godthab' },
	{ name: 'America/Maceio', value: '(GMT-03:00) Maceio' },
	{ name: 'America/Miquelon', value: '(GMT-03:00) Miquelon' },
	{ name: 'America/Montevideo', value: '(GMT-03:00) Montevideo' },
	{ name: 'America/Paramaribo', value: '(GMT-03:00) Paramaribo' },
	{ name: 'America/Recife', value: '(GMT-03:00) Recife' },
	{ name: 'America/Santiago', value: '(GMT-03:00) Santiago' },
	{ name: 'America/Sao_Paulo', value: '(GMT-02:00) Sao Paulo' },
	{ name: 'Antarctica/Palmer', value: '(GMT-03:00) Palmer' },
	{ name: 'Antarctica/Rothera', value: '(GMT-03:00) Rothera' },
	{ name: 'Atlantic/Stanley', value: '(GMT-03:00) Stanley' },
	{ name: 'America/Noronha', value: '(GMT-02:00) Noronha' },
	{ name: 'Atlantic/South_Georgia', value: '(GMT-02:00) South Georgia' },
	{ name: 'America/Scoresbysund', value: '(GMT-01:00) Scoresbysund' },
	{ name: 'Atlantic/Azores', value: '(GMT-01:00) Azores' },
	{ name: 'Atlantic/Cape_Verde', value: '(GMT-01:00) Cape Verde' },
	{ name: 'Africa/Abidjan', value: '(GMT+00:00) Abidjan' },
	{ name: 'Africa/Accra', value: '(GMT+00:00) Accra' },
	{ name: 'Africa/Bissau', value: '(GMT+00:00) Bissau' },
	{ name: 'Africa/Casablanca', value: '(GMT+00:00) Casablanca' },
	{ name: 'Africa/El_Aaiun', value: '(GMT+00:00) El Aaiun' },
	{ name: 'Africa/Monrovia', value: '(GMT+00:00) Monrovia' },
	{ name: 'America/Danmarkshavn', value: '(GMT+00:00) Danmarkshavn' },
	{ name: 'Atlantic/Canary', value: '(GMT+00:00) Canary Islands' },
	{ name: 'Atlantic/Faroe', value: '(GMT+00:00) Faeroe' },
	{ name: 'Atlantic/Reykjavik', value: '(GMT+00:00) Reykjavik' },
	{ name: 'Etc/GMT', value: '(GMT+00:00) GMT (no daylight saving)' },
	{ name: 'Europe/Dublin', value: '(GMT+00:00) Dublin' },
	{ name: 'Europe/Lisbon', value: '(GMT+00:00) Lisbon' },
	{ name: 'Europe/London', value: '(GMT+00:00) London' },
	{ name: 'Africa/Algiers', value: '(GMT+01:00) Algiers' },
	{ name: 'Africa/Ceuta', value: '(GMT+01:00) Ceuta' },
	{ name: 'Africa/Lagos', value: '(GMT+01:00) Lagos' },
	{ name: 'Africa/Ndjamena', value: '(GMT+01:00) Ndjamena' },
	{ name: 'Africa/Tunis', value: '(GMT+01:00) Tunis' },
	{ name: 'Africa/Windhoek', value: '(GMT+02:00) Windhoek' },
	{ name: 'Europe/Amsterdam', value: '(GMT+01:00) Amsterdam' },
	{ name: 'Europe/Andorra', value: '(GMT+01:00) Andorra' },
	{ name: 'Europe/Belgrade', value: '(GMT+01:00) Central European Time - Belgrade' },
	{ name: 'Europe/Berlin', value: '(GMT+01:00) Berlin' },
	{ name: 'Europe/Brussels', value: '(GMT+01:00) Brussels' },
	{ name: 'Europe/Budapest', value: '(GMT+01:00) Budapest' },
	{ name: 'Europe/Copenhagen', value: '(GMT+01:00) Copenhagen' },
	{ name: 'Europe/Gibraltar', value: '(GMT+01:00) Gibraltar' },
	{ name: 'Europe/Luxembourg', value: '(GMT+01:00) Luxembourg' },
	{ name: 'Europe/Madrid', value: '(GMT+01:00) Madrid' },
	{ name: 'Europe/Malta', value: '(GMT+01:00) Malta' },
	{ name: 'Europe/Monaco', value: '(GMT+01:00) Monaco' },
	{ name: 'Europe/Oslo', value: '(GMT+01:00) Oslo' },
	{ name: 'Europe/Paris', value: '(GMT+01:00) Paris' },
	{ name: 'Europe/Prague', value: '(GMT+01:00) Central European Time - Prague' },
	{ name: 'Europe/Rome', value: '(GMT+01:00) Rome' },
	{ name: 'Europe/Stockholm', value: '(GMT+01:00) Stockholm' },
	{ name: 'Europe/Tirane', value: '(GMT+01:00) Tirane' },
	{ name: 'Europe/Vienna', value: '(GMT+01:00) Vienna' },
	{ name: 'Europe/Warsaw', value: '(GMT+01:00) Warsaw' },
	{ name: 'Europe/Zurich', value: '(GMT+01:00) Zurich' },
	{ name: 'Africa/Cairo', value: '(GMT+02:00) Cairo' },
	{ name: 'Africa/Johannesburg', value: '(GMT+02:00) Johannesburg' },
	{ name: 'Africa/Maputo', value: '(GMT+02:00) Maputo' },
	{ name: 'Africa/Tripoli', value: '(GMT+02:00) Tripoli' },
	{ name: 'Asia/Amman', value: '(GMT+02:00) Amman' },
	{ name: 'Asia/Beirut', value: '(GMT+02:00) Beirut' },
	{ name: 'Asia/Damascus', value: '(GMT+02:00) Damascus' },
	{ name: 'Asia/Gaza', value: '(GMT+02:00) Gaza' },
	{ name: 'Asia/Jerusalem', value: '(GMT+02:00) Jerusalem' },
	{ name: 'Asia/Nicosia', value: '(GMT+02:00) Nicosia' },
	{ name: 'Europe/Athens', value: '(GMT+02:00) Athens' },
	{ name: 'Europe/Bucharest', value: '(GMT+02:00) Bucharest' },
	{ name: 'Europe/Chisinau', value: '(GMT+02:00) Chisinau' },
	{ name: 'Europe/Helsinki', value: '(GMT+02:00) Helsinki' },
	{ name: 'Europe/Istanbul', value: '(GMT+02:00) Istanbul' },
	{ name: 'Europe/Kaliningrad', value: '(GMT+02:00) Moscow-01 - Kaliningrad' },
	{ name: 'Europe/Kiev', value: '(GMT+02:00) Kiev' },
	{ name: 'Europe/Riga', value: '(GMT+02:00) Riga' },
	{ name: 'Europe/Sofia', value: '(GMT+02:00) Sofia' },
	{ name: 'Europe/Tallinn', value: '(GMT+02:00) Tallinn' },
	{ name: 'Europe/Vilnius', value: '(GMT+02:00) Vilnius' },
	{ name: 'Africa/Khartoum', value: '(GMT+03:00) Khartoum' },
	{ name: 'Africa/Nairobi', value: '(GMT+03:00) Nairobi' },
	{ name: 'Antarctica/Syowa', value: '(GMT+03:00) Syowa' },
	{ name: 'Asia/Baghdad', value: '(GMT+03:00) Baghdad' },
	{ name: 'Asia/Qatar', value: '(GMT+03:00) Qatar' },
	{ name: 'Asia/Riyadh', value: '(GMT+03:00) Riyadh' },
	{ name: 'Europe/Minsk', value: '(GMT+03:00) Minsk' },
	{ name: 'Europe/Moscow', value: '(GMT+03:00) Moscow+00 - Moscow' },
	{ name: 'Asia/Tehran', value: '(GMT+03:30) Tehran' },
	{ name: 'Asia/Baku', value: '(GMT+04:00) Baku' },
	{ name: 'Asia/Dubai', value: '(GMT+04:00) Dubai' },
	{ name: 'Asia/Tbilisi', value: '(GMT+04:00) Tbilisi' },
	{ name: 'Asia/Yerevan', value: '(GMT+04:00) Yerevan' },
	{ name: 'Europe/Samara', value: '(GMT+04:00) Moscow+01 - Samara' },
	{ name: 'Indian/Mahe', value: '(GMT+04:00) Mahe' },
	{ name: 'Indian/Mauritius', value: '(GMT+04:00) Mauritius' },
	{ name: 'Indian/Reunion', value: '(GMT+04:00) Reunion' },
	{ name: 'Asia/Kabul', value: '(GMT+04:30) Kabul' },
	{ name: 'Antarctica/Mawson', value: '(GMT+05:00) Mawson' },
	{ name: 'Asia/Aqtau', value: '(GMT+05:00) Aqtau' },
	{ name: 'Asia/Aqtobe', value: '(GMT+05:00) Aqtobe' },
	{ name: 'Asia/Ashgabat', value: '(GMT+05:00) Ashgabat' },
	{ name: 'Asia/Dushanbe', value: '(GMT+05:00) Dushanbe' },
	{ name: 'Asia/Karachi', value: '(GMT+05:00) Karachi' },
	{ name: 'Asia/Tashkent', value: '(GMT+05:00) Tashkent' },
	{ name: 'Asia/Yekaterinburg', value: '(GMT+05:00) Moscow+02 - Yekaterinburg' },
	{ name: 'Indian/Kerguelen', value: '(GMT+05:00) Kerguelen' },
	{ name: 'Indian/Maldives', value: '(GMT+05:00) Maldives' },
	{ name: 'Asia/Calcutta', value: '(GMT+05:30) India Standard Time' },
	{ name: 'Asia/Colombo', value: '(GMT+05:30) Colombo' },
	{ name: 'Asia/Katmandu', value: '(GMT+05:45) Katmandu' },
	{ name: 'Antarctica/Vostok', value: '(GMT+06:00) Vostok' },
	{ name: 'Asia/Almaty', value: '(GMT+06:00) Almaty' },
	{ name: 'Asia/Bishkek', value: '(GMT+06:00) Bishkek' },
	{ name: 'Asia/Dhaka', value: '(GMT+06:00) Dhaka' },
	{ name: 'Asia/Omsk', value: '(GMT+06:00) Moscow+03 - Omsk, Novosibirsk' },
	{ name: 'Asia/Thimphu', value: '(GMT+06:00) Thimphu' },
	{ name: 'Indian/Chagos', value: '(GMT+06:00) Chagos' },
	{ name: 'Asia/Rangoon', value: '(GMT+06:30) Rangoon' },
	{ name: 'Indian/Cocos', value: '(GMT+06:30) Cocos' },
	{ name: 'Antarctica/Davis', value: '(GMT+07:00) Davis' },
	{ name: 'Asia/Bangkok', value: '(GMT+07:00) Bangkok' },
	{ name: 'Asia/Hovd', value: '(GMT+07:00) Hovd' },
	{ name: 'Asia/Jakarta', value: '(GMT+07:00) Jakarta' },
	{ name: 'Asia/Krasnoyarsk', value: '(GMT+07:00) Moscow+04 - Krasnoyarsk' },
	{ name: 'Asia/Saigon', value: '(GMT+07:00) Hanoi' },
	{ name: 'Indian/Christmas', value: '(GMT+07:00) Christmas' },
	{ name: 'Antarctica/Casey', value: '(GMT+08:00) Casey' },
	{ name: 'Asia/Brunei', value: '(GMT+08:00) Brunei' },
	{ name: 'Asia/Choibalsan', value: '(GMT+08:00) Choibalsan' },
	{ name: 'Asia/Hong_Kong', value: '(GMT+08:00) Hong Kong' },
	{ name: 'Asia/Irkutsk', value: '(GMT+08:00) Moscow+05 - Irkutsk' },
	{ name: 'Asia/Kuala_Lumpur', value: '(GMT+08:00) Kuala Lumpur' },
	{ name: 'Asia/Macau', value: '(GMT+08:00) Macau' },
	{ name: 'Asia/Makassar', value: '(GMT+08:00) Makassar' },
	{ name: 'Asia/Manila', value: '(GMT+08:00) Manila' },
	{ name: 'Asia/Shanghai', value: '(GMT+08:00) China Time - Beijing' },
	{ name: 'Asia/Singapore', value: '(GMT+08:00) Singapore' },
	{ name: 'Asia/Taipei', value: '(GMT+08:00) Taipei' },
	{ name: 'Asia/Ulaanbaatar', value: '(GMT+08:00) Ulaanbaatar' },
	{ name: 'Australia/Perth', value: '(GMT+08:00) Western Time - Perth' },
	{ name: 'Asia/Pyongyang', value: '(GMT+08:30) Pyongyang' },
	{ name: 'Asia/Dili', value: '(GMT+09:00) Dili' },
	{ name: 'Asia/Jayapura', value: '(GMT+09:00) Jayapura' },
	{ name: 'Asia/Seoul', value: '(GMT+09:00) Seoul' },
	{ name: 'Asia/Tokyo', value: '(GMT+09:00) Tokyo' },
	{ name: 'Asia/Yakutsk', value: '(GMT+09:00) Moscow+06 - Yakutsk' },
	{ name: 'Pacific/Palau', value: '(GMT+09:00) Palau' },
	{ name: 'Australia/Adelaide', value: '(GMT+10:30) Central Time - Adelaide' },
	{ name: 'Australia/Darwin', value: '(GMT+09:30) Central Time - Darwin' },
	{ name: 'Antarctica/DumontDUrville', value: "(GMT+10:00) Dumont D'Urville" },
	{ name: 'Asia/Magadan', value: '(GMT+10:00) Moscow+07 - Magadan' },
	{ name: 'Asia/Vladivostok', value: '(GMT+10:00) Moscow+07 - Yuzhno-Sakhalinsk' },
	{ name: 'Australia/Brisbane', value: '(GMT+10:00) Eastern Time - Brisbane' },
	{ name: 'Australia/Hobart', value: '(GMT+11:00) Eastern Time - Hobart' },
	{ name: 'Australia/Sydney', value: '(GMT+11:00) Eastern Time - Melbourne, Sydney' },
	{ name: 'Pacific/Chuuk', value: '(GMT+10:00) Truk' },
	{ name: 'Pacific/Guam', value: '(GMT+10:00) Guam' },
	{ name: 'Pacific/Port_Moresby', value: '(GMT+10:00) Port Moresby' },
	{ name: 'Pacific/Efate', value: '(GMT+11:00) Efate' },
	{ name: 'Pacific/Guadalcanal', value: '(GMT+11:00) Guadalcanal' },
	{ name: 'Pacific/Kosrae', value: '(GMT+11:00) Kosrae' },
	{ name: 'Pacific/Norfolk', value: '(GMT+11:00) Norfolk' },
	{ name: 'Pacific/Noumea', value: '(GMT+11:00) Noumea' },
	{ name: 'Pacific/Pohnpei', value: '(GMT+11:00) Ponape' },
	{ name: 'Asia/Kamchatka', value: '(GMT+12:00) Moscow+09 - Petropavlovsk-Kamchatskiy' },
	{ name: 'Pacific/Auckland', value: '(GMT+13:00) Auckland' },
	{ name: 'Pacific/Fiji', value: '(GMT+13:00) Fiji' },
	{ name: 'Pacific/Funafuti', value: '(GMT+12:00) Funafuti' },
	{ name: 'Pacific/Kwajalein', value: '(GMT+12:00) Kwajalein' },
	{ name: 'Pacific/Majuro', value: '(GMT+12:00) Majuro' },
	{ name: 'Pacific/Nauru', value: '(GMT+12:00) Nauru' },
	{ name: 'Pacific/Tarawa', value: '(GMT+12:00) Tarawa' },
	{ name: 'Pacific/Wake', value: '(GMT+12:00) Wake' },
	{ name: 'Pacific/Wallis', value: '(GMT+12:00) Wallis' },
	{ name: 'Pacific/Apia', value: '(GMT+14:00) Apia' },
	{ name: 'Pacific/Enderbury', value: '(GMT+13:00) Enderbury' },
	{ name: 'Pacific/Fakaofo', value: '(GMT+13:00) Fakaofo' },
	{ name: 'Pacific/Tongatapu', value: '(GMT+13:00) Tongatapu' },
	{ name: 'Pacific/Kiritimati', value: '(GMT+14:00) Kiritimati' }
];

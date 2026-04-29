import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-title-csv-json-converter',
  imports: [NgClass],
  templateUrl: './title-csv-json-converter.html',
  styleUrl: './title-csv-json-converter.scss',
})
export class TitleCsvJsonConverter {
  @Input({ required: true }) firstTitleConverter: string = '';
  @Input({ required: true }) secondTitleConverter: string = '';
  @Input({ required: true }) isActive: boolean = false;
}

import { Component, signal } from '@angular/core';
import { HeroSection } from './components/hero-section/hero-section';
import { CsvJsonConverter } from './components/csv-json-converter/csv-json-converter';
import { FeaturesSection } from './components/features-section/features-section';

@Component({
  selector: 'app-root',
  imports: [HeroSection, CsvJsonConverter, FeaturesSection],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

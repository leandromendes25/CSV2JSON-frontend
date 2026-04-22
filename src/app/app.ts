import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSection } from './components/hero-section/hero-section';
import { FeaturesSection } from './components/features-section/features-section';
import { CsvJsonConverter } from './components/csv-json-converter/csv-json-converter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroSection],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}

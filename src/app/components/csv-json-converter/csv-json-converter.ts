import { Component, inject, input, signal } from '@angular/core';
import { TitleCsvJsonConverter } from '../title-csv-json-converter/title-csv-json-converter';
import { ConverterMode } from '../../models/enums/Converter-mode';
import { FormsModule } from '@angular/forms';
import { Converter } from '../../services/converter';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-csv-json-converter',
  imports: [TitleCsvJsonConverter, FormsModule],
  templateUrl: './csv-json-converter.html',
  styleUrl: './csv-json-converter.scss',
})
export class CsvJsonConverter {
  converterMode = ConverterMode;
  currentConverterMode: ConverterMode = ConverterMode.CSV_TO_JSON;
  inputData = signal<string>('');
  outputData = signal<string>('');
  isLoading = signal<boolean>(false);
  converterService = inject(Converter);
  setMode(currentConverterMode: ConverterMode) {
    this.currentConverterMode = currentConverterMode;
  }

  get placeholderInput(): string {
    if (this.currentConverterMode === ConverterMode.CSV_TO_JSON) {
      return 'nome,idade,cidade\nJoão,25,São Paulo\nMaria,30,Rio de Janeiro';
    }
    return `[
  {
    "nome": "João",
    "idade": 25,
    "cidade": "São Paulo"
  },
  {
    "nome": "Maria",
    "idade": 30,
    "cidade": "Rio de Janeiro"
  }
    ]`;
  }

  get placeholderOutput(): string {
    if (this.currentConverterMode === ConverterMode.CSV_TO_JSON) {
      return 'O resultado JSON aparecerá aqui...';
    }

    return 'O resultado CSV aparecerá aqui...';
  }
  convert() {
    if (this.inputData().trim() === '') {
      alert('Por favor, insira dados para converter.');
      return;
    }
    this.isLoading.set(true);
    if (this.currentConverterMode === ConverterMode.CSV_TO_JSON) {
      this.converterService
        .csvToJson(this.inputData())
        .pipe(
          finalize(() => {
            this.isLoading.set(false);
          }),
        )
        .subscribe({
          next: (result) => {
            this.outputData.set(JSON.stringify(result, null, 2));
          },
          error: (err) => {
            alert('Erro ao converter CSV para JSON. Verifique o formato do CSV e tente novamente.');
          },
        });
    } else {
      try {
        const parsed = JSON.parse(this.inputData());
        this.converterService
          .jsonToCsv(parsed)
          .pipe(
            finalize(() => {
              this.isLoading.set(false);
            }),
          )
          .subscribe({
            next: (result) => {
              this.outputData.set(result);
            },
            error: (err) => {
              console.log(err);
              alert(
                'Erro ao converter JSON para CSV. Verifique o formato do JSON e tente novamente.',
              );
            },
          });
      } catch (err) {
        this.isLoading.set(false);
        alert('Entrada JSON inválida. Por favor, verifique o formato e tente novamente.');
      }
    }
  }
}

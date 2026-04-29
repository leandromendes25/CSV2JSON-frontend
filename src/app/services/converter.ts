import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonRow } from '../models/interfaces/JsonRow';
import { CsvRow } from '../models/interfaces/CsvRow';

@Injectable({
  providedIn: 'root',
})
export class Converter {
  http = inject(HttpClient);

  url = 'https://csv2json-backend.onrender.com/convert';
  jsonToCsv(body: JsonRow): Observable<string> {
    return this.http.post(`${this.url}/json-to-csv`, body, { responseType: 'text' });
  }
  csvToJson(body: string): Observable<CsvRow[]> {
    return this.http.post<CsvRow[]>(`${this.url}/csv-to-json`, body, {
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

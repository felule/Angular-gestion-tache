import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tache } from '../model/tache.model';

const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class GestionTacheService {
  private url = 'http://localhost:8080/taches';
  constructor(private httpClient: HttpClient) {}

  /**
   * @returns La liste des taches
   */
  getTaches(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(this.url);
  }

  /**
   * @returns La tache associer à l'ID
   */
  getTacheById(id: string): Observable<Tache> {
    return this.httpClient.get<Tache>(`${this.url}/${id}`);
  }

  /**
   * @returns La tache complétée
   */
  getTacheCompleted(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(`${this.url}/completed`);
  }

  /**
   * Créer une tache
   * @returns La tache crée
   */
  postTache(tache: Tache): Observable<Tache> {
    return this.httpClient.post<Tache>(`${this.url}`, tache);
  }

  /**
   * Créer une tache
   * @returns La tache crée
   */
  patchCompletionTache(id: string, completed: boolean): Observable<Tache> {
    return this.httpClient.patch<Tache>(
      `${this.url}/${id}?status=${completed}`,
      null
    );
  }
}

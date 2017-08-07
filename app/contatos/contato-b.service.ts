import { Observable } from 'rxjs/Rx';
import { Headers, Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { CONTATOS } from './contato-lista/contatos.mock';
import { Contato } from './contato-lista/contato.model';
import 'rxjs/add/operator/toPromise'
import { ServiceInteface } from '../intercaces/service.interface';

@Injectable()
export class ContatoService implements ServiceInteface<Contato>{

    private contatosUrl: string = "api/contatos";
    private headers: Headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ) { }

    //AGORA COM HTTP
    findAll(): Promise<Contato[]>{
        return this.http
            .get(this.contatosUrl)
            .toPromise()
            .then(response => response.json().data as Contato[])
            .catch(this.handleError);
        //ANTES DE USAR HTTP UTILIZAR O PROMISE.RESOLVE
        //return Promise.resolve(CONTATOS);
    }

    create(contato: Contato): Promise<Contato>{
        return this.http
            .post(this.contatosUrl, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((response : Response) => response.json().data as Contato)
        .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}`; //app/contatos/:id
        return this.http
            .put(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
        .catch(this.handleError);
    }

    delete(contato: Contato): Promise<Contato>{
        const url = `${this.contatosUrl}/${contato.id}` // app/contatos/:id
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
        .catch(this.handleError);

    }

    private handleError(err:any): Promise<any>{
        console.log('Erro: ', err)
        return Promise.reject(err.message || err);
    }

    //RETORNA UM CONTATO DA LISTA REFERENTE A UM ID PASSADO POR PARAMETRO
    find(id: number): Promise<Contato> {
        return this.findAll()
            .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));
    }

    //SIMULA UMA PROMISE COM LETIDAO
    getContatosSlowly(): Promise<Contato[]> {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 3000);
        }).then(() => this.findAll());
    }

    search(term: string): Observable<Contato[]>{
        return this.http
            .get(`${this.contatosUrl}/?nome=${term}`)
            .map((res: Response) => res.json().data as Contato[]);
    }
}
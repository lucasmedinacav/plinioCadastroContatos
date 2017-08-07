import * as console from 'console';
import { link } from 'fs';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { Contato } from '../contato-lista/contato.model';
import { ContatoService } from '../contato.service';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca.component.html',
    styles: [`
        .cursor-pointer:hover{
            cursor: pointer;
        }
    `]
})
export class ContatoBuscaComponent implements OnInit, OnChanges {
    
    @Input() busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    private termosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private contatoService: ContatoService,
        private router: Router) {
    }

    ngOnInit() {
        this.contatos = this.termosDaBusca
            .debounceTime(400) //aguarde por 300ms para emitir novos eventos
            .distinctUntilChanged() // ignore se o proximo termo de busca for igual ao anterior
            .switchMap(term =>  term ? this.contatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => Observable.of<Contato[]>([])
            );

           /* this.contatos.subscribe((contatos: Contato[]) => {
                console.log("retornou do servidor", contatos);
            });*/
     }

     ngOnChanges(changes: SimpleChanges){
         let busca: SimpleChange = changes['busca'];
         this.search(busca.currentValue);
     }

    search(termo: string) {
        this.termosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhe(contato: Contato){
        let link = ['contato/save', contato.id];
        this.buscaChange.emit("");
        this.router.navigate(link);
    }
}
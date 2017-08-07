import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { ContatoService } from '../contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from '../contato-lista/contato.model';

@Component({
    moduleId: module.id,
    selector: "contato-detalhe",
    templateUrl: "contato-detalhe.component.html"
})
export class ContatoDetalheComponent implements OnInit {

    contato: Contato;
    private isNew: boolean = true;

    constructor(
        private contatoService: ContatoService,
        private route: ActivatedRoute,
        private location: Location
    ) { }

    ngOnInit(): void {
        this.contato = new Contato(0, '', '', '');

        this.route.params.forEach((params: Params) => {
            let id: number = +params['id'];
            if (id) {
                this.isNew = false;
                this.contatoService.getContato(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                    });
            }
        });
    }

    //TRATATAMENTO PARA NGMODEL DAS DIVS DOS INPUTS
    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }

    //TRATATAMENTO PARA NGMODEL DOS INPUTS
    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
        return {
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        };
    }

    onSubmit(): void {

        let promise;

        if (this.isNew) {
            console.log("Cadastra");
            promise = this.contatoService.create(this.contato);
        } else {
            console.log("altera");
            promise = this.contatoService.update(this.contato);
        }
        
        //VOLTA PARA PAGINA ANTERIOR
        promise.then(contato => this.goBack());
    }

    goBack(){
        this.location.back();
    }

}
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatosListaComponent } from './contato-lista/contatos-lista.component';
import { ContatoRoutingModule } from './contato-routing.module';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';
import { ContatoService } from './contato.service';
import { DialogService } from '../dialog.service';
import { ContatoBuscaComponent } from './contato-busca/contato-busca.component';

@NgModule({
    imports: [CommonModule, ContatoRoutingModule, FormsModule],
    declarations: [ContatosListaComponent, ContatoDetalheComponent, ContatoBuscaComponent],
    exports:[ContatosListaComponent, ContatoBuscaComponent],
    providers:[ContatoService]
})
export class ContatosModule {};
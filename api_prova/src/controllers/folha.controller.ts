import { Request, Response } from "express";
import { Folha } from "../models/folha.model";

let folhas : Folha[] = [];

export class PaymentController{

    listar( request : Request, response : Response): Response{
        for(let folhaCadastrada of folhas){

            let bruto : number;
            let iR : number;
            let iNSS : number;
            let fGTS : number;
            let liquido : number;
            
            bruto = folhaCadastrada.horas * folhaCadastrada.valor;

            if(bruto <= 1903.98){
                iR = bruto;
            }
            else if(bruto <= 2826.65){
                iR = bruto * 7.5 / 100 - 142.80;
            }
            else if(bruto <= 3751.05){
                iR = bruto * 15 / 100 - 354.80;
            }
            else if(bruto <= 4664.68){
                iR = bruto * 22.5 / 100 - 636.13;
            }
            else{
                iR = bruto * 27.5 / 100 - 869.36;
            }

            if(bruto <= 1693.72){
                iNSS = bruto * 8 / 100;
            }
            else if(bruto <= 2822.90){
                iNSS = bruto * 9 / 100;
            }
            else if(bruto <= 5645.80){
                iNSS = bruto * 11 / 100;
            }
            else{
                iNSS = bruto - 621.03; 
            }

            fGTS = bruto * 8 / 100;

            liquido = bruto - iR - iNSS;
            

            console.log(folhaCadastrada );
            return response.status(200).json({ message : "Ok!", dados : folhas, bruto, iR, iNSS, fGTS, liquido });
        }
        

    }

    buscar( request : Request, response : Response): Response{
        const { cpf } = request.params;
        const { mes } = request.params;
        const { ano } = request.params;

        for(let folhaCadastrada of folhas){
            console.log(folhaCadastrada);

            if(folhaCadastrada.cpf == parseInt(cpf), folhaCadastrada.mes == parseInt(mes), folhaCadastrada.ano == parseInt(ano)){
        
                return response.status(200).json({ message : "OK!", dados : folhaCadastrada});
            }
        }
        return response.status(404).json({ message : "Folha não encontrada!", dados : folhaCadastrada });
    }

    cadastrar( request : Request, response : Response ): Response{
        let folha : Folha = new Folha();
        
        folha.nome = request.body.nome;
        folha.cpf = request.body.cpf;
        folha.horas = request.body.horas;
        folha.valor = request.body.valor;
        folha.mes = request.body.mes;
        folha.ano = request.body.ano;

        folhas.push(folha);

        return response.status(201).json({ message : "Folha Cadastrada!", folhas : folhas});
    }
}
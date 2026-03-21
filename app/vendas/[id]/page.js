'use client'
import supabase from "@/app/conexao/supabase";
import { useParams } from "next/navigation";
import { useEffect, useEffectEvent, useState } from "react";


function ConsultaVendas() {

    const params = useParams()

    const [ listaVendas, alterasListaVendas ] = useState([])

    async function buscaVenda(){

        const { data, error } = await supabase
            .from('vendas')
            .select(`
                *,
                id_usuario (*),
                id_livro (*)
            `)
            .eq('id', params.id)

        alterasListaVendas(data)

    }

    useEffect(()=>{
        buscaVenda()
    },[])

    return (
        <div>
            <h1>Consulta de vendas</h1>
            <hr/>
          
          {
            listaVendas.map(
                item => <div>
                        <p><strong>ID da venda:</strong> {item.id} </p>
                        <p><strong>Comprador:</strong> {item.id_usuario.nome} </p>
                        <p><strong>Produto:</strong> {item.id_livro.nome} </p>
                        <p><strong>Quantidade:</strong> {item.id_usuario.quantidade} </p>
                        <p><strong>Data da compra:</strong> {item.id_usuario.created_at}</p>
                    </div>
            )
          }
            
                  
                
        </div>
    );
}

export default ConsultaVendas;
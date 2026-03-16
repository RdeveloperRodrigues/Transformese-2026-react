'use client'
import { useEffect, useState } from "react";
import supabase from "../conexao/supabase";

function Vendas() {

    const [listaVendas, alteraListaVendas] = useState([])

    async function buscaTodos() {

        const { data, error } = await supabase
            .from('vendas')
            .select()

        alteraListaVendas(data)

    }

    useEffect(()=>{
        buscaTodos()
    }, [])

    return (
        <div>

            <h1>Vendas</h1>
            <hr />

            <table class="table">
                <tr>
                    <td>Cliente</td>
                    <td>Produto</td>
                    <td>Qnt.</td>
                    <td>Forma de pagamento</td>
                    <td>Data</td>
                </tr>
                {
                    listaVendas.length == 0 ?
                        <p>Carregando...</p>
                    :
                        listaVendas.map(
                            item => <tr>
                                        <td> {item.id_usuario} </td>
                                        <td> {item.id_livro} </td>
                                        <td> {item.quantidade} </td>
                                        <td> {item.pagamento} </td>
                                        <td> {item.created_at} </td>
                                    </tr>
                        )
                }
            </table>


        </div>
    );
}

export default Vendas;
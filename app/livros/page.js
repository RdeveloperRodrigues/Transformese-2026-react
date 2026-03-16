'use client'
import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
const supabase = createClient('https://kulvmhryytbvbjsrqovu.supabase.co', 'sb_publishable_5hwCf4OLBd_0PjAJuMu0fg_aMQd2bob')

function Livros() {

    const [ nome, alteraNome ] = useState("")
    const [ autor, alteraAutor ] = useState("")
    const [ preco, alteraPreco ] = useState()

    const [ livros, alteraLivros ] = useState([])

    async function buscar() {
        const { data, error } = await supabase
        .from('livros')
        .select()
        console.log(data)
        alteraLivros(data)        
    }

    async function salvar(){

        const objeto = {
            nome: nome,
            autor: autor,
            preco: preco.replaceAll(",", ".")
        }

        // Validações
        if (objeto.nome.length < 3) {
            alert("Nome do livro inválido")
            return
        }

        const { error } = await supabase
        .from('livros')
        .insert(objeto)

        console.log(error)

        if(error == null ){
            alert("Livro cadastrado com sucesso!")
            alteraNome("")
            alteraPreco("")
            alteraAutor("")
            // location.reload()
        }else{
            alert("Dados inválidos, verifique os campos e tente novamente...")
        }

    }

    // useEffect é chamado apenas ao iniciar a página, uma vez
    useEffect( ()=>{
        buscar()    
    }, [] )

    return (
        <div>
            <h1>Livros</h1>
            <p>Dados dos livros que vieram do banco</p>
            <hr />

            <p>Digite o nome livro:</p>
            <input value={nome} onChange={ e => alteraNome(e.target.value) } />
            <br/>
            <p>Digite o autor do livro:</p>
            <input value={autor} onChange={ e => alteraAutor(e.target.value) } />
            <br/>
            <p>Digite o preço livro:</p>
            <input value={preco} onChange={ e => alteraPreco(e.target.value) } />
            <br/>
            <br/>
            <button onClick={salvar} >Salvar livro</button>

            <hr/>

            <ul>
                {
                    livros.length == 0 ?
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Carregando...</span>
                        </div>
                    :
                        livros.map(
                            item => <li>Título: {item.nome} escrito por {item.autor} por R$ {item.preco}</li>
                        )
                }
            </ul>

        </div>
    );
}

export default Livros;
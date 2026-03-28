'use client'

import supabase from "../conexao/supabase"



const { useEffect, useState } = require("react")

export default function Painel(){

    const [usuario, setUsuario] = useState(null)

    
    const id_usuario = localStorage.getItem("id_usuario")
    async function buscarusuario(){
        const {data, error} = await supabase
        .from("usuarios")
        .select()
        .eq("id", id_usuario)

        console.log(data)

        setUsuario(data[0])
        
    }

    useEffect(()=>{
        buscarusuario()

    }, [])


    return(
    <div>
        <h1>painel de usuarios</h1>
        <p>seja bem vindo {usuario == null ? "carregando" : usuario.nome}</p>
        <button> cadastrar novo funcionario</button>
    </div>
    )
    
}


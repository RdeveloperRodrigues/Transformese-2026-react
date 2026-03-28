'use client'

import { useState } from "react"
import supabase from "../conexao/supabase"

function Conectar() {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    async function autenticar() {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        })
console.log(data)
console.log(error)
        if(data.user == null){
            alert("dados invalidos")
            return
        }

        alert("autenticado com sucesso!0")

        localStorage.setItem("id_usuario", data.user.id )

    
    }

    return (
        <div>
            <h1>conectar usuario(login)</h1>

            <p>Digite o email:<input onChange={e => setEmail(e.target.value)} /></p>
            <p>Digite a senha:<input type="password" onChange={e => setSenha(e.target.value)} /></p>
            <br />
            <button onClick={autenticar}>Entrar</button>
        </div>
    )



}

export default Conectar;
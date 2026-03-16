'use client'
import { useEffect, useState } from "react";

function Login() {

    const [autenticado, alteraAutenticado] = useState(false)

    const [usuario, alteraUsuario] = useState("")
    const [senha, alteraSenha] = useState("")

    function autenticar() {

        if (usuario == "admin" && senha == "123123") {
            alert("Você se conectou!")
            localStorage.setItem("logado", true)
            alteraAutenticado(true)
        } else {
            alert("Erro! Algum dado está errado...")
        }

    }

    function desconectar() {
        alert("Desconectado com sucesso!")
        localStorage.removeItem("logado")
        alteraAutenticado(false)
    }

    useEffect( ()=>{

        const logado = localStorage.getItem("logado")
        if(logado == "true"){
            alteraAutenticado(true)
        }

    }, [] )

    return (
        <div>

            {
                autenticado == false ?
                    <div>
                        <h1>Login</h1>

                        <p>Digite seu usuário:</p>
                        <input onChange={e => alteraUsuario(e.target.value)} />

                        <br />

                        <p>Digite sua senha:</p>
                        <input onChange={e => alteraSenha(e.target.value)} type="password" />

                        <br />
                        <br />

                        <button onClick={autenticar}>Entrar</button>
                    </div>
                :
                    <div>
                        <p>Você já está logado.</p>
                        <button onClick={desconectar} >Sair da conta</button>
                    </div>
            }

        </div>
    );
}

export default Login;
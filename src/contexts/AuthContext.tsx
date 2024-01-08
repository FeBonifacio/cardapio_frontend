import {createContext, ReactNode, useState, useEffect } from 'react';
import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { toast } from 'react-toastify';

// Poder de acesso e autenticação 
type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

// Para deslogar user
export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/') //mandar para tela de login
    } catch{
        console.log('Erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user; // converte a variavel em booleano

    // Requisiçaão com o token para ver se os dados estao certos
    useEffect(() => {

        //tentar pegar algo do cookie
        const { '@nextauth.token': token } = parseCookies();
        
        if (token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data;

                setUser({
                    id,
                    name,
                    email
                })
            })
            .catch(() => {
                // ALGO DEU ERRADO
                signOut();
            })
        }

    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password
            })

            //console.log(response.data)

            const { id, name, token } = response.data;

            setCookie(undefined, "@nextauth.token", token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em 1m
                path: '/' //todos os caminhos de acesso
            })

            setUser({
                id,
                name,
                email
            })

            // Passar para proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Usuário Autorizado!")

            // Redirecionar o user para /dashboard
            Router.push('/dashboard')

        } catch (err) {
            toast.error("Erro ao acessar, confirme se tem acesso ou entre em contato com o suporte")
            console.log("ERRO DE ACESSO", err)
        }
    }

    // Função de cadastro 
    async function signUp({ name, email, password }: SignUpProps) {
        try {
            
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Acesso criado!")

            Router.push('/')

        } catch (error) {
            toast.error("Verifique as informações preenchidas ou entre em contato com o suporte")
            console.log("Erro ao cadastrar", error)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

import { useState, FormEvent } from 'react';
import Head from 'next/head';
import { Header } from '../../components/Header';
import styles from './styles.module.scss';

import { setupAPIClient } from '../../services/api';

import { toast } from 'react-toastify';

import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Category() {

    const [name, setName] = useState('')

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        if (name === '') {
            toast.warning("Informe a categoria!")
            return;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria cadastrada')
        setName('')
    }

    return (
        <>
        <Head>
            <title>Cadastro de Categoria</title>
        </Head>
        <div>
            <Header />

            <main className={styles.container}>
                <h1>Cadastrar Categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Crie a nova categoria de produto"
                        className={styles.input}
                        value={name}
                        onChange={ (e) => setName(e.target.value) }
                    />

                    <button type='submit' className={styles.buttonAdd}>
                        Cadastrar
                    </button>
                </form>

            </main>
    
        </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }

})


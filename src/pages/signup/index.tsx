    import { FormEvent, useState, useContext } from 'react';
    import Head from 'next/head';
    import styles from '../../../styles/Home.module.scss';

    import { Input } from '../../components/ui/Input'
    import { Button } from '../../components/ui/Button';

    import { AuthContext } from '../../contexts/AuthContext';

    import Link from 'next/link';

    export default function SignUp() {

        const { signUp } = useContext(AuthContext);

        const [name, setName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

        const [loading, setLoading] = useState(false);

        async function handleSignUp(event: FormEvent) {
            event.preventDefault();

            if (name === "" || email === "" || password === "") {
                alert("Por favor, preencha todos os campos")
                return;
            }

            setLoading(true)

            let data = {
                name,
                email,
                password
            }

            await signUp(data)

            setLoading(false)
        }

    return (
        <>
        <Head>
        <title>Cardápio - Cadastro</title>
        </Head>
        
        <div className={styles.containerCenter}>
        <h1 className={styles.container}>CADASTRO</h1>

        <div className={styles.login}>
            <h1>Crie a sua conta</h1>

            <form onSubmit={handleSignUp}>
            <Input
                placeholder='Digite seu nome'
                type="text"
                value={name}
                onChange={ (e) => setName(e.target.value)}
            />

            <Input
                placeholder='Digite seu email'
                type="text"
                value={email}
                onChange={ (e) => setEmail(e.target.value)}
            />

            <Input
                placeholder='Digite a senha'
                type="password"
                value={password}
                onChange={ (e) => setPassword(e.target.value)}
            />

            <Button
                type="submit"
                loading={loading}
            >
                Cadastrar
            </Button>
            </form>
        </div>

        <Link href="/" legacyBehavior> 
            <a className={styles.text}>Login</a>
        </Link>
        
        </div>
        </>
    )
    }

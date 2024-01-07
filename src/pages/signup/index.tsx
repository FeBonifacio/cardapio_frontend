    import Head from 'next/head';
    import styles from '../../../styles/Home.module.scss';

    import { Input } from '../../components/ui/Input'
    import { Button } from '../../components/ui/Button';

    import Link from 'next/link';

    export default function SignUp() {
    return (
        <>
        <Head>
        <title>Cardápio - Cadastro</title>
        </Head>
        
        <div className={styles.containerCenter}>
        <h1 className={styles.container}>CADASTRO</h1>

        <div className={styles.login}>
            <h1>Crie a sua conta</h1>

            <form>
            <Input
                placeholder='Digite seu nome'
                type="text"
            />

            <Input
                placeholder='Digite seu email'
                type="text"
            />

            <Input
                placeholder='Digite a senha'
                type="password"
            />

            <Button
                type="submit"
                loading={false}
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

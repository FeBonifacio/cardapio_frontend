import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';

import Link from 'next/link';

export default function Home() {


  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email === '' || password === '') {
      toast.warning("Preencha todos os campos")
      return;
    }

    setLoading(true)

    let data = {
      email,
      password
    }

    await signIn(data)
    setLoading(false)
  }

  return (
    <>
    <Head>
      <title>Cardápio</title>
    </Head>
    
    <div className={styles.containerCenter}>
      <h1 className={styles.container}>MENU</h1>

      <div className={styles.login}>

        <form onSubmit={handleLogin}>
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
            Acessar
          </Button>
        </form>
      </div>

      <Link href="/signup" legacyBehavior> 
        <a className={styles.text}>Cadastrar</a>
      </Link>
      
    </div>
    </>
  )
}

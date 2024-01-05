import Head from 'next/head';


import styles from '../../styles/Home.module.scss';

export default function Home() {
  return (
    <>
    <Head>
      <title>Cardápio</title>
    </Head>
    <div className={styles.container}>
      <h1>MENU Deus seja louvado</h1>
    </div>
    </>
  )
}

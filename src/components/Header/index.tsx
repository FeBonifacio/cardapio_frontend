    import { useContext  } from 'react'
    import styles from './styles.module.scss';
    import Link from 'next/link'

    import { FiLogOut } from 'react-icons/fi'

    import { AuthContext } from '../../contexts/AuthContext'

    export function Header(){

    const { signOut, user } = useContext(AuthContext)

    return(
        <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href="/dashboard" legacyBehavior>
                <h1 className={styles.logo}>MENU</h1>
            </Link>

            <h1 className={styles.nome}>Funcionario(a): {user?.name}</h1>
            
            <nav className={styles.menuNav}>
            <Link href="/category" legacyBehavior>
                <a>Categoria</a>
            </Link>

            <Link href="/product" legacyBehavior>
                <a>Cardapio</a>
            </Link>   

            <button onClick={signOut}>
                <FiLogOut color="#FFF" size={24} />
            </button>       
            </nav>

        </div>
        </header>
    )
    }
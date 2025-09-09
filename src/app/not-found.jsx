import style from "../styles/NotFound.module.css";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className={style.notFound}>
            <div className={style.errorCode}>404</div>
            
            <h1 className={style.title}>Página Não Encontrada!</h1>
            
            <p className={style.description}>
                A página que você está procurando não existe.
            </p>
            
            <Link href="/series" className={style.homeButton}>
                Home
            </Link>
        </div>
    );
}
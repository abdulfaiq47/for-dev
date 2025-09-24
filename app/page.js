import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login/page";
import { toast, ToastContainer } from 'react-toastify'
import Link from "next/link";


export default function Home() {
  return (
    <main>
      <Link href='/login' ><button  >Login</button></Link>

      
    </main>

  );
}

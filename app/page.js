import Image from "next/image";
import styles from "./page.module.css";
import Login from "./login/page";
import { toast, ToastContainer } from 'react-toastify'


export default function Home() {
  return (
    <main>

      <Login />
    </main>

  );
}

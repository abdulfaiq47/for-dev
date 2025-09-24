"use client"
import React, { useEffect } from 'react'
import style from './page.module.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signIn, useSession, } from 'next-auth/react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const { data: session, status } = useSession(); // <-- session hoe
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [status, router]);

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm();
  const submit = async (e) => {
    const { email, password } = e;

    try {
      const res = await signIn("credentials", {
        
        email,
        password,
        redirect: false
      })
      if (res.error) {
        toast.error("Invaild Credentails! ")
        return
      }

      toast.success("Login successful!");
      router.replace("/dashboard");
    } catch (error) {

    }
  }
  return (
    <div className={style.loginMain} >
      <div className={style.form}>
        <h3>
          Login Here
        </h3><br />
        <form onSubmit={handleSubmit(submit)} className={style.forgap} >
          <label htmlFor="/name">Email</label>
          <input className={style.input} {...register("email", { required: "Email is required" })} type="text" required name='email' placeholder='Email' />
          {errors.email && <div className={style.errors} >{errors.email.message}</div>}
          <label htmlFor="pass">Password</label>
          <input className={style.input} {...register("password", { required: { value: true, message: "Needs to fill" }, minLength: { value: 8, message: "min Length is 8" }, })} type="password" placeholder='Password' />
          {errors.password && <div className={style.errors} >{errors.password.message}</div>}

          <button disabled={isSubmitting} className={style.btn} type="submit">Login</button>
          <p className={style.p} >
            {"Don't have account?"} <Link className={style.link} href="/regsister" >Register</Link>
          </p>
        </form>
      </div>

      <button className={style.dashBtn} ><Link className={style.link} onClick={()=>{
        if(session){
          router.push("dashboard")

        }else{
          toast.error("Please login first!");
        }
      }} href="/dashboard" >Dash</Link></button>
    </div>
  )
}

export default Login
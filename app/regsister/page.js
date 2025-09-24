"use client"
import React, { useState } from 'react'
import style from './page.module.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'



const Register = () => {
  const router = useRouter();

  const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting } } = useForm();


  const delay = (d) => {
    return new Promise((resovle, reject) => {
      setTimeout(() => {
        resovle()
      }, d * 1000);
    })
  }
  const submit = async (data) => {
    await delay(1)
    try {
      let res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      let result = await res.json();
      const { success, message, error } = result;
      if (res.ok) {
        toast(result.message || "Registered successfully!");
        reset();
        router.push("/login")
      } else {

        toast(result.message || "Something went wrong");
      }

    } catch (error) {
      toast(`Network error: ${error.message}`);

    }
  };
  return (
    <div className={style.loginMain} >
      <div className={style.form}>
        <h3>
          Enter The Details
        </h3><br />
        <form onSubmit={handleSubmit(submit)} className={style.forgap} >
          <label >Username</label>
          <input className={style.input} {...register("username", { required: "username is required", minLength: { value: 3, message: "Min Length is 3" }, })} type="text" required name='username' placeholder='username' />
          {errors.username && <div className={style.errors} >{errors.username.message}</div>}

          <label >Email</label>
          <input className={style.input} {...register("email", { required: "Email is required" })} type="text" required name='email' placeholder='Email' />
          {errors.email && <div className={style.errors} >{errors.email.message}</div>}

          <label >Password</label>
          <input className={style.input} {...register("password", { required: { value: true, message: "Needs to fill" }, minLength: { value: 8, message: "min Length is 8" }, })} type="password" placeholder='password' />
          {errors.password && <div className={style.errors} >{errors.password.message}</div>}

          <button disabled={isSubmitting} className={style.btn} type="submit">Login</button>
          {isSubmitting && <div>Loading...</div>}
          <p className={style.p} >
            Already have account? <Link className={style.link} href="/login" >Login</Link>
          </p>
        </form>
      </div>

      
    </div>
  )
}

export default Register
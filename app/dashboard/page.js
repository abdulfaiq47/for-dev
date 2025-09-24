"use client"
import React from 'react'
import style from './page.module.css'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'


const Dashboard = () => {

    const {data: session}= useSession()
    console.log(session)

    return (
        <div className={style.dash}>
            <div className={style.container}>
                <h3>Details</h3>
                <p>Name: {session?.user?.username} </p>
                <p>Email: {session?.user?.email} </p>
                <button onClick={() => signOut()} className={style.btn} >Logout</button>
            </div>
        </div>
    )
}

export default Dashboard
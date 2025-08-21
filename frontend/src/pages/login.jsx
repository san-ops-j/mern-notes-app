
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'


const Login = () => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const {login}=useAuth()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response= await axios.post('http://localhost:5000/api/auth/login',{
        email,
        password
      })
      if(response.data.success) {
        login(response.data.user)
        localStorage.setItem('token', response.data.token)
        navigate('/')
        }

    }catch(error){
      console.log(error)

    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-300'>
      <div className='border shadow p-6 w-90 bg-gray-50 rounded-xl  border-sky-500'>
        <h2 className='text-2xl font-bold mb-4  '>Login</h2>
        <form onSubmit={handleSubmit}>
          
          <div className='mb-4'>
            <label className='block text-gary-700' htmlFor='email'>Email</label>
            <input className='w-full px-3 py-2 rounded-xl border-2 border-gray-700 focus:border-pink-600 '
              onChange={(e)=> setEmail(e.target.value)}
              type='email'
              placeholder='Enter Email' required />
          </div>
          <div className='mb-4'>
            <label className='block text-gary-700' htmlFor='password'>Password</label>
            <input className='w-full px-3 py-2 rounded-xl border-2 border-gray-700 focus:border-pink-600 '
             onChange={(e)=>setPassword(e.target.value)}
              type='password'
              placeholder='Enter Password' required />
          </div >
          <div className='mb-4'>
            <button type='submit' className='w-full bg-teal-600 text-white py-2 border-2 border-teal-600 rounded-xl hover:bg-teal-700'> login</button>
            <p className='text-center'> Don't have Account? <a className='text-blue-800' href='/register'>Signup</a></p>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login

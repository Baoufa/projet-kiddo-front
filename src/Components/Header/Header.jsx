import React from 'react'

import Navbar from './Navbar/Navbar'

import { useNavigate } from 'react-router-dom'
import  Button  from '@mui/material/Button'


export default function Header() {
  const navigate = useNavigate()
  return (

    <div className='header'>
      <Navbar />
        <>
          <div className='header'>
            <h1>Header</h1>
            <Button onClick={()=>navigate('/BackOffice')} variant="outlined">BackOffice</Button>
          </div>
        </>
    </div>
  )
}
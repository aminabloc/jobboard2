import { useState } from 'react'
import  reactLogo  from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import useSWR from 'swr'
import AddJob from './components/AddJob'

export interface Job {
  id: number
  title: string 
  company: string
  closed: boolean
}

export const ENDPOINT = "http://localhost:4001";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  
  const {data, mutate} = useSWR<Job[]>('api/jobs', fetcher)

  return (
    <>
      
      
      <h1>Pursuit Job Board</h1>

      <Box>{JSON.stringify(data)}</Box>

      <AddJob mutate={mutate} />
    </>
  )
}

export default App

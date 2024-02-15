import { useState } from 'react'
import './App.css'
import { Box, List, Image } from '@mantine/core'
import { MantineProvider } from '@mantine/core'
import useSWR from 'swr'
import AddJob from './components/AddJob'

export interface Job {
  id: number
  title: string 
  company: string
  location: string
  closed: boolean
}

export const ENDPOINT = "http://localhost:4002";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((r) => r.json());

function App() {
  
  const {data, mutate} = useSWR<Job[]>('api/jobs', fetcher)

  return (
    <>
      
      
      <h1>Pursuit Job Board</h1>

      <Box bg="white.5">

        <List  spacing="xs" size="sm" mb={12} center> 
          {data?.map((job) => {
            return <List.Item key={`job_list__${job.id}`}>
                <h2>
                
                  <a href={"https://"+ job.url}
                      target= "_blank">
                        {job.title}</a></h2>
                <p>{job.company}</p>
                <Image
                  radius="md"
                  src={"https://logo.clearbit.com/google.com/"+job.company.replace(" ","")+ ".com"}
                  h={10}
                  fallbackSrc="https://logo.clearbit.com/clearbit.com"
                />

            </List.Item>
          })};

        </List>
      </Box>

      <AddJob mutate={mutate}/>
    
    </>
  )
}

export default App

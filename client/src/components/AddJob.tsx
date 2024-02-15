import {useState} from 'react'
import {useForm} from '@mantine/form'
import {Modal, Group, Button, TextInput} from '@mantine/core'
import { KeyedMutator } from 'swr';

function AddJob ({mutate}: {mutate: KeyedMutator<Job[]>}) {
    const [open,setOpen] = useState(false)

    const form = useForm({
        intialValues: {
            title: "",
            company: "",
            location: "",
            url: ""
        },
    });

    async function createJob(values: {title: string, company: string, location:string, url:string}) {
        const updated = await fetch(`http://localhost:4002/api/jobs`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values),
        }).then((r) => r.json());

        mutate(updated);
        form.reset();        
        setOpen(false);
    };

    return <>
        <Modal opened = {open}
            onClose={()=> setOpen(false)}
            title="Create Job"
        > 
            <form onSubmit={form.onSubmit(createJob)}>
            <TextInput 
            required
            mb={12}
            label="Job Title"
            placeholder= "Job Title"
            {...form.getInputProps("title")}
            /> 

            <TextInput 
            required
            mb={12}
            label="Company"
            placeholder= "Company"
            {...form.getInputProps("company")}
            /> 

            <TextInput 
            required
            mb={12}
            label="Location"
            placeholder= "Location"
            {...form.getInputProps("location")}
            /> 

            <TextInput 
            required
            mb={12}
            label="URL"
            placeholder= "Copy in link"
            {...form.getInputProps("url")}
            /> 

            <Button type="submit"> Post Job</Button>
        </form>



        </Modal>

        

        
        <Group position="center">
            <Button fullWidth mb={12} onClick={() => setOpen(true)}> 
                ADD JOB
            </Button>
        </Group>


    
    </>

}

export default AddJob;
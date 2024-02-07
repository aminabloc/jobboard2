import {useState} from 'react'
import { useForm } from "@mantine/form";
import { Button, Modal, Group, TextInput, Textarea } from "@mantine/core";
import { ENDPOINT } from '../App';
import { KeyedMutator } from 'swr';



 
function AddJob ({ mutate }: {mutate: KeyedMutator<Job[]>}) {
    const [open, setOpen] = useState(false)

    const form = useForm({
        initialValues: {
            title: "",
            company: "",
            url: ""
        },
    });


    async function createJob(values: {title:string,company:string}) {
        const updated = await fetch(`${ENDPOINT}/api/jobs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        }).then(r => r.json());

        mutate(updated)
        form.reset();
        setOpen(false);
    }

    return (
    <>
        <Modal 
        opened={open}
        onClose={()=> setOpen(false)}
        title= "Create job"
        >
            
            <form onSubmit={form.onSubmit(createJob)} >
                <TextInput 
                required
                mb={12}
                label="Job"
                placeholder="Job Title"
                {...form.getInputProps("title")}
                />
                <TextInput 
                required
                mb={12}
                label="Company"
                placeholder="Company"
                {...form.getInputProps("company")}
                />
                <TextInput 
                required
                mb={12}
                label="Url"
                placeholder="Copy in Job Link"
                {...form.getInputProps("url")}
                />

                <Button type="submit">Create Job</Button>
            </form>

        </Modal>

        <Group position="center">
            <Button fullWidth md={12} onClick={()=> setOpen(true)}>
                ADD JOB
            </Button>
        </Group>
    </>
    );
}


export default AddJob;
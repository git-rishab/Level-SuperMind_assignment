import { useForm } from '@mantine/form';
import { TextInput, Button, Box } from '@mantine/core';
import { url } from '../notification';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import styles from "../styles/dashboard.module.css"

function Makepost() {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: { title: '', content: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            title: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
            content: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
        },
    });
    function handleSybmit() {
        console.log(form.values)
        fetch(`${url}/blog/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(form.values)
        })
            .then(res => res.json())
            .then(data => navigate("/"))
            .catch(err => console.log(err))
    }
    return (
        <>
            <Navbar />
            <Box maw={320} mx="auto">
                <h2>Create Post</h2>
                <form className={styles.form} onSubmit={form.onSubmit(handleSybmit)}>
                    <TextInput label="Title" placeholder="title" {...form.getInputProps('title')} />
                    <TextInput mt="sm" label="Content" placeholder="content" {...form.getInputProps('content')} />

                    <Button type="submit" mt="sm">
                        Submit
                    </Button>
                </form>
            </Box>
        </>
    );
}



export default Makepost
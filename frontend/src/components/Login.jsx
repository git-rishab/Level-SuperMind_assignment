import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import styles from "../styles/home.module.css";
import { notification, url } from "../notification";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [type, toggle] = useToggle(['login', 'register']);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 2 ? 'Password should include at least 3 characters' : null),
    },
  });

  const handleSubmit = async()=>{
    if(type == 'login'){
        const req = await fetch(`${url}/user/login`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email:form.values.email, password: form.values.password})
        })
        const res = await req.json();
        if(res.ok){
            notification('Login Successfull', 'Welcome to Blog App', 'white', '#66BB6A');
            sessionStorage.setItem("token",res.token)
            navigate("/dashboard")
        } else {
            notification(res.message, '', 'white', '#EF5350');
        }
    } else {
        const req = await fetch(`${url}/user/register`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email:form.values.email, password: form.values.password, name:form.values.name})
        })
        const res = await req.json();
        if(res.ok){
            notification('register Successfull', 'Welcome to Blog App', 'white', '#66BB6A');
        } else {
            notification(res.message, '', 'white', '#EF5350');
        }
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder className={styles.login}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 3 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
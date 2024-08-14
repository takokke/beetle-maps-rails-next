import axios, { AxiosResponse, AxiosError } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { SignInFormData } from '@/types/SignInFormData'

const SignIn: NextPage = () => {
    const router = useRouter()

    const { handleSubmit, control } = useForm<SignInFormData>({
        defaultValues: { email: '', password: ''}
    })

    const onSubmit: SubmitHandler<SignInFormData> = (data) => {
        const url = process.env.Next_PUBLIC_API_BASE_URL + '/auth/sign_in'
        const headers = { 'Content-Type': 'application/json'}

        axios({method: 'POST', url: url, headers: headers, data: data})
            .then((res: AxiosResponse) => {
                localStorage.setItem('access-token', res.headers['access-token'])
                localStorage.setItem('uid', res.headers['uid'])
                localStorage.setItem('client', res.headers['client'])
                router.push('/')
            })
            .catch((e: AxiosError<{ error: string}>) => {
                console.log(e.message)
            })

    }

    return (
        <>
            一般ユーザーのサインインページ
        </>
    )
}

export default SignIn
import axios, { AxiosResponse, AxiosError } from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler} from 'react-hook-form'
import { SignInFormData } from '@/types/SignInFormData'

const SignIn: NextPage = () => {
    const router = useRouter()

    const { register, handleSubmit, formState: { errors }} = useForm<SignInFormData>({
        defaultValues: { email: '', password: ''}
    })

    const validationRules = {
        email: {
          required: 'メールアドレスを入力してください。',
          pattern: {
            value:
              /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
            message: '正しい形式のメールアドレスを入力してください。',
          },
        },
        password: {
          required: 'パスワードを入力してください。',
        },
    }

    // イベントハンドラー
    const onSubmit: SubmitHandler<SignInFormData> = (data) => {
        const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/auth/sign_in'
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
            <h2 className='font-bold text-4xl pt-10 pb-6 md:pl-64'>ログイン</h2>
            <div className="md:flex justify-center gap-10">
                <div className='p-8 rounded md:border md:border-gray-200 md:w-4/12'>
                    <h3 className='pt-2 pb-9 font-semibold text-lg'>ユーザー登録がお済みの方</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <input
                                type="text" 
                                placeholder='メールアドレス'
                                {...register('email', validationRules.email)}
                                className={`${errors.email ? 'focus:ring-red-500' : 'focus:ring-indigo-600'} block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6`}
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        <div>
                            <input 
                                type="password" 
                                {...register('password', validationRules.password)}
                                className={`${errors.password ? 'focus:ring-red-500' : 'focus:ring-indigo-600'}  block w-full rounded-md border-0 pl-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6`}
                                placeholder="パスワード"
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                        >
                            ログイン
                        </button>
                    </form>
                </div>

                <div className='p-8 rounded md:border md:border-gray-200 md:w-4/12'>
                    <h3 className='pt-2 pb-9 font-semibold text-lg'>ユーザー登録がお済みでない方</h3>
                </div>                
            </div>

        </>
    )
}

export default SignIn
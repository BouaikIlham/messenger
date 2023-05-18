'use client'
import NextAuth from 'next-auth/next';
import { useCallback, useState} from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = useState(false)

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const {register, handleSubmit} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if(variant === 'REGISTER') {
            // axios register
        } 

        if(variant === 'LOGIN') {
            // NextAuth sign in
        }
    }

    const socialAction = (action: string) => {
        // NextAuth social login
    }
  return (
    <div>
    </div>
  )
}

export default AuthForm
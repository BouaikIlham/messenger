"use client";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "@/app/components/AuthSocialButton";
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {IoLogoGithub} from "react-icons/io"
import {BsGoogle} from "react-icons/bs"
import { toast } from "react-hot-toast";
import { signIn } from  "next-auth/react"

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const { register, handleSubmit, formState:{errors} } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios.post("/api/register", data)
      .then(() => {
        toast.success("Success")
      })
      .catch(() => {
        toast.error("Something went wrong!")
      })
      .finally(() => {
        setIsLoading(false)
      })
    }

    if (variant === "LOGIN") {
      signIn('credentials', {
        ...data,
        redirect: false
      })
      .then((callback) => {
        if(callback?.ok && !callback?.error) {
          toast.success("Logged in!")
        }
        if(callback?.error) {
          toast.error("Invalid credentials")
        }

        
      })
      .finally(() => {
        setIsLoading(false)
      })
    }

  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        console.log(callback)
        if (callback?.error) {
          toast.error('Invalid credentials!');
        }

        if (callback?.ok) {
          toast.success('Logged in!');
        }
      })
      .finally(() => setIsLoading(false));
  } 

  return (
    <div
      className="mt-8
                    sm:mx-auto
                    sm:w-full
                    sm:max-w-md"
    >
        <div className="bg-white 
                        px-4
                        py-8
                        shadow
                        sm:rounded-lg
                        sm:px-10">
            <form onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"> 
                {variant === 'REGISTER' && (
                  <Input 
                  label="Name"
                  id="name"
                  type="name"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  placeholder="Name"
                />
                )}
                <Input 
                  label="Email"
                  id="email"
                  type="email"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  placeholder="Email"
                />
                <Input 
                  label="Password"
                  type="password"
                  id="password"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                  placeholder="Password"
                />
                <div>
                  <Button
                    disabled={isLoading}
                    fullwidth
                    type="submit"
                  >
                    {variant === 'LOGIN' ? 'Sign in' : "Register"}
                  </Button>
                </div>
            </form>

            <div className="mt-6"> 
                  <div className="relative">
                    <div className="absolute
                                    inset-0
                                    flex
                                    items-center">
                           <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative
                                    flex
                                    justify-center
                                    text-sm">    
                      <span className="bg-white px-2 text-gray-500"> Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-2">
                    <AuthSocialButton
                      icon={IoLogoGithub}
                      onClick={() => socialAction('github')}
                    />
                    <AuthSocialButton
                      icon={BsGoogle}
                      onClick={() => socialAction('google')}
                    />
                  </div>
            </div>       
            <div className="flex
                            justify-center
                            gap-2
                            mt-6
                            text-sm
                            py-6">
              <div>{variant === 'LOGIN' ? 'New to Messenger' : 'aleardy have an account'}</div>
              <div className="underline cursor-pointer"
                   onClick={toggleVariant} >
                {variant === 'LOGIN' ? 'Create an Account' : 'Log in'}
              </div>
            </div>  
            
        </div>
    </div>
  );
};

export default AuthForm;

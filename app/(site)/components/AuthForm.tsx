"use client";
import Input from "@/app/components/Input/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "@/app/components/AuthSocialButton";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {IoLogoTwitter} from "react-icons/io"
import {BsGoogle} from "react-icons/bs"
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
      // axios register
    }

    if (variant === "LOGIN") {
      // NextAuth sign in
    }
  };

  const socialAction = (action: string) => {
    // NextAuth social login
  };
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
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                )}
                <Input 
                  label="Email"
                  id="email"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
                <Input 
                  label="Password"
                  id="password"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
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
                      icon={IoLogoTwitter}
                      onClick={() => socialAction('twitter')}
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

import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Input } from '../../components/Input/index';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { auth } from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório!"),
    email: z.string().email("Insira um e-mail válido!").min(1, "O campo e-mail é obrigatório!"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

type FormData = z.infer<typeof schema>

export function Register(){

    const { handleInforUser } = useContext(AuthContext);

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    useEffect(() => {
        async function handleLogout(){
            await signOut(auth)
        }
        handleLogout();
    }, []);

    async function onSubmit( data: FormData){
        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then(async(user) => {
            await updateProfile(user.user, {
                displayName: data.name
            })
            
            handleInforUser({
                name: data.name,
                email: data.email,
                uid: user.user.uid
            })

            toast.success("Usuário cadastrado com sucesso!")
            navigate("/dashboard", {replace: true})
        })
        .catch((error) => {
            console.log("Erro ao cadastrar este usuário!");
            
            console.log(error);
            
        })
    }

    return(
        <Container>
            <div className='w-full min-h-screen flex flex-col gap-4 justify-center items-center '>
                <Link to="/" className='mb-6 max-w-sm w-full'>
                    <img 
                        className='w-full'
                        src={logo} 
                        alt="" 
                    />
                </Link>
                <form
                    className='bg-white max-w-xl w-full rounded-lg p-4' 
                    onSubmit={handleSubmit(onSubmit)} 
                >
                    <div className='mb-3'>
                        <Input 
                            type="text"
                            placeholder="Digite seu nome..."
                            name="name"
                            error={errors.name?.message}
                            register={register}
                        />
                    </div>
                    <div className='mb-3'>
                        <Input 
                            type="email"
                            placeholder="Digite seu e-mail..."
                            name="email"
                            error={errors.email?.message}
                            register={register}
                        />
                    </div>
                    <div className='mb-3'>
                        <Input 
                            type="password"
                            placeholder="Digite sua senha..."
                            name="password"
                            error={errors.password?.message}
                            register={register}
                        />
                    </div>
                    <button 
                        type='submit'
                        className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'>
                        Cadastrar
                    </button>
                </form>
                <Link to="/login">
                    Já possui uma conta? Faça o login!
                </Link>
            </div>
        </Container>
    )
}
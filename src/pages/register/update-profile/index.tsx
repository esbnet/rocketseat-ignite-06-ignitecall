import { zodResolver } from '@hookform/resolvers/zod'
import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ignite-ui/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Container, Header } from '../styles'

import { api } from '@/lib/exios'
import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { FormAnnotation, ProfileBox } from './styles'

const UpdateProfileSchema = z.object({
  bio: z.string(),
});

type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(UpdateProfileSchema),
  });

  const session = useSession();
  const router = useRouter();
  
  async function handleUpdateProfile(data: UpdateProfileData) {
    await api.put('/users/profile', {
      bio: data.bio,
    })
    await router.push(`/schedule/${session.data?.user.username}`);
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />
      </Header>

      <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
        <label>
          <Text size="sm">Foto do perfil</Text>
        </label>
        <Avatar src={session.data?.user.avatar_url} alt={session.data?.user.name} />

        <label>
          <Text size="sm">Bio</Text>
          <TextArea placeholder="Insira uma breve descrição sobre você" {...register("bio")} />
          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isso será exibido em sua página pessoal.
          </FormAnnotation>
        </label>

        <Button type="submit" disabled={isSubmitting}>
          Finalizar
          <ArrowRight />
        </Button>
      </ProfileBox>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
         pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
     req, 
     res, 
     buildNextAuthOptions(req, res) 
     );

  return {
    props: {},
  };
};

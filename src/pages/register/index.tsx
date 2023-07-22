import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";

import { api } from "@/lib/exios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { Container, Form, FormAnnotation, Header } from "./styles";

import { NextSeo } from "next-seo";
import "react-toastify/dist/ReactToastify.css";

const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: "O usuário precisa ter pelo menos 3 letras." })
    .regex(/^([a-z\\-]+)$/i, {
      message: "O usuário pode ter apenas letras e hifens.",
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: "O usuário precisa ter pelo menos 3 letras." }),
});

type RegisterFormData = z.infer<typeof RegisterFormSchema>;
export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.username) {
      setValue("username", String(router.query.username));
    }
  }, [router.query?.username, setValue]);

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post(`/users`, {
        name: data.name,
        username: data.username,
      });
      await router.push("/register/connect-calendar");
    } catch (error) {
      if (error instanceof AxiosError && error?.response?.data?.message) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error("Erro ao criar o usuário. Tente novamente.");
    }
  }

  return (
    <>
      <NextSeo
        title="Descomplique sua agenda | @esbdev Call"
        description="Conecte seu calendário e permita que as pessoas marquem agendamentos no seu tempo livre."
      />

      <Container>
        <Header>
          <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
          <Text>
            Precisamos de algumas informações para criar seu perfil! Ah, você
            pode editar essas informações depois.
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Nome de usuário</Text>
            <TextInput
              prefix="esbdev.com/"
              placeholder="seu-usuário"
              {...register("username")}
            />
            {errors.username && (
              <FormAnnotation size="sm">
                {errors.username.message}
              </FormAnnotation>
            )}
          </label>

          <label>
            <Text size="sm">Nome completo</Text>
            <TextInput placeholder="Seu nome" {...register("name")} />
            {errors.name && (
              <FormAnnotation size="sm">{errors.name.message}</FormAnnotation>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </Form>
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
    </>
  );
}

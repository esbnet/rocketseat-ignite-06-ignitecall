import { Container, Hero, Preview } from "@/styles/stylesHome";
import { Heading, Text } from "@ignite-ui/react";

import Image from "next/image";
import previewImage from "../assets/app-preview.png";

export default function Home() {
  return (
    <>
      <Container>
        <Hero>
          <Heading as="h1" size={"4xl"}>
            Agendamento descomplicado
          </Heading>
          <Text size={"lg"}>
            Conecte seu calendário e permita que as pessoas marquem agendamentos
            no seu tempo livre.
          </Text>
        </Hero>
        <Preview>
          <Image
            src={previewImage}
            alt="Calendário com agendamentos simbolizando a aplicação em funcionamento"
            priority
          />
        </Preview>
      </Container>
    </>
  );
}

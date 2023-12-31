import { prisma } from "@/lib/prisma";
import { Avatar, Heading, Text } from "@ignite-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import SchedulerForm from "./SchedulerForm";
import { Container, UserHeader } from "./styles";

interface ScheduleProps {
  user: {
    name: string;
    bio: string;
    avatar_url: string;
  };
}
export default function Schedule({ user }: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Agendar com ${user.name}  | @esbdev Call`}  />
      <Container>
        <UserHeader>
          <Avatar src={user.avatar_url} />
          <Heading>{user.name}</Heading>
          <Text>{user.bio}</Text>
        </UserHeader>

        <SchedulerForm />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username);

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatar_url: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};

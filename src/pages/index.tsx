import Head from "next/head";
import { Layout } from "@/components/layout/Layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="text-4xl font-bold">Inbox</h1>
      </div>
    </Layout>
  );
}

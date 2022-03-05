import Generator from '@components/.';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Game/App Priority</title>
      </Head>

      <Generator.List />
    </>
  );
}

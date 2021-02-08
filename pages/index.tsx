import Head from "next/head";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ launches }: any) {
  return (
    <div className="container pt-40 mx-auto text-center">
      <Head>
        <title>SpaceX Launches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-6xl font-bold">SpaceX Lauches</h1>
      <p className="pt-6 pb-8 text-xl">Latest launches from SpaceX</p>

      <div className="grid grid-cols-2 gap-4 pb-6 align-middle justify-items-stretch">
        {launches.map((launch: any) => {
          return (
            <a
              key={launch.id}
              href={launch.links.video_link}
              target="_blank"
              className="p-12 border border-gray-200 rounded hover:border-blue-600"
            >
              <h3 className="text-xl">{launch.mission_name}</h3>
              <p>
                <strong>Launch Date:</strong>{" "}
                {new Date(launch.launch_date_local).toLocaleDateString("en-US")}
              </p>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            mission_patch
          }
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  return {
    props: {
      launches: data.launchesPast,
    },
  };
}

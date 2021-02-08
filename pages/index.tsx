import Head from "next/head";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ launches }: any) {
  console.log(typeof launches);
  console.log(launches);
  return (
    <div className="container flex">
      <Head>
        <title>SpaceX Launches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>SpaceX Lauches</h1>
        <p>Latest launches from SpaceX</p>

        <div className="">
          {launches.map((launch: any) => {
            return (
              <a key={launch.id} href={launch.links.video_link} className="">
                <h3>{launch.mission_name}</h3>
                <p>
                  <strong>Launch Date:</strong>{" "}
                  {new Date(launch.launch_date_local).toLocaleDateString(
                    "en-US"
                  )}
                </p>
              </a>
            );
          })}
        </div>
      </main>
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

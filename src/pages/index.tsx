import Head from 'next/head'
import { Grid } from '@mui/material'
// import components
import Hero from '@/components/Hero'
import Chat from '@/components/ChatComponent'

const Home = () => {
  return (
    <>
      <Head>
        <title>Document AI</title>
        <meta
          name="description"
          content="Uploadez vos documents et posez vos questions dans le chat"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Grid container spacing={2} direction="row">
        <Grid item xs={12}>
          <Hero
            title="Interrogez vos documents avec OPENAI"
            para="Uploadez vos documents et posez vos questions dans le chat"
          />
        </Grid>
        <Grid item xs={12}>
          <Chat />
        </Grid>
      </Grid>
    </>
  )
}

export default Home

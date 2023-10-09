import Head from 'next/head'
// import mui
import { Grid } from '@mui/material'
// import emtion styled
import styled from '@emotion/styled'
// import components
import Hero from '@/components/Hero'
import Chat from '@/components/ChatComponent'
// import context
import { FileProvider } from '@/utils/context/fileContext'

const StyledGridContainer = styled(Grid)({
  paddingBottom: '1em',
  '@media (min-width: 1920px)': {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

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
      <StyledGridContainer container spacing={2} direction="row">
        <Grid item xs={12}>
          <Hero
            title="Interrogez vos documents avec OPENAI"
            para="Uploadez vos documents et posez vos questions dans le chat"
          />
        </Grid>
        <Grid item xs={12}>
          <FileProvider>
            <Chat />
          </FileProvider>
        </Grid>
      </StyledGridContainer>
    </>
  )
}

export default Home

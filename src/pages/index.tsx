import { useEffect, useState } from 'react'
import Head from 'next/head'
// import mui
import { Grid } from '@mui/material'
// import emtion styled
import styled from '@emotion/styled'
// import components
import Hero from '@/components/Hero'
import Chat from '@/components/ChatComponent'
import DialogSaveKey from '@/components/DialogSaveKey'
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
  //  state pour afficher DialogSaveKey si la clé n'est pas renseignée
  const [messageKey, setMessageKey] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  // useEffect pour vérifier si la OPEN_AI_KEY est présente dans .env
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/verifyKey')
        const data = await response.json()
        if (data.status === 'fail') {
          setMessageKey(data.message)
          setOpen(true)
        } else {
          setMessageKey('')
        }
      } catch (err) {
        setMessageKey('Erreur lors de la vérification de la clé')
        setOpen(true)
      }
    }
    fetchData()
  }, [])
  const handleCloseDialogSaveKey = () => {
    setOpen(false)
  }
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
        {messageKey && (
          <DialogSaveKey
            message={messageKey}
            open={open}
            handleCloseDialog={() => handleCloseDialogSaveKey()}
          />
        )}
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

import React, { FC } from 'react'
// import style
import {
  StyledBox,
  StyledGridContainer,
  StyledAvatar,
} from '@/components/ChatBox/StyledListMessages'
//impot mui
import { Grid, ListItem, ListItemButton, List } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import Person2Icon from '@mui/icons-material/Person2'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
// import components
import TableComponent from '@/components/Table'
import CodeBlock from '@/components/CodeBlock'
// import types
import { messageChatGPT } from '@/utils/types/messages'
// fonction pour copier le texte dans le presse papier
const handleCopyClick = (content: string) => {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      alert('Copié dans le presser papier')
    })
    .catch(() => {
      elert('Erreur lors de la copie dans le presse papier')
    })
}
// composant permettant d'analyser le contenu md des messages et de les afficher en format html
const ContentParser: FC<{ content: string }> = ({ content }) => {
  const lines: string[] = content.split('\n')
  const parsedContent: React.ReactNode[] = []
  let currentListType: 'numbered' | 'bulleted' | null = null
  let currentListItems: string[] = []
  let inCodeBlock = false
  let codeBlock: string[] = []
  // fonction si le contenu est du code
  const isCode = (mes: string) => {
    const regex = /```/g
    return regex.test(mes)
  }
  // Vérification si au moins une ligne contient le caractère '|'
  const isTable = lines.some((line) => line.includes('|'))

  if (isTable) {
    // Si une ligne contient '|', afficher tout le contenu des lignes contenant '|'
    const tableLines = lines.filter((line) => line.includes('|'))
    const otherLines = lines.filter((line) => !line.includes('|'))
    // affichage des autres lignes
    if (otherLines.length > 0) {
      parsedContent.push(
        <div key={`other-lines-${parsedContent.length}`}>
          {otherLines.join('\n')}
        </div>
      )
    }
    // puis affichage du tableau
    parsedContent.push(
      <div key={`table-component-${parsedContent.length}`}>
        <TableComponent lines={tableLines} />
      </div>
    )
  } else {
    // Si aucune ligne ne contient '|', on traite les listes numérotées et les listes à puces
    const processCurrentList = () => {
      if (currentListType === 'numbered') {
        parsedContent.push(
          <List key={`list-numbered-${parsedContent.length}`}>
            {currentListItems.map((item, index) => (
              <ListItem key={`list-numbered-item-${index}`}>{item}</ListItem>
            ))}
          </List>
        )
      } else {
        parsedContent.push(
          <List key={`list-bulleted-${parsedContent.length}`}>
            {currentListItems.map((item, index) => (
              <ListItem key={`list-bulleted-item-${index}`}>{item}</ListItem>
            ))}
          </List>
        )
      }
      currentListItems = []
    }

    lines.forEach((line) => {
      if (isCode(line)) {
        if (!inCodeBlock) {
          // Nouveau bloc de code
          inCodeBlock = true
          codeBlock = [line]
        } else {
          // Fin du bloc de code
          inCodeBlock = false
          codeBlock.push(line)
          parsedContent.push(
            <CodeBlock
              key={`code-block-${parsedContent.length}`}
              code={codeBlock.join('\n')}
              language="javascript"
              handleCopy={(content) => handleCopyClick(content)}
            />
          )
          codeBlock = []
        }
      } else {
        if (inCodeBlock) {
          // Ligne à l'intérieur du bloc de code
          codeBlock.push(line)
        } else {
          // Ligne normale
          if (line.match(/^\d+\./)) {
            if (currentListType !== 'numbered') {
              processCurrentList()
              currentListType = 'numbered'
            }
            currentListItems.push(line)
          } else if (line.startsWith('-')) {
            if (currentListType !== 'bulleted') {
              processCurrentList()
              currentListType = 'bulleted'
            }
            currentListItems.push(line)
          } else {
            currentListItems.push(line)
          }
        }
      }
    })

    processCurrentList()
  }

  return (
    <div>
      {parsedContent.map((item, index) => (
        <div key={`parsed-content-${index}`}>{item}</div>
      ))}
    </div>
  )
}

const ListMessageChat = ({ role, content }: messageChatGPT) => {
  const isAssistant = role === 'assistant'

  return (
    <StyledBox>
      <StyledGridContainer
        isbot={isAssistant}
        container
        direction="row"
        justifyContent="center"
        spacing={1}
      >
        <Grid item xs={1}>
          <StyledAvatar
            alt={`avatar ${role}`}
            variant="rounded"
            isbot={isAssistant}
          >
            {isAssistant ? <ManageAccountsIcon /> : <Person2Icon />}
          </StyledAvatar>
        </Grid>
        <Grid item xs={10}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="copy"
                onClick={() => handleCopyClick(content)}
              >
                <ContentCopyIcon sx={{ color: '#E0E0E0' }} />
              </IconButton>
            }
          >
            <div>
              <ContentParser content={content} />
            </div>
          </ListItem>
          <ListItemButton />
        </Grid>
      </StyledGridContainer>
    </StyledBox>
  )
}

export default ListMessageChat

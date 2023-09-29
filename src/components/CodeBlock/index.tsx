import React, { useEffect } from 'react'
// import primjs
import Prism from 'prismjs'
// import style
import { StyledCodeContainer, StyledButtonContainer } from './StyledCodeBlock'
// import mui
import { Button } from '@mui/material'

interface CodeBlockProps {
  code: string
  language?: string
  handleCopy: (content: string) => void
}

const CodeBlock = ({ code, language, handleCopy }: CodeBlockProps) => {
  // Prism.highlightAll() pour activer la coloration syntaxique
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  const codeText = code.substring(3, code.length - 3).trim()
  return (
    <>
      <StyledCodeContainer>
        <StyledButtonContainer>
          <Button onClick={() => handleCopy(codeText)}>Copy</Button>
        </StyledButtonContainer>
        <code className={`language-${language}`}>{codeText}</code>
      </StyledCodeContainer>
    </>
  )
}

export default CodeBlock

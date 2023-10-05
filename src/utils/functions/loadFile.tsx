// import lanchchain
import { TextLoader } from 'langchain/document_loaders/fs/text'
import { CSVLoader } from 'langchain/document_loaders/fs/csv'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { JSONLoader } from 'langchain/document_loaders/fs/json'
import { DocxLoader } from 'langchain/document_loaders/fs/docx'

interface LoaderfilePropsType {
  extension: string | undefined
  filePath: string
}

const LoadFile = async ({ extension, filePath }: LoaderfilePropsType) => {
  let doc
  switch (extension) {
    case 'pdf': {
      doc = await new PDFLoader(filePath).load()
      break
    }
    case 'docx': {
      doc = await new DocxLoader(filePath).load()
      break
    }
    case 'json': {
      doc = await new JSONLoader(filePath).load()
      break
    }
    case 'csv': {
      doc = await new CSVLoader(filePath).load()
      break
    }
    case 'txt': {
      doc = await new TextLoader(filePath).load()
      break
    }
  }
  return doc
}

export default LoadFile

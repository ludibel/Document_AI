import React, {
  createContext,
  useState,
  FC,
  Dispatch,
  SetStateAction,
  ReactNode,
} from 'react'

export interface FileContextProps {
  isFileUploaded: boolean
  setIsFileUploaded: Dispatch<SetStateAction<boolean>>
  fileName: string
  setFileName: Dispatch<SetStateAction<string>>
  isFileVectorized: boolean
  setIsFileVectorized: Dispatch<SetStateAction<boolean>>
  showFile: boolean
  setShowFile: Dispatch<SetStateAction<boolean>>
  openDialogSuccessVectorisation: boolean
  setOpenDialogSuccessVectorisation: Dispatch<SetStateAction<boolean>>
  selectValue: boolean
  setSelectValue: Dispatch<SetStateAction<boolean>>
  setListVector: Dispatch<SetStateAction<string[]>>
  listVector: string[]
  vector: object | undefined
  setVector: Dispatch<SetStateAction<object | undefined>>
}

const FileContext = createContext<FileContextProps | undefined>(undefined)

export const FileProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isFileVectorized, setIsFileVectorized] = useState(false)
  const [showFile, setShowFile] = useState(false)
  const [openDialogSuccessVectorisation, setOpenDialogSuccessVectorisation] =
    useState(false)
  const [selectValue, setSelectValue] = useState(false)
  const [listVector, setListVector] = useState<string[]>([])
  const [vector, setVector] = useState<object | undefined>(undefined)

  return (
    <FileContext.Provider
      value={{
        isFileUploaded,
        setIsFileUploaded,
        fileName,
        setFileName,
        isFileVectorized,
        setIsFileVectorized,
        showFile,
        setShowFile,
        openDialogSuccessVectorisation,
        setOpenDialogSuccessVectorisation,
        selectValue,
        setSelectValue,
        listVector,
        setListVector,
        vector,
        setVector,
      }}
    >
      {children}
    </FileContext.Provider>
  )
}

export default FileContext

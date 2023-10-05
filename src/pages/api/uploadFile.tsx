import type { NextApiRequest, NextApiResponse } from 'next'
import { promises as fs } from 'fs'
import path from 'path'
import formidable, { File } from 'formidable'
// import tiktoken
import { Tiktoken } from '@dqbd/tiktoken/lite'
import { load } from '@dqbd/tiktoken/load'
import registry from '@dqbd/tiktoken/registry.json'
import models from '@dqbd/tiktoken/model_to_encoding.json'
// import types
import { Result, ResultBody } from '@/utils/types/resultApi'
import LoadFile from '@/utils/functions/loadFile'
import slugName from '@/utils/functions/slugName'

export const config = {
  api: {
    bodyParser: false,
  },
}

type ProcessedFiles = Array<[string, File]>

interface UploadFileResponse extends Result {
  resultBody: UploadFileResultBody
}

interface UploadFileResultBody extends ResultBody {
  document: object | undefined
  name: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result: UploadFileResponse = {
    status: 200,
    resultBody: {
      status: 'ok',
      message: 'fichiers uploadés avec succés',
      document: {} || undefined,
      name: '',
    },
  }
  // determmine le coût d'embeddings d'un document
  const determinateCost = async (document: object | undefined) => {
    const modelName = 'text-embedding-ada-002'
    const modelKey = models[modelName]
    const model = await load(registry[modelKey])
    const encoder = new Tiktoken(
      model.bpe_ranks,
      model.special_tokens,
      model.pat_str
    )
    // tokenizer le document en tokens et compter le nombre de tokens
    const tokens = encoder.encode(JSON.stringify(document))

    const tokenCount = tokens.length

    const ratePerThousandTokens = 0.0001
    const cost = (tokenCount / 1000) * ratePerThousandTokens
    encoder.free()
    return cost
  }
  const getDocAndCost = async (directory: string, file: [string, File]) => {
    try {
      // on recupere l'extention du fichier
      const fileName = file[1]?.originalFilename
      const extension = fileName.split('.').pop()
      const fileNameSlug = slugName(fileName.split('.')[0])
      console.log('fileNameSlug', fileNameSlug)
      // on recupere le chemin du fichier
      const filePath = path.join(directory, fileNameSlug)
      console.log('filePath', filePath)
      // on charge le fichier
      const doc = await LoadFile({ extension, filePath })
      console.log('doc', doc)
      // on calcule le coût d'embeddings du fichier
      const cost = await determinateCost(doc)
      //  on enregistre le document dans le répertoire public/embeddings
      const dir = path.join(process.cwd(), 'public')
      const embeddingsFile = path.join(dir, 'embeddings')
      // on vérifie que le répertoire public/embeddings existe
      try {
        await fs.access(embeddingsFile)
      } catch (e) {
        await fs.mkdir(embeddingsFile, { recursive: true })
      }
      // on enregistre le document dans le répertoire public/embeddings
      await fs.writeFile(
        path.join(embeddingsFile, fileNameSlug),
        JSON.stringify(doc, null, 2)
      )

      return { cost, doc }
    } catch (error) {
      console.error(`Une erreur s'est produite :`, error)
    }
  }

  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      // creation de l'instance de formidable
      const form = formidable({})
      const files: ProcessedFiles = []
      // on reçoit le fichier qu'on push dans le tableau files
      form.on('file', function (field, file) {
        files.push([field, file])
      })
      // action de fin de traitement
      form.on('end', () => resolve(files))
      // action en cas d'erreur
      form.on('error', (err) => reject(err))
      form.parse(req)
    }
  ).catch((error) => {
    console.log(error)
    result.status = 500
    result.resultBody = {
      status: 'fail',
      message: `erreur lors de l'upload des fichiers`,
      document: {} || undefined,
      name: '',
    }
    res.status(result.status).json(result.resultBody)
  })
  // si aucun fichier n'a été reçu
  if (files && files.length === 0) {
    result.status = 400
    result.resultBody = {
      status: 'fail',
      message: 'Aucun fichier reçu',
      name: '',
      document: {} || undefined,
    }
    res.status(result.status).json(result.resultBody)
  }
  // si des fichiers ont été reçus
  if (files && files.length > 0) {
    // creation du répertoire public/upload s'il n'existe pas
    const directory = path.join(process.cwd() + '/public/upload/')
    try {
      await fs.access(directory)
    } catch (e) {
      await fs.mkdir(directory, { recursive: true })
    }
    // déplacement des fichiers dans le répertoire public/upload
    for (const file of files) {
      const ext = ['pdf', 'docx', 'json', 'csv', 'txt']
      // const name = Object.values(file)[1].originalFilename
      const name = file[1].originalFilename
      const fileNameSlug = slugName(name.split('.')[0])
      const extension = name?.split('.').pop()
      const lists = await fs.readdir(directory)
      // on vérifie que l'extension est autorisée
      if (extension && !ext.includes(extension)) {
        result.status = 400
        result.resultBody = {
          status: 'fail',
          message: 'Extension non autorisée',
          document: {} || undefined,
          name: '',
        }
      }
      // on vérifie que le fichier n'existe pas déjà
      if (fileNameSlug && lists.includes(fileNameSlug)) {
        result.status = 400
        result.resultBody = {
          status: 'fail',
          message: 'Fichier déjà existant',
          document: {} || undefined,
          name: '',
        }
      }
      // on enregistre le fichier dans le répertoire public/upload si l'extension est autorisée et que le fichier n'existe pas déjà
      if (
        extension &&
        fileNameSlug &&
        ext.includes(extension) &&
        !lists.includes(fileNameSlug)
        // lists.length < 3
      ) {
        const tempPath = file[1].filepath
        // const fileName = file[1].originalFilename
        // const fileNameUpload = slugName(file[1].originalFilename)
        await fs.copyFile(tempPath, directory + fileNameSlug)
        await fs.rm(tempPath)
        const costvectoristionfile = await getDocAndCost(directory, file)
        result.status = 200
        result.resultBody = {
          status: 'ok',
          message: 'fichiers uploadés avec succés',
          document: costvectoristionfile,
          name: fileNameSlug,
        }
      }
    }

    // Rechargement de la page après l'upload du fichier
    res.setHeader('Refresh', '0')
    res.status(result.status).json(result.resultBody)
  }
}

export default handler

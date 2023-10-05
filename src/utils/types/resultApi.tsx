export interface Result {
  status: number
  resultBody: ResultBody
}

export interface ResultBody {
  status: string
  message: string
}

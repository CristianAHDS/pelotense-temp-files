import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const FilesContext = createContext(null)

export const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ptf_files')
      return saved ? JSON.parse(saved) : []
    } catch { return [] }
  })

  useEffect(() => {
    sessionStorage.setItem('ptf_files', JSON.stringify(files))
  }, [files])

  const addFile = useCallback((file) => {
    const reader = new FileReader()
    reader.onload = () => {
      const id = crypto.randomUUID()
      const expiraEm = new Date(Date.now() + file.tempoHoras * 60 * 60 * 1000).toISOString()
      const novo = {
        id,
        nome: file.nome,
        tamanho: file.tamanho,
        tipo: file.tipo,
        senha: file.senha || '',
        expiraEm,
        criadoEm: new Date().toISOString(),
        dataUrl: reader.result,
      }
      setFiles((prev) => [...prev, novo])
    }
    reader.readAsDataURL(file.arquivo)
  }, [])

  const removeFile = useCallback((id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }, [])

  const getFile = useCallback((id) => files.find((f) => f.id === id), [files])

  const validFiles = files.filter((f) => new Date(f.expiraEm) > new Date())

  return (
    <FilesContext.Provider value={{ files: validFiles, addFile, removeFile, getFile }}>
      {children}
    </FilesContext.Provider>
  )
}

export const useFiles = () => useContext(FilesContext)

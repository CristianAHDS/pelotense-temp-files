import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'
import { db, storage } from '../firebase/config'

const FilesContext = createContext(null)

export const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([])

  useEffect(() => {
    const q = query(
      collection(db, 'arquivos'),
      where('expiraEm', '>', new Date()),
      orderBy('criadoEm', 'desc')
    )

    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setFiles(lista)
    })

    return () => unsub()
  }, [])

  const addFile = useCallback(async (fileData) => {
    const storageRef = ref(
      storage,
      `arquivos/${Date.now()}_${fileData.arquivo.name.replace(/\s+/g, '_')}`
    )

    await uploadBytes(storageRef, fileData.arquivo)
    const downloadUrl = await getDownloadURL(storageRef)

    const expiraEm = new Date(
      Date.now() + fileData.tempoHoras * 60 * 60 * 1000
    )

    await addDoc(collection(db, 'arquivos'), {
      nome: fileData.arquivo.name,
      tamanho: fileData.arquivo.size,
      tipo: fileData.arquivo.type,
      downloadUrl,
      senha: fileData.senha || '',
      expiraEm,
      criadoEm: serverTimestamp(),
    })
  }, [])

  const removeFile = useCallback(async (id, downloadUrl) => {
    try {
      if (downloadUrl) {
        const storageRef = ref(storage, downloadUrl)
        await deleteObject(storageRef)
      }
    } catch (error) {
      console.error('Erro ao deletar arquivo do Storage:', error)
    }

    await deleteDoc(doc(db, 'arquivos', id))
  }, [])

  const getFile = useCallback((id) => files.find((f) => f.id === id), [files])

  return (
    <FilesContext.Provider value={{ files, addFile, removeFile, getFile }}>
      {children}
    </FilesContext.Provider>
  )
}

export const useFiles = () => useContext(FilesContext)

import { useContext } from 'react'
import { SetPageContext } from './Contexts'

export default function useNavigation() {
  return useContext(SetPageContext)
}
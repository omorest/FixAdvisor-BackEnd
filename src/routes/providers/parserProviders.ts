import { FirebaseFirestore } from '@firebase/firestore-types'
import { Provider } from '../../models/provider.model'

type DocFB = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>

export const toProvider = (doc: DocFB): Provider => {
  return {
    ...doc.data()
  } as Provider
}

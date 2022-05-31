import { FirebaseFirestore } from '@firebase/firestore-types'
import { Service } from '../../models/service.model'

type DocFB = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>

export const toService = (doc: DocFB): Service => {
  return {
    ...doc.data()
  } as Service
}

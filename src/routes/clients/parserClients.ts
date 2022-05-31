import { FirebaseFirestore } from '@firebase/firestore-types'
import { Client } from '../../models/client.model'

type DocFB = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>

export const toClient = (doc: DocFB): Client => {
  return {
    ...doc.data()
  } as Client
}

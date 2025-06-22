import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { config } from "../../config/config.ts";

const app = initializeApp(config.fbConfig);
export const db = getFirestore(app);
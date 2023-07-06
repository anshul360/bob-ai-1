// 'use client'

import { Inter } from 'next/font/google'
// import { FirebaseAppProvider } from 'reactfire';

// const firebaseConfig = {
//   apiKey: "AIzaSyAlc__n0JLRvyue-QDF_x3nQByTDOpbCmk",
//   authDomain: "scouthangout.firebaseapp.com",
//   databaseURL: "https://scouthangout-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "scouthangout",
//   storageBucket: "scouthangout.appspot.com",
//   messagingSenderId: "518444955661",
//   appId: "1:518444955661:web:59e9a15889ff573f03bd44",
//   measurementId: "G-DKVCQ0Q7GW"
// };

const inter = Inter({ subsets: ['latin'] })


export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <FirebaseAppProvider firebaseConfig={firebaseConfig}>
       children 
    // </FirebaseAppProvider>
  )
}

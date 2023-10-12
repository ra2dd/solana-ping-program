import 'dotenv/config'
import * as web3 from "@solana/web3.js"
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers"

const sender = new web3.PublicKey(process.env.PUBLIC_KEY)
const payer = getKeypairFromEnvironment("SECRET_KEY")
const connection = new web3.Connection(web3.clusterApiUrl('devnet'))

const recipient = new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod')

async function sendTransaction(connection: web3.Connection, sender: web3.PublicKey, recipient: web3.PublicKey, senderKey: web3.Keypair) {
    const transaction = new web3.Transaction()
    
    const sendInstruction = web3.SystemProgram.transfer({
        fromPubkey: sender,
        toPubkey: recipient,
        lamports: 1
    })

    transaction.add(sendInstruction)

    const signature = web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [senderKey]
    )

    signature.then(signature => {
        console.log(`Transaction completed \nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
    })
}

sendTransaction(connection, sender, recipient, payer)
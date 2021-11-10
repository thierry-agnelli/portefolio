// Modèle
import Message from "../models/Message.js";
// Lib
import { promptLog } from "../lib/logs.js";
import { contactMessageReceivedMail } from "../lib/mailing.js";

/* Contrôleur message */
const messageController = {
    receiveMessage: (req, res) => {
        promptLog("Received contact message", "yellow");

        const newMessage = new Message(req.body);
        
        newMessage.save()
        .then(result => {
            promptLog(`Saving message on id: ${result._id}`, "green");
            contactMessageReceivedMail(result);
            res.status(200).send("Message received");
        })
        .catch(error =>{
            console.log(error);
            res.status(400).send("Error in message reception");
        });
    },
};

export default messageController;
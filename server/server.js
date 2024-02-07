require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());
app.get('/api', (req, res) => {
    res.json({ "users": ["user1", "user2", "user3"] })
})

app.post('/wppmessage', async function (req, res) {
    const telefono = req.body.telefono  
    const name = req.body.name

    await fetch(`https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        },
        body: JSON.stringify(
            {
                "messaging_product": "whatsapp",
                "to": `54${telefono}`,
                "type": "template",
                "template": {
                    "name": 'welcome_expo',
                    "language": {
                        "code": "es_AR"
                    }
                },
                // "components": [
                //     {
                //         "type": "body",
                //         "parameters": [
                //             {
                //                 "type": "text",
                //                 "text": 'Uriel'
                //             }
                //         ]
                //     }
                // ]
            })
    })
    res.json({ "message": "Mensaje enviado" })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
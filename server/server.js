require('dotenv').config()
const express = require('express');
const app = express();
app.use(express.json());

const token = process.env.TOKEN
app.get('/api', (req, res) => {
    res.json({ "users": ["user1", "user2", "user3"] })
})
// to verify the callback url from dashboard side - cloud api side
app.get("/webhook", (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    const mytoken = process.env.VERIFY_TOKEN;

    if (mode && token) {
        if (mode === 'subscribe' && token === mytoken) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
})

app.post('/webhook', async function(req, res) {
    const body = req.body
    console.log(JSON.stringify(body,null,2))
    if(body.object) {
        if(body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0].type === "button") {
            const phone_no_id = body.entry[0].changes[0].value.metadata.phone_number_id
            const from = body.entry[0].changes[0].value.messages[0].from
            const msg_body = body.entry[0].changes[0].value.messages[0].button.text
            if (msg_body === "OK") {
                fetch(`https://graph.facebook.com/v18.0/${process.env.PHONE_NUMBER}/messages`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
                    },
                    body: JSON.stringify(
                        {
                            "messaging_product": "whatsapp",
                            "to": from,
                            "type": "template",
                            "template": {
                                "name": 'welcome_expo',
                                "language": {
                                    "code": "es_AR"
                                },
                            },
                        })
                })
            }
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    }
});

app.get('/gettemplates', async function (req, res) {
    // Obtener plantillas de mensajes
    const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_BUSINESS_ID}/message_templates?fields=name,status,components`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        },
    })
    const data = await response.json()
    console.log(data)
    res.json(data)
})

app.post('/edittemplate', async function (req, res) {
  // Editar una plantilla de mensajes
    const template_id = "1433949387528908"
    const response = await fetch(`https://graph.facebook.com/v18.0/${template_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        },
        body: JSON.stringify(
            {
                "components": [
                    {
                        "type": "BODY",
                        "text": "Gracias por hacer la orden con nosotros. Tu orden está en camino. Avisanos cuando llegue. Bye Bye"
                    },
                ],
            },
        )
    })
    const data = await response.json()
    console.log("response: ", data)
    console.log("Plantilla editada")
    res.json({ "message": "Plantilla editada" })
})

app.delete('/deletetemplate', async function (req, res) {
    // Eliminar una plantilla de mensajes
    const response = await fetch(`https://graph.facebook.com/v18.0/${process.env.WHATSAPP_BUSINESS_ID}/message_templates?hsm_id=1433949387528908&name=test_variable`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
        },
    })
    const data = await response.json()
    console.log(data)
    res.json({ "message": "Plantilla eliminada" })
})

app.post('/wppmessage', async function (req, res) {
    const telefono = req.body.telefono  
    const name = req.body.name
    // Envío de un mensaje template (plantilla) a un número de teléfono
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
                    "name": 'welcome_expo_2',
                    "language": {
                        "code": "es_AR"
                    },
                    "components": [
                        {
                            "type": "body",
                            "parameters": [
                                {
                                    "type": "text",
                                    "text": `${name}`
                                }
                            ]
                        }
                    ]
                },
            })
    })
    // Ejemplo de creacion de un template - Plantilla
    // await fetch(`https://graph.facebook.com/v19.0/${process.env.WHATSAPP_BUSINESS_ID}/message_templates`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
    //     },
    //     body: JSON.stringify(
    //         {
    //             "name": "prueba_template",
    //             "category": "UTILITY",
    //             "allow_category_change": true,
    //             "language": "es_AR",
    //             "components": [
    //                 {
    //                     "type": "BODY",
    //                     "text": "Gracias por hacer la orden con nosotros. Tu orden está en camino. Avisanos cuando llegue."
    //                 },
    //             ],
    //         },
    //     )
    // })
    res.json({ "message": "Mensaje enviado" })
})

app.listen(5000, () => {
    console.log('Server is running on port 5000')
})
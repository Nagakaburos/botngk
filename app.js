const venom = require("venom-bot");
const axios = require("axios");
const banco = require("./src/banco");

venom.create({
    session: "chatGPT_BOT",
    multidevice: true
})
    .then((client) => start(client))
    .catch((err) => console.log(err));

const header = {
    "Content-Type": "application/json",
    "Authorization": "Bearer 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"
};

const start = (client) => {
    client.onMessage((message) => {
        const userCadastro = banco.db.find(numero => numero.num === message.from);

        if (!userCadastro) {
            console.log("Cadastrando usuario");
            banco.db.push({ num: message.from, historico: [] });
        } else {
            console.log("Usuário já cadastrado");
        }

        const historico = banco.db.find(num => num.num === message.from);
        historico.historico.push("user: " + message.body);
        console.log(historico.historico);

        console.log(banco.db);

        axios.post("https://api.openai.com/v1/chat/completions", {
            "model": "gpt-3.5turbo",
            "messages": [
                {
                     "role": "system", 
                     "content": "Histórico de Conversas:\n" + historico.historico.join("\n") 
                },
                {
                     "role": "user", 
                     "content": message.body }
            ]
        }, {
            headers: header
        })
            .then((response) => {
                console.log(response.data.choices[0].message.content);
                historico.historico.push("assistent: " + response.data.choices[0].message.content);
                client.sendText(message.from, response.data.choices[0].message.content);
            })
            .catch((err) => {
                console.log(err);
            });
    });
};




/*************************************************************************
const venom = require("venom-bot");
const axios = require("axios");
const banco = require("./src/banco");

venom.create({
    session: "chatGPT_BOT",
    multidevice: true
})
    .then((client) => start(client))
    .catch((err) => console.log(err));

    const header = {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
    }

const start = (client) =>{
    client.onMessage((message) => {
        const userCadastro = banco.db.find(numero => numero.num === message.from);

        if(!userCadastro){
            console.log("Cadastrando usuario");
            banco.db.push({num: message.from, historico : []})
        }
        else{
            console.log("usuario já cadastrado");
        }

        const historico = banco.db.find(num => num.num ===Storage.from);
        historico.historico.push("user: " + message.body);
        console.log(historico.historico);
 
        console.log(banco.db);
        axios.post("https://api.openai.com/v1/chat/completions", {
          "model": "gpt-3.5turbo",
          "messages": [
            {"role": "system", "content": "historico de conversas: " + historico.historico},
            {"role": "user", "content": message.body}
        ]
        }, {
            headers: header
        })
        .then((response)=>{
            console.log(response.data.choices[0].message.Content);
            historico.historico.push("assistent: " + response.data.choices[0].message.content);
            client.sendText(message.from,response.data.choices[0].message.content);
        })
        .catch((err)=>{
            console.log(err);
        })
    })
}




/*************************************************************************





//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

/*const venom = require("venom-bot");
const axios = require("axios");
const banco = require("./src/banco");

venom.create({
  session: "chatGPT_BOT",
  multidevice: true
})
.then((client) => start(client))
.catch((err) => console.log(err));

const header = {
    "Countent-Type": "application/json",
    "Authorization": "Bearer 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"
}

const start = (client)=>{ 
    client.onMessage((message) => {
        const userCadastro = banco.db.find(numero => numero.num === message.from);
        if(!userCadastro){
            console.log("Cadastrando usuario");
            banco.db.push({num: message.from, historico : []})
        }
        else{
            console.log("usuario já cadastrado");
        }

        const historico = banco.db.find(num => num.num ===Storage.from);
        historico.historico.push("user: " + message.body);
        console.log(historico.historico)

        console.log(banco.db);
        axios.post("https://api.openai.com/v1/chat/completions", {
            "model": "gpt-3.5-turbo", 
            "messages": [
                {"role": "system", "content": "historico de conversas: " + historico.historico},
            {"role": "system", "content": message.body}
        ]  // Adicionando um sistema de mensagem
        },{
           headers: header
       })
        .then((response)=>{
            console.log(response.data.choices[0].message.content);
            historico.historico.push("assistent: " + response.data.choices[0].message.content);
            client.sendText(message.from, response.data.choices[0].message.content);
       })
        .catch((err)=>{
            console.log(err);
        })
  });
}*/








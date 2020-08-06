//dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "88889999",
        bio: "Entusiasta das melhores tecnologias de química avançada<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: "Diogo Pessoa",
        avatar: "https://avatars3.githubusercontent.com/u/32640285?s=460&u=6b7d48fec0842a67c71a55f5ca771f63195b3503&v=4",
        whatsapp: "31999650671",
        bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi esse tempora exercitationem? Odit eligendi fugit perferendis cupiditate dicta itaque, eius porro facere, labore repudiandae quam odio deserunt accusamus optio quibusdam.<br><br>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum in accusamus iusto exercitationem pariatur suscipit maxime? Facere iusto cupiditate ipsam ducimus vero tempore pariatur amet, eos deserunt consequuntur quidem voluptate!",
        subject: "Português",
        cost: "20",
        weekday: [3],
        time_from: [720],
        time_to: [1220],
    },
    {
        name: "Mayk Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "311111671",
        bio: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi esse tempora exercitationem? Odit eligendi fugit perferendis cupiditate dicta itaque, eius porro facere, labore repudiandae quam odio deserunt accusamus optio quibusdam.<br><br>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum in accusamus iusto exercitationem pariatur suscipit maxime? Facere iusto cupiditate ipsam ducimus vero tempore pariatur amet, eos deserunt consequuntur quidem voluptate!",
        subject: "Matemática",
        cost: "20",
        weekday: [5],
        time_from: [720],
        time_to: [1220],
    }
]

const subjects = [

    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "Hisória",
    "Matemática",
    "Portugês",
    "Quimíca",

]

const weekdays = [

    "Domingo",
    "Seguda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",

]

function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}


//Funcionalidades
function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query
    
    //se tiver dados
    const isNotEmpety = Object.keys(data).length > 0
    if (isNotEmpety){
       
       data.subject = getSubject(data.subject)
       
        //adicionar dados ao array proffys
        proffys.push(data)
        return res.redirect("/study")
    }
    

    return res.render("give-classes.html", { subjects, weekdays })
}

//Servidor
const express = require('express')
const server = express()

//configurar nunjucks (template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

//Configuração Servidor
server
    // configurar arquivos estáticos (css, scripts, imagnes)
    .use(express.static("public"))
    //rota da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .listen(5500)
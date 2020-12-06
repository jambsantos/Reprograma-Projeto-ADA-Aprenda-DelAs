const express = require('express')
const router = express.Router()

router.get("/", function (req, res) {
    res.status(200).send({
        title: "Reprograma - Projeto Final - ADA - Aprendo DelAs - Criando seu legado na área de TI",
        version: "1.0.0"
    })
})

module.exports = router;
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
const upload = multer({ dest: 'uploads/' });

// Configuração para servir arquivos estáticos (como CSS, JS, imagens)
app.use(express.static('public'));

// Rota para receber os arquivos enviados pelo formulário
app.post('/upload', upload.array('files'), (req, res) => {
    console.log('Arquivos recebidos:', req.files);
    res.json({ message: 'Arquivos enviados com sucesso!' });
});

// Rota para baixar os arquivos compactados em ZIP
app.get('/download', (req, res) => {
    const output = fs.createWriteStream(path.join(__dirname, 'arquivos.zip'));
    const archive = archiver('zip', {
        zlib: { level: 9 } // Nível de compressão
    });

    output.on('close', () => {
        res.download(path.join(__dirname, 'arquivos.zip'), 'arquivos.zip', (err) => {
            if (err) {
                console.error('Erro ao enviar o arquivo:', err);
            }
            // Limpar o arquivo ZIP após o download
            fs.unlinkSync(path.join(__dirname, 'arquivos.zip'));
        });
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    // Adicionar todos os arquivos da pasta 'uploads' ao ZIP
    const files = fs.readdirSync('uploads');
    files.forEach(file => {
        archive.file(path.join('uploads', file), { name: file });
    });

    archive.finalize();
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
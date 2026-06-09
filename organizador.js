const fs = require('fs');
const path = require('path');

// Ajuste os caminhos de acordo com a sua pasta
// Pelo seu print, o script deve apontar para onde as pastas DefineSprite estão
const originDir = path.join(__dirname, 'ClothStore', 'sprites'); 
const destDir = path.join(__dirname, 'ClothStore', 'img');

// Cria a pasta de destino se ela não existir
if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// Lê tudo o que tem dentro da pasta de origem
console.log("Lendo pastas...");
const folders = fs.readdirSync(originDir);

let count = 0;

folders.forEach(folder => {
    const folderPath = path.join(originDir, folder);
    
    // Confirma se o item é realmente uma pasta (ignora arquivos soltos)
    if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        
        files.forEach(file => {
            // Pega apenas os PNGs
            if (file.endsWith('.png')) {
                const oldPath = path.join(folderPath, file);
                
                // Cria o novo nome juntando a pasta e o arquivo
                // Fica algo como: DefineSprite_2_1.png
                const newFileName = `${folder}_${file}`;
                const newPath = path.join(destDir, newFileName);
                
                // Copia o arquivo para a nova pasta
                fs.copyFileSync(oldPath, newPath);
                count++;
            }
        });
    }
});

console.log(`Sucesso! ${count} sprites foram extraídos e movidos para a pasta 'sprites_organizados'.`);
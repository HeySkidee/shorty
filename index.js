// 1. load all the urls from redirects.yml
const YAML = require('yaml');
const fs = require('fs');
const path = require('path');


const redirectsFile = fs.readFileSync(path.join(__dirname, 'redirects.yml'), 'utf-8');
const redirects = YAML.parse(redirectsFile);

console.log(redirects)

// 2. generate an html page for each redirect url from template.html

const templateHTML = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');

// 3. loop through 

for (let [slug, url] of Object.entries(redirects)){
    // it converts the items in an object into array of arrays.
    console.log("generating html page for ", slug)

    //create folder for each slug
    const html = templateHTML.replaceAll('https://example.com', url)
    const folderPath = path.join(__dirname, 'out', slug)
    fs.mkdirSync(folderPath, { recursive: true })


    //create an index.html in each slug directory
    fs.writeFileSync(path.join(folderPath, 'index.html'), html)

}
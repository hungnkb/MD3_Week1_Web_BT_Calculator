const qs = require('qs');
const http = require('http');
const fs = require('fs');

const sever = http.createServer((req, res) => {
    if (req.method == 'GET') {
        fs.readFile('./calculator.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        })
        req.on('end', () => {
            let result = 0;
            const dataCalculator = qs.parse(data);
            if (dataCalculator.selected == '+') {
                result = +dataCalculator.firstNumber + +dataCalculator.secondNumber;
            } else if (dataCalculator.selected == '-') {
                result = +dataCalculator.firstNumber - +dataCalculator.secondNumber;
            } else if (dataCalculator.selected == '*') {
                result = +dataCalculator.firstNumber * +dataCalculator.secondNumber;
            } else if (dataCalculator.selected == '/') {
                result = +dataCalculator.firstNumber / +dataCalculator.secondNumber;
            }
            fs.readFile('./display.html', 'utf-8', (err, dataResult) => {
                if (err) {
                    console.log(err);
                }
                dataResult = dataResult.replace('{result}', result);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(dataResult);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
}).listen(8080, () => console.log('sever is running at localhost:8080'))
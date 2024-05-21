const theme = require('./style.ts');
//@ts-ignore
const fs = require('fs');

const variables = {
    'button.primary.color': 'red',
    'button.primary.background': 'blue'
};

const getKey = (value) => {
    return variables[value];
};

const _theme = theme.theme;
const k = _theme({ dt: (key) => `${getKey(key)}` });

fs.writeFile('./button.css', k, (err) => {
    if (err) throw err;
    console.log('File has been saved');
});


console.log("=== Sistema de Metas Pessoais ===");
console.log("Bem-Vindo ao sistema de metas pessoais!");

let metas =[];

console.log("Metas Atuais:", metas);

const inquirer = require('inquirer');

function adicionarMeta() {
inquirer.input([
    {
      type: 'input',
      name: 'novaMeta',
      message: 'Digite sua nova meta:',
    },
  ]);
  then((answers) => {
    metas.push(answers.novaMeta);
    console.log("Meta Adicionada:", novaMeta);
    console.log("Metas Atualizadas:", metas.length);
  });
};

adicionarMeta(metas);
console.log("Metas Finais:", metas);
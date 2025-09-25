const { input, select, checkbox } = require('@inquirer/prompts');

let metas =[];

function limpaTela() {

    console.clear();
}

function mostrarMensagem(mensagem) {

    console.log(`\n${mensagem}\n`);
}

async function mostrarMenu() {

    const opcao = await select({
        message: "Escolha uma opção:",
        choices: [
            { name: "📝 Adicionar Meta", value: "adicionar" },
            { name: "🗒️  Mostrar Metas", value: "mostrar" },
            { name: "✅ Marcar metas como realizadas", value: "marcar"},
            { name: "❌ Sair", value: "sair" }
        ]
    });
    return opcao;
}

async function executarAcao(opcao) {

    switch (opcao) {
        case "adicionar":
            await adicionarMeta();
            break;
        case "mostrar":
            await mostrarMetas();
            break;
        case "marcar":
            await marcarMetas();
            break;
        case "sair":
            break;
        default:
            console.log("Opção inválida. Tente novamente.");
    }
}

async function iniciar() {

    limpaTela();
    mostrarMensagem("=== Sistema de Metas Pessoais ===");

    while (true) {
        const opcao = await mostrarMenu();
        
        if (opcao === "sair") {
            await executarAcao(opcao);
            limpaTela();
            mostrarMensagem("Até mais! 👋");
            break;
    }
    await executarAcao(opcao);
 }
}

async function adicionarMeta() {

    const descricao = await input({
        message: "📝 Digite sua nova meta pessoal:"
    });

    if (descricao.length === 0) {
        mostrarMensagem("❌ Meta inválida. Tente novamente.");
        return;
    }

    const novaMeta = {
        value: descricao,
        checked: false
    }

    metas.push(novaMeta);
    mostrarMensagem("✔️  Meta adicionada com sucesso!");
}

async function mostrarMetas() {

    if (metas.length === 0) {
        mostrarMensagem("🔻 Não existem mais metas cadastradas! 🔻");
        return;
    }

    console.log("📖 Suas Metas Pessoais:");
    metas.forEach((meta, index) => {
        const status = meta.checked ? "[x]" : "[ ]";
        console.log(`${status} ${index + 1}. ${meta.value}`);
    });
}

async function marcarMetas(){

    if (metas.length === 0){
        mostrarMensagem(" Não existem metas cadastradas");
        return;
    }
    
    const metasSelecionadas = await checkbox({
        message: "Selecione as metas que você já concluiu:",
        choices: metas.map (meta => 
        ({ name: meta.value,
            value: meta.value,
            checked: meta.value
        })),
    })

    metas.forEach(meta => meta.checked = false);

    metasSelecionadas.forEach(metasSelecionadas => {
        const meta = metas.find(m => m.value === metasSelecionadas)
        if (meta) {
            meta.checked = true;
        }
    });
    mostrarMensagem(" ✅ Metas atualizadas com sucesso!");
}

async function metasRealizadas(){
    const realizadas = metas.filter(meta => meta.checked);

    if (realizadas.length === 0) {
        mostrarMensagem("🔻 Nenhuma meta foi realizada ainda! 🔻");
        return;
    }

    console.log("🏆 Metas Realizadas:");
    realizadas.forEach((meta, index) => {
        console.log(`[x] ${index + 1}. ${meta.value}`);
    });

    mostrarMensagem(`Total de metas realizadas: ${realizadas.length} metas! 🎆`);
}

iniciar();





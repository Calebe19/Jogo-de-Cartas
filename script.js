const simbolos = ["🍎", "🐶", "🚀", "⚽", "🌟", "🎵", "🐱", "🍕"];

let jogadorAtual = 1;
let pontos = { 1: 0, 2: 0 };
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let paresEncontrados = 0;

const tabuleiro = document.getElementById("tabuleiro");
const mensagemVez = document.getElementById("mensagem-vez");
const resultado = document.getElementById("resultado");
const textoResultado = document.getElementById("texto-resultado");
const botaoReiniciar = document.getElementById("btn-reiniciar");
const placar1 = document.getElementById("placar-1");
const placar2 = document.getElementById("placar-2");
const pontos1 = document.getElementById("pontos-1");
const pontos2 = document.getElementById("pontos-2");

function embaralhar(lista) {
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temporario = lista[i];
        lista[i] = lista[j];
        lista[j] = temporario;
    }

    return lista;
}

function atualizarPlacar() {
    pontos1.textContent = pontos[1];
    pontos2.textContent = pontos[2];
    mensagemVez.textContent = `Vez do Jogador ${jogadorAtual}`;

    placar1.classList.toggle("ativo", jogadorAtual === 1);
    placar2.classList.toggle("ativo", jogadorAtual === 2);
}

function criarCarta(simbolo) {
    const carta = document.createElement("button");
    carta.classList.add("carta");
    carta.type = "button";
    carta.textContent = "?";
    carta.dataset.simbolo = simbolo;
    carta.addEventListener("click", virarCarta);
    tabuleiro.appendChild(carta);
}

function iniciarJogo() {
    jogadorAtual = 1;
    pontos = { 1: 0, 2: 0 };
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    paresEncontrados = 0;

    tabuleiro.innerHTML = "";
    resultado.classList.add("escondido");
    mensagemVez.classList.remove("escondido");

    const cartas = embaralhar([...simbolos, ...simbolos]);
    cartas.forEach(criarCarta);
    atualizarPlacar();
}

function virarCarta(evento) {
    const cartaClicada = evento.currentTarget;

    if (
        bloqueado ||
        cartaClicada === primeiraCarta ||
        cartaClicada.classList.contains("encontrada")
    ) {
        return;
    }

    cartaClicada.textContent = cartaClicada.dataset.simbolo;
    cartaClicada.classList.add("virada");

    if (primeiraCarta === null) {
        primeiraCarta = cartaClicada;
        return;
    }

    segundaCarta = cartaClicada;
    bloqueado = true;
    verificarPar();
}

function verificarPar() {
    const formouPar = primeiraCarta.dataset.simbolo === segundaCarta.dataset.simbolo;

    if (formouPar) {
        primeiraCarta.classList.add("encontrada");
        segundaCarta.classList.add("encontrada");
        primeiraCarta.disabled = true;
        segundaCarta.disabled = true;

        pontos[jogadorAtual]++;
        paresEncontrados++;
        limparJogada();
        atualizarPlacar();

        if (paresEncontrados === simbolos.length) {
            finalizarJogo();
        }

        return;
    }

    setTimeout(function () {
        primeiraCarta.textContent = "?";
        segundaCarta.textContent = "?";
        primeiraCarta.classList.remove("virada");
        segundaCarta.classList.remove("virada");

        jogadorAtual = jogadorAtual === 1 ? 2 : 1;
        limparJogada();
        atualizarPlacar();
    }, 1000);
}

function limparJogada() {
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
}

function finalizarJogo() {
    if (pontos[1] > pontos[2]) {
        textoResultado.textContent = `Jogador 1 venceu! (${pontos[1]} × ${pontos[2]})`;
    } else if (pontos[2] > pontos[1]) {
        textoResultado.textContent = `Jogador 2 venceu! (${pontos[1]} × ${pontos[2]})`;
    } else {
        textoResultado.textContent = `Empate! (${pontos[1]} × ${pontos[2]})`;
    }

    mensagemVez.classList.add("escondido");
    resultado.classList.remove("escondido");
}

botaoReiniciar.addEventListener("click", iniciarJogo);

iniciarJogo();

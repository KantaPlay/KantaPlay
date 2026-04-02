function gerenciarSelecao(checkbox) {
    let lista = JSON.parse(localStorage.getItem('kantaplay_lista')) || [];
    if (checkbox.checked) {
        if (!lista.includes(checkbox.value)) lista.push(checkbox.value);
    } else {
        lista = lista.filter(item => item !== checkbox.value);
    }
    localStorage.setItem('kantaplay_lista', JSON.stringify(lista));
    atualizarContador();
}

function atualizarContador() {
    const lista = JSON.parse(localStorage.getItem('kantaplay_lista')) || [];
    let contador = document.getElementById('contador-musicas');
    if (!contador) {
        contador = document.createElement('div');
        contador.id = 'contador-musicas';
        contador.className = 'contador-flutuante';
        document.body.prepend(contador);
    }
    if (lista.length > 0) {
        contador.style.display = 'flex';
        contador.innerHTML = `<span>${lista.length}</span> músicas selecionadas`;
    } else {
        contador.style.display = 'none';
    }
}

function inicializarPagina() {
    const lista = JSON.parse(localStorage.getItem('kantaplay_lista')) || [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        if (lista.includes(cb.value)) cb.checked = true;
        cb.setAttribute('onchange', 'gerenciarSelecao(this)');
    });
    atualizarContador();
}

function enviarWhatsApp() {
    const lista = JSON.parse(localStorage.getItem('kantaplay_lista')) || [];
    if (lista.length === 0) return alert("Sua lista está vazia!");
    const msg = encodeURIComponent("Olá Paulo! Fiz o Pix e aqui está minha lista:\n\n• " + lista.join("\n• "));
    window.open(`https://wa.me/5511972330562?text=${msg}`, "_blank");
}

document.addEventListener('DOMContentLoaded', inicializarPagina);
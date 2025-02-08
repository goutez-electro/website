function switchTab(tabId) {
    // Désactiver tous les onglets et boutons
    document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('show', 'active'));
    document.querySelectorAll('.nav-link').forEach(tab => tab.classList.remove('active'));

    // Activer le bon onglet et le bon bouton
    document.getElementById(tabId).classList.add('show', 'active');
    document.querySelector(`[data-bs-target="#${tabId}"]`).classList.add('active');
}
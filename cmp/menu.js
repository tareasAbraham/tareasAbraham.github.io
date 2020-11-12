class Menu extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <!-- Cabecera -->
        <div class="fila1">
            <header id="cabecera" class="limpiador">
                <div id="agrupamiento">
                    <h1 style="text-align: center;">
                        <a href="#" class="logoMenu">Covid-rama</a>
                    </h1>
                </div>
            </header>
        </div>
        <!-- Cabecera -->
        `
    }
}
window.customElements.define('menu-pagina', Menu);
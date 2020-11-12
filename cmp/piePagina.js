class PiePagina extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
        <br><br>
        <div id="page-container">
            <div id="content-wrap">
            </div>
            <footer id="footer">
                <p class="fl_izq">Copyright &copy; 2020 </p>
                <p class="fl_der"><a target="_blank" href="https://www.facebook.com/codefire/" class="visitado">Hecho por Abraham Rivera</a></p>
            </footer>
        </div>
        `
    }
}
window.customElements.define('pie-pagina', PiePagina);
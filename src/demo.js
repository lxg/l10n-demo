import L10n from "@lxg/l10n"
import translations from './translations.json'

customElements.define('l10n-demo', class extends HTMLElement {
    static get observedAttributes() {
        return ["lang"]
    }

    constructor() {
        super()
        this._shadow = this.attachShadow({ mode: "open" })
        this._l10n = new L10n(translations)

    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "lang") {
            this._l10n.setLocale(newValue)
            oldValue && this.connectedCallback()
        }
    }

    connectedCallback() {
        const one = 1
        const more = 5

        this._shadow.innerHTML = `
            <style>
                * {
                    font-family: Roboto, Helvetica, Arial, sans-serif;
                    font-size: 12px;
                }

                .main {
                    all: initial;
                    display: block;
                    padding: 10px;
                }

                h1 {
                    margin: 0;
                }

                table {
                    border-collapse: collapse
                }

                th, td {
                    text-align: left;
                    border: 1px solid #ccc;
                    padding: 1rem 2rem;
                    vertical-align: top;
                    white-space: nowrap
                }

                th:nth-child(2), td:nth-child(2) {
                    background: rgb(172, 236, 162)
                }

                td:nth-child(3), code {
                    font-family: monospace
                }

                td:nth-child(4) {
                    white-space: normal
                }
            </style>

            <div class="main">
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Demo</th>
                        <th>Source</th>
                    </tr>
                    <tr>
                        <td>Simple</td>
                        <td>${this._l10n.t("Hello World")}</td>
                        <td>this._l10n.t("Hello World")</td>
                    </tr>
                    <tr>
                        <td>Context</td>
                        <td>${this._l10n.x("money", "Amount")}<br>
                            ${this._l10n.x("count", "Amount")}</td>
                        <td>this._l10n.x("money", "Amount")<br>
                            this._l10n.x("count", "Amount")</td>
                    </tr>
                    <tr>
                        <td>Plurals</td>
                        <td>${this._l10n.n("1 child", "%s children", one).replace("%s", one)}<br>
                            ${this._l10n.n("1 child", "%s children", more).replace("%s", more)}</td>
                        <td>
                            const one = 1<br>
                            const more = 5<br>
                            this._l10n.n("1 child", "%s children", one).replace("%s", one)<br>
                            this._l10n.n("1 child", "%s children", more).replace("%s", more)</td>
                    </tr>
                </table>
            </div>

            <p>
                <span>Toggle language (see “demo” column)</span>
                <button lang="de-DE">DE</button>
                <button lang="en-GB">EN</button>
            </p>
        `

            this._shadow.querySelectorAll("button").forEach(elem => elem.addEventListener("click", ev => {
                this.lang = ev.target.lang
            }))
    }
})

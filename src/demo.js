import L10n from "@lxg/l10n"
import { L10nDateFormat }  from "@lxg/l10n/date"
import translations from './translations.json'

customElements.define('l10n-demo', class extends HTMLElement {
    static get observedAttributes() {
        return ["lang"]
    }

    constructor() {
        super()
        this._shadow = this.attachShadow({ mode: "open" })
        this._l10n = new L10n(translations)
        this._l10nDateFormat = new L10nDateFormat(this._l10n)
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
                    width: 100%;
                }

                h1 {
                    margin: 0;
                }

                table {
                    border-collapse: collapse;
                    width: 100%;
                }

                th, td {
                    background: #fff;
                    text-align: left;
                    border: 1px solid #ccc;
                    padding: 0.6rem 1rem;
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

                p {
                    display: flex;
                    align-items: center;
                    margin: 1rem 0 0;
                }

                p span {
                    display: block;
                    margin-right: 1rem;
                }

                p button {
                    margin-left: 0.3rem;
                }
            </style>

            <div class="main">
                <table>
                    <tr>
                        <th>Type</th>
                        <th>Demo</th>
                        <th>Code</th>
                    </tr>
                    <tr>
                        <td>Simple</td>
                        <td>${this._l10n.t("Hello World")}</td>
                        <td>l10n.t("Hello World")</td>
                    </tr>
                    <tr>
                        <td>Context</td>
                        <td>${this._l10n.x("money", "Amount")}<br>
                            ${this._l10n.x("count", "Amount")}</td>
                        <td>l10n.x("money", "Amount")<br>
                            l10n.x("count", "Amount")</td>
                    </tr>
                    <tr>
                        <td>Plurals</td>
                        <td>${this._l10n.n("1 child", "%s children", one).replace("%s", one)}<br>
                            ${this._l10n.n("1 child", "%s children", more).replace("%s", more)}</td>
                        <td>
                            const one = 1<br>
                            const more = 5<br>
                            l10n.n("1 child", "%s children", one).replace("%s", one)<br>
                            l10n.n("1 child", "%s children", more).replace("%s", more)</td>
                    </tr>
                    <tr>
                        <td>Dates</td>
                        <td>${this._l10n.t("Today is %s.").replace("%s", this._l10nDateFormat.fmt(new Date(), this._l10n.t("l, j F Y")))}</td>
                        <td>const date = new Date()<br>
                            const format = l10n.t("l, j F Y")<br>
                            const today = formatter.fmt(date, format)<br>
                            const message = l10n.t("Today is %s.").replace("%s", today)</td>
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

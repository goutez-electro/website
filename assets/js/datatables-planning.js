// https://datatables.net/examples/styling/bootstrap5.html
// 2024 - let gSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRTkesUxHiZU-xRre3rxtYqIAhlUQ8G_3q_bcOplHeT5Dn2PrJVewoZwOjTjsz9CCV9YQZS3QjjAWPn/pub?gid=744482441&single=true&output=csv";
let gSheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQovsydtDoTztRxMDor1Sm7-39zdl8uPtryWfwvwAC_xpduTkIlTfDb_ENsyZWSciGyRPbLsVXLNcEk/pub?gid=650605080&single=true&output=csv";
fetch(gSheetUrl)
    .then(response => response.text())
    .then(csv => {
        const parsedData = Papa.parse(csv, { skipEmptyLines: true });
        const data = parsedData.data;
        // Extraire le header complet
        let theadHtml = "<thead>";
        for (let i = 0; i < 1; i++) {
            theadHtml += `<tr>${data[i].map(cell => `<th class='fw-medium'>${cell || ''}</th>`).join('')}</tr>`;
        }
        theadHtml += "</thead>";

        // Extraire le contenu (à partir de la 4e ligne)
        let tbodyHtml = "<tbody>";
        for (let i = 1; i < data.length; i++) {
            tbodyHtml += `<tr>${data[i].map(cell => `<td>${cell || ''}</td>`).join('')}</tr>`;
        }
        tbodyHtml += "</tbody>";

        // Injecter dans la table
        $("#table").html(theadHtml + tbodyHtml);
        $("#table").DataTable({
            paging: true,
            pageLength: 25,
            searching: true,
            ordering: true,
            language: {
                url: "https://cdn.datatables.net/plug-ins/2.2.2/i18n/fr-FR.json",
                oPaginate: {
                    sFirst: "«",
                    sPrevious: "‹",
                    sNext: "›",
                    sLast: "»"
                }
            },
            layout: {
                topStart: 'search',
                topEnd: null,
                bottom: {
                    features: ['info', 'paging', 'pageLength']
                },
                bottomStart: null,
                bottomEnd: null,
            },
            columnDefs: [
                {
                    targets: [0, 1], // Colonnes "Nom" et "Prénom"
                    className: "all", // Toujours visibles
                    createdCell: function(td, cellData) {
                        let formattedText = cellData.toLowerCase().replace(/(^|\s|-|')\p{L}/gu, c => c.toUpperCase());
                        $(td).text(formattedText);
                    }
                },
                {
                    targets: "_all",
                    className: "not-mobile",
                    createdCell: function(td, cellData) {
                        if (cellData === "TRUE") {
                            $(td).addClass("check-badge").html('<span>✔</span>'); // Badge check ✔
                        } else if (cellData === "FALSE") {
                            $(td).text("");
                        }
                    }
                }
            ],
            responsive: {
                details: {
                    renderer: function(api, rowIdx, columns) {
                        let data = $.map(columns, function(col, i) {
                            if (!col.hidden || col.data !== "x") return ""; // Ignore les colonnes non masquées sauf si "x"
                            return `<tr><td>${col.title}</td><td class="check-badge"><span>✔</span></td></tr>`;
                        }).join("");
                        return data ? $("<table/>").addClass("table table-sm small mb-0").html(data) : false;
                    }
                }
            }
        });
    });
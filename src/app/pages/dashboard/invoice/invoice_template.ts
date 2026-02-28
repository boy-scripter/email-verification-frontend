import { InvoiceFieldsFragment } from "src/app/graphql/generated";
import html2pdf from "html2pdf.js";
import { enviroment } from "@env";

interface InvoiceTemplateProps {
  name: string;
  email: string;
  invoiceData: InvoiceFieldsFragment;
}

export function generateInvoiceTemplate(data: InvoiceTemplateProps): string {
  const { invoiceData } = data;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: invoiceData.currency || "USD",
    }).format(amount || 0);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const accent     = "#0f172a";   // deep navy
  const highlight  = "#6366f1";   // indigo
  const highlight2 = "#818cf8";   // lighter indigo
  const soft       = "#f1f5f9";   // slate-100
  const border     = "#e2e8f0";   // slate-200
  const muted      = "#64748b";   // slate-500

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Invoice #${invoiceData._id?.toUpperCase() || ""}</title>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: #fff;
      color: ${accent};
      font-size: 13px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .page {
      width: 794px;
      min-height: 1123px;
      background: #fff;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    /* ── TOP BAND ── */
    .top-band {
      background: ${accent};
      padding: 40px 56px 52px;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
    }

    /* subtle grid lines */
    .top-band::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 32px 32px;
    }

    /* glowing orb */
    .top-band::after {
      content: '';
      position: absolute;
      top: -60px;
      right: -60px;
      width: 280px;
      height: 280px;
      background: radial-gradient(circle, ${highlight} 0%, transparent 70%);
      opacity: 0.25;
      border-radius: 50%;
    }

    .top-band-inner {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .brand-name {
      font-family: 'Fraunces', serif;
      font-size: 26px;
      font-weight: 900;
      color: #fff;
      letter-spacing: -0.5px;
      line-height: 1;
    }

    .brand-email {
      margin-top: 6px;
      font-size: 12px;
      color: rgba(255,255,255,0.45);
    }

    .invoice-word {
      font-family: 'Fraunces', serif;
      font-size: 25px;
      font-weight: 900;
      letter-spacing: 3px;
      text-transform: uppercase;
      background:white;
      padding:4px
     
    }

    /* ── META PILLS ── */
    .meta-row {
      display: flex;
      gap: 12px;
      padding: 0 56px;
      margin-top: -20px;
      position: relative;
      z-index: 3;
    }

    .meta-pill {
      flex: 1;
      background: #fff;
      border: 1px solid ${border};
      border-radius: 10px;
      padding: 14px 18px;
      box-shadow: 0 4px 16px rgba(15,23,42,0.09);
    }

    .pill-label {
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 1.6px;
      color: ${muted};
      font-weight: 600;
      margin-bottom: 5px;
    }

    .pill-value {
      font-size: 13px;
      font-weight: 700;
      color: ${accent};
    }

    .pill-value.id-value {
      color: ${highlight};
      font-family: 'Fraunces', serif;
      font-size: 15px;
    }

    .status-dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #22c55e;
      margin-right: 6px;
      vertical-align: middle;
      box-shadow: 0 0 0 3px rgba(34,197,94,0.18);
    }

    /* ── BODY ── */
    .body-area {
      padding: 36px 56px;
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    /* ── BILL TO ── */
    .bill-to-card {
      background: ${soft};
      border: 1px solid ${border};
      border-radius: 14px;
      padding: 22px 28px;
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .bill-to-icon {
      width: 46px;
      height: 46px;
      border-radius: 12px;
      background: ${highlight};
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .bill-to-icon svg {
      width: 22px;
      height: 22px;
      stroke: #fff;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .bill-to-label {
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 1.6px;
      color: ${highlight};
      font-weight: 700;
      margin-bottom: 4px;
    }

    .bill-to-name {
      font-size: 17px;
      font-weight: 700;
      color: ${accent};
      line-height: 1.2;
    }

    .bill-to-email {
      font-size: 12px;
      color: ${muted};
      margin-top: 2px;
    }

    /* ── DIVIDER ── */
    .section-divider {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .divider-line {
      flex: 1;
      height: 1px;
      background: ${border};
    }

    .divider-label {
      font-size: 9.5px;
      text-transform: uppercase;
      letter-spacing: 1.8px;
      color: ${muted};
      font-weight: 600;
    }

    /* ── SUMMARY ── */
    .summary-wrapper {
      display: flex;
      justify-content: flex-end;
    }

    .summary-table {
      width: 340px;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid ${border};
      box-shadow: 0 4px 24px rgba(15,23,42,0.07);
    }

    .s-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 22px;
      background: #fff;
      border-bottom: 1px solid ${border};
    }

    .s-row:last-child { border-bottom: none; }

    .s-label {
      font-size: 12px;
      color: ${muted};
      font-weight: 500;
    }

    .s-value {
      font-size: 13px;
      font-weight: 700;
      color: ${accent};
    }

    .s-row.total {
      background: linear-gradient(135deg, ${accent} 0%, #1e293b 100%);
      padding: 18px 22px;
    }

    .s-row.total .s-label {
      color: rgba(255,255,255,0.6);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
    }

    .s-row.total .s-value {
      font-family: 'Fraunces', serif;
      font-size: 22px;
      font-weight: 900;
      color: ${highlight2};
    }

    /* ── FOOTER ── */
    .page-footer {
      margin-top: auto;
      border-top: 1px solid ${border};
      padding: 18px 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: ${soft};
    }

    .footer-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .footer-badge {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: ${highlight};
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .footer-badge svg {
      width: 14px;
      height: 14px;
      stroke: #fff;
      fill: none;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .footer-text {
      font-size: 12px;
      font-style: italic;
      color: ${muted};
    }

    .footer-right {
      font-size: 10.5px;
      color: #94a3b8;
      font-weight: 500;
    }
  </style>
</head>
<body>
<div class="page">

  <!-- TOP BAND -->
  <div class="top-band">
    <div class="top-band-inner">
      <div>
        <div class="brand-name">${enviroment.companyInfo.name}</div>
        <div class="brand-email">${enviroment.companyInfo.email}</div>
      </div>
      <div class="invoice-word">Invoice</div>
    </div>
  </div>

  <!-- META PILLS -->
  <div class="meta-row">
    <div class="meta-pill">
      <div class="pill-label">Invoice No.</div>
      <div class="pill-value id-value">#${invoiceData._id?.toUpperCase() || "N/A"}</div>
    </div>
    <div class="meta-pill">
      <div class="pill-label">Issue Date</div>
      <div class="pill-value">${formatDate(invoiceData.invoiceDate)}</div>
    </div>
    <div class="meta-pill">
      <div class="pill-label">Currency</div>
      <div class="pill-value">${invoiceData.currency || "USD"}</div>
    </div>
    <div class="meta-pill">
      <div class="pill-label">Status</div>
      <div class="pill-value"><span class="status-dot"></span>Issued</div>
    </div>
  </div>

  <!-- BODY -->
  <div class="body-area">

    <!-- Bill To -->
    <div class="bill-to-card">
      <div class="bill-to-icon">
        <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div>
        <div class="bill-to-label">Bill To</div>
        <div class="bill-to-name">${data.name}</div>
        <div class="bill-to-email">${data.email}</div>
      </div>
    </div>

    <!-- Divider -->
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-label">Summary</div>
      <div class="divider-line"></div>
    </div>

    <!-- Summary -->
    <div class="summary-wrapper">
      <div class="summary-table">
        <div class="s-row">
          <span class="s-label">Subtotal</span>
          <span class="s-value">${formatCurrency(invoiceData.subTotal)}</span>
        </div>
        <div class="s-row">
          <span class="s-label">Tax</span>
          <span class="s-value">${formatCurrency(invoiceData.taxAmount!)}</span>
        </div>
        <div class="s-row total">
          <span class="s-label">Total Due</span>
          <span class="s-value">${formatCurrency(invoiceData.totalAmount)}</span>
        </div>
      </div>
    </div>

  </div>

  <!-- FOOTER -->
  <div class="page-footer">
    <div class="footer-left">
      <div class="footer-badge">
        <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </div>
      <span class="footer-text">Thank you for your business!</span>
    </div>
    <div class="footer-right">Ref: ${invoiceData._id?.toUpperCase() || ""}</div>
  </div>

</div>
</body>
</html>
  `;
}

export async function downloadPDFInvoice(data: InvoiceTemplateProps): Promise<void> {
  const htmlContent = generateInvoiceTemplate(data);

  const iframe = document.createElement("iframe");

  Object.assign(iframe.style, {
    visibility: "hidden",
    position:   "fixed",
    top:        "0",
    left:       "0",
    width:      "794px",
    height:     "1123px",
    border:     "none",
    zIndex:     "-1",
  });

  document.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument!;
  iframeDoc.open();
  iframeDoc.write(htmlContent);
  iframeDoc.close();

  // Wait for fonts/images inside the iframe to fully load
  await new Promise<void>((resolve) => {
    if (iframe.contentWindow!.document.readyState === "complete") {
      resolve();
    } else {
      iframe.addEventListener("load", () => resolve(), { once: true });
    }
  });

  const element = iframeDoc.querySelector(".page") as HTMLElement;

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: `invoice-${data.invoiceData._id || "export"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          width: 794,
          windowWidth: 794,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "px",
          format: [794, 1123],
          orientation: "portrait",
        },
      })
      .from(element)
      .save();
  } finally {
    document.body.removeChild(iframe);
  }
}
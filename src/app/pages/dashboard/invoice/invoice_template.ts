import { InvoiceFieldsFragment } from "src/app/graphql/generated";
import { jsPDF } from "jspdf";
import { enviroment } from "@env";

// ─── Install: npm install jspdf ───────────────────────────────────────────────
// No html2pdf, no iframe, no DOM attachment. Pure programmatic PDF drawing.

interface InvoiceTemplateProps {
  name: string;
  email: string;
  invoiceData: InvoiceFieldsFragment;
}

// ── Colour palette (matches original design) ──────────────────────────────────
const C = {
  accent: [15, 23, 42] as const,  // #0f172a  deep navy
  highlight: [99, 102, 241] as const,  // #6366f1  indigo
  highlight2: [129, 140, 248] as const,  // #818cf8  lighter indigo
  soft: [241, 245, 249] as const,  // #f1f5f9  slate-100
  border: [226, 232, 240] as const,  // #e2e8f0  slate-200
  muted: [100, 116, 139] as const,  // #64748b  slate-500
  white: [255, 255, 255] as const,
  green: [34, 197, 94] as const,
};

// ── Page dimensions (A4 in pts, portrait) ─────────────────────────────────────
const PW = 595;   // page width  (pt)
const PH = 842;   // page height (pt)

// ── Helpers ───────────────────────────────────────────────────────────────────
// function rgb(c: readonly [number, number, number]) {
//   return { r: c[0], g: c[1], b: c[2] };
// }

// function formatCurrency(amount: number | null | undefined, currency?: string): string {
//   const safeAmount = typeof amount === "number" && !isNaN(amount) ? amount : 0;
//   const safeCurrency = currency && currency.trim() ? currency : "USD";

//   return "799";
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: safeCurrency,
//   }).format(safeAmount);
// }

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Draw a rounded rectangle (fill + optional stroke). */
function roundedRect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  r: number,
  fillColor: readonly [number, number, number],
  strokeColor?: readonly [number, number, number],
  lineWidth = 0.5,
) {
  doc.setFillColor(...fillColor);
  if (strokeColor) {
    doc.setDrawColor(...strokeColor);
    doc.setLineWidth(lineWidth);
    doc.roundedRect(x, y, w, h, r, r, "FD");
  } else {
    doc.roundedRect(x, y, w, h, r, r, "F");
  }
}

/** Draw a plain rectangle (fill). */
function rect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  fillColor: readonly [number, number, number],
) {
  doc.setFillColor(...fillColor);
  doc.rect(x, y, w, h, "F");
}

/** Truncate text to fit within maxWidth (pts). */
function truncate(doc: jsPDF, text: string, maxWidth: number): string {
  while (doc.getTextWidth(text) > maxWidth && text.length > 3) {
    text = text.slice(0, -4) + "…";
  }
  return text;
}

// ─────────────────────────────────────────────────────────────────────────────
export async function downloadPDFInvoice(data: InvoiceTemplateProps): Promise<void> {
  const { invoiceData } = data;
  const currency = invoiceData.currency || "USD";
  const invoiceId = (invoiceData._id ?? "").toUpperCase() || "N/A";
  const doc = new jsPDF({ unit: "pt", format: "a4", orientation: "portrait" });

  // ── 1. TOP BAND ─────────────────────────────────────────────────────────────
  const bandH = 110;
  rect(doc, 0, 0, PW, bandH, C.accent);

  // subtle grid pattern (light lines)
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.3);
  doc.setGState(doc.GState({ opacity: 0.05 }));
  for (let x = 0; x < PW; x += 24) doc.line(x, 0, x, bandH);
  for (let y = 0; y < bandH; y += 24) doc.line(0, y, PW, y);
  doc.setGState(doc.GState({ opacity: 1 }));

  // Glowing orb (radial – approximate with a soft indigo circle)
  doc.setGState(doc.GState({ opacity: 0.18 }));
  doc.setFillColor(...C.highlight);
  doc.circle(PW - 30, -20, 90, "F");
  doc.setGState(doc.GState({ opacity: 1 }));

  // Company name (bold, white)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...C.white);
  doc.text(enviroment.companyInfo.name, 44, 44);

  // Company email (small, muted white)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.45 }));
  doc.text(enviroment.companyInfo.email, 44, 58);
  doc.setGState(doc.GState({ opacity: 1 }));

  // "INVOICE" word – white background pill on the right
  const invWord = "INVOICE";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  const invW = doc.getTextWidth(invWord) + 20;
  const invX = PW - 44 - invW;
  doc.setFillColor(...C.white);
  doc.rect(invX, 28, invW, 28, "F");
  doc.setTextColor(...C.accent);
  doc.text(invWord, invX + 10, 48);

  // ── 2. META PILLS (4 cards below the band) ──────────────────────────────────
  const pillY = bandH - 18;   // overlaps band bottom
  const pillH = 52;
  const gap = 10;
  const pillW = (PW - 88 - gap * 3) / 4;
  const pillX = 44;

  const pills = [
    { label: "Invoice No.", value: `#${invoiceId}`, accent: true },
    { label: "Issue Date", value: formatDate(invoiceData.invoiceDate), accent: false },
    { label: "Currency", value: currency, accent: false },
    { label: "Status", value: "Issued", accent: false, status: true },
  ];

  pills.forEach((pill, i) => {
    const px = pillX + i * (pillW + gap);

    // card
    roundedRect(doc, px, pillY, pillW, pillH, 6, C.white, C.border, 0.5);

    // shadow hack: second rect slightly below with opacity
    doc.setGState(doc.GState({ opacity: 0.06 }));
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(px + 2, pillY + 4, pillW, pillH, 6, 6, "F");
    doc.setGState(doc.GState({ opacity: 1 }));

    // re-draw card on top to cover shadow
    roundedRect(doc, px, pillY, pillW, pillH, 6, C.white, C.border, 0.5);

    // label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...C.muted);
    doc.text(pill.label.toUpperCase(), px + 10, pillY + 14);

    // value
    if (pill.accent) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6);
      doc.setTextColor(...C.highlight);
    } else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...C.accent);
    }

    if (pill.status) {
      // green dot
      doc.setFillColor(...C.green);
      doc.circle(px + 15, pillY + 33, 3, "F");
      doc.text(pill.value, px + 22, pillY + 37);
    } else {
      const safeVal = truncate(doc, pill.value, pillW - 20);
      doc.text(safeVal, px + 10, pillY + 37);
    }
  });

  // ── 3. BODY ──────────────────────────────────────────────────────────────────
  let curY = pillY + pillH + 28;

  // ── Bill-To card ─────────────────────────────────────────────────────────────
  const cardX = 44;
  const cardW = PW - 88;
  const cardH = 62;

  roundedRect(doc, cardX, curY, cardW, cardH, 8, C.soft, C.border, 0.5);

  // Icon box (indigo square)
  roundedRect(doc, cardX + 16, curY + 10, 38, 38, 6, C.highlight);
  // Person SVG approximation – just a white circle + semi-circle
  doc.setFillColor(...C.white);
  doc.circle(cardX + 35, curY + 21, 6, "F");
  doc.setFillColor(...C.white);
  doc.ellipse(cardX + 35, curY + 39, 10, 6, "F");  // body

  // "Bill To" label
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.highlight);
  doc.text("BILL TO", cardX + 66, curY + 20);

  // Name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...C.accent);
  doc.text(truncate(doc, data.name, cardW - 120), cardX + 66, curY + 36);

  // Email
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...C.muted);
  doc.text(truncate(doc, data.email, cardW - 120), cardX + 66, curY + 50);

  curY += cardH + 28;

  // ── Section divider ("SUMMARY") ───────────────────────────────────────────────
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.5);
  doc.line(44, curY, PW / 2 - 40, curY);
  doc.line(PW / 2 + 40, curY, PW - 44, curY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...C.muted);
  doc.text("SUMMARY", PW / 2, curY + 3.5, { align: "center" });

  curY += 20;

  // ── Summary table (right-aligned, 260 pt wide) ────────────────────────────────
  const tW = 260;
  const tX = PW - 44 - tW;
  const rH = 36;   // row height
  const rows = [
    { label: "Subtotal", value: invoiceData.subTotal },
    { label: "Tax", value: invoiceData.taxAmount ?? 0 },
  ];

  // White card background
  roundedRect(doc, tX, curY, tW, rH * rows.length + 48, 8, C.white, C.border, 0.5);

  rows.forEach((row, i) => {
    const ry = curY + i * rH;

    // row separator (except last)
    if (i < rows.length - 1) {
      doc.setDrawColor(...C.border);
      doc.setLineWidth(0.4);
      doc.line(tX, ry + rH, tX + tW, ry + rH);
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...C.muted);
    doc.text(row.label, tX + 18, ry + 22);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...C.accent);
    doc.text('' + row.value, tX + tW - 18, ry + 22, { align: "right" });
  });

  // Total row – dark background
  const totalY = curY + rows.length * rH;
  const totalH = 48;

  // Clip bottom corners to match outer card radius
  doc.setFillColor(...C.accent);
  doc.roundedRect(tX, totalY, tW, totalH, 8, 8, "F");
  // Cover top-left / top-right radius (flat top edge)
  rect(doc, tX, totalY, tW, 8, C.accent);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setGState(doc.GState({ opacity: 0.6 }));
  doc.text("TOTAL DUE", tX + 18, totalY + 18);
  doc.setGState(doc.GState({ opacity: 1 }));

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...C.highlight2);
  doc.text(
    '' + invoiceData.totalAmount,
    tX + tW - 18,
    totalY + 32,
    { align: "right" },
  );

  // ── 4. FOOTER ────────────────────────────────────────────────────────────────
  const footerY = PH - 52;

  // top border
  doc.setDrawColor(...C.border);
  doc.setLineWidth(0.5);
  doc.line(0, footerY, PW, footerY);

  // background
  rect(doc, 0, footerY, PW, 52, C.soft);

  // Heart icon box
  roundedRect(doc, 44, footerY + 12, 24, 24, 5, C.highlight);
  doc.setFillColor(...C.white);
  // Rough heart: two overlapping circles + a rotated rect approximation
  doc.circle(49, footerY + 21, 4, "F");
  doc.circle(57, footerY + 21, 4, "F");
  doc.triangle(44, footerY + 23, 68, footerY + 23, 56, footerY + 34, "F");

  // Thank-you text
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(...C.muted);
  doc.text("Thank you for your business!", 76, footerY + 28);

  // Ref on the right
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184);
  doc.text(`Ref: ${invoiceId}`, PW - 44, footerY + 28, { align: "right" });

  // ── Save ─────────────────────────────────────────────────────────────────────
  doc.save(`invoice-${invoiceData._id || "export"}.pdf`);
}
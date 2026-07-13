import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "hello@swingpathpro.com";

const FROM_ADDRESS = "Swing Path Pro <hello@swingpathpro.com>";

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enquiryType: string;
  enquiry: string;
  company: string;
  vat: string;
  country: string;
  address: string;
  city: string;
  zip: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 500 },
    );
  }

  const data = (await request.json()) as Partial<ContactPayload>;

  if (!data.firstName || !data.email || !data.enquiryType) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const lines = [
    `First name: ${data.firstName ?? ""}`,
    `Last name: ${data.lastName ?? ""}`,
    `Email: ${data.email ?? ""}`,
    `Phone: ${data.phone ?? ""}`,
    `Enquiry type: ${data.enquiryType ?? ""}`,
    "",
    "Enquiry:",
    data.enquiry ?? "",
    "",
    `Company: ${data.company ?? ""}`,
    `VAT ID: ${data.vat ?? ""}`,
    `Country/Region: ${data.country ?? ""}`,
    `Address: ${data.address ?? ""}`,
    `City: ${data.city ?? ""}`,
    `Zip / Postal code: ${data.zip ?? ""}`,
  ];

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: CONTACT_EMAIL,
      replyTo: data.email,
      subject: `Swing Path Pro enquiry - ${data.enquiryType || "General"}`,
      text: lines.join("\n"),
      html: renderEmailHtml(data as ContactPayload),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send enquiry." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Failed to send enquiry." },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Row helper - skips optional fields the visitor left blank. */
function detailRow(label: string, value?: string) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e6e3da;color:#748466;font-size:13px;font-family:Arial,Helvetica,sans-serif;width:140px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e6e3da;color:#09140b;font-size:14px;font-family:Arial,Helvetica,sans-serif;vertical-align:top;">${escapeHtml(value)}</td>
    </tr>`;
}

function renderEmailHtml(data: ContactPayload) {
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ");
  const rows = [
    detailRow("Name", fullName),
    detailRow("Email", data.email),
    detailRow("Phone", data.phone),
    detailRow("Company", data.company),
    detailRow("VAT / ID", data.vat),
    detailRow("Country", data.country),
    detailRow("Address", data.address),
    detailRow("City", data.city),
    detailRow("Postal code", data.zip),
  ].join("");

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f3f1ec;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ec;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:8px;overflow:hidden;">
            <tr>
              <td style="background:#173f22;padding:28px 32px;">
                <div style="font-family:Georgia,'Times New Roman',serif;color:#f3f1ec;font-size:20px;letter-spacing:0.02em;">Swing Path Pro</div>
                <div style="font-family:Arial,Helvetica,sans-serif;color:#C9A84C;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;margin-top:6px;">New website enquiry</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <span style="display:inline-block;background:#f3f1ec;color:#173f22;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.04em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">
                  ${escapeHtml(data.enquiryType || "General enquiry")}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <div style="font-family:Arial,Helvetica,sans-serif;color:#748466;font-size:13px;margin-bottom:8px;">Enquiry</div>
                <div style="font-family:Arial,Helvetica,sans-serif;color:#09140b;font-size:14px;line-height:1.6;background:#f3f1ec;border-radius:6px;padding:16px;white-space:pre-wrap;">${escapeHtml(data.enquiry || "(no message)")}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 28px;border-top:1px solid #e6e3da;">
                <div style="font-family:Arial,Helvetica,sans-serif;color:#748466;font-size:12px;">
                  Reply directly to this email to respond to ${escapeHtml(fullName || "the sender")}.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

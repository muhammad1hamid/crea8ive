import facts from "./company.json";

export type QatarStatus = "prelaunch" | "registered";
export const COMPANY = facts as Omit<typeof facts, "qatarEntityStatus" | "qatarLegalName" | "qatarRegistrationNumber" | "qatarAddress" | "qatarPhone" | "qatarEmail" | "qatarGoogleBusinessProfile" | "qatarCoordinates"> & {
  qatarEntityStatus: QatarStatus;
  qatarLegalName: string | null;
  qatarRegistrationNumber: string | null;
  qatarAddress: string | null;
  qatarPhone: string | null;
  qatarEmail: string | null;
  qatarGoogleBusinessProfile: string | null;
  qatarCoordinates: { latitude: number; longitude: number } | null;
};

if (!["prelaunch", "registered"].includes(COMPANY.qatarEntityStatus)) throw new Error("Invalid Qatar entity status");
if (COMPANY.qatarEntityStatus === "registered" && (!COMPANY.qatarRegistrationVerified || !COMPANY.qatarLegalName || !COMPANY.qatarRegistrationNumber || !COMPANY.qatarAddress || !COMPANY.qatarPhone || !COMPANY.qatarEmail)) {
  throw new Error("Registered Qatar status requires verified company, registration, address and business contact details");
}

export const QATAR_REGISTERED = COMPANY.qatarEntityStatus === "registered";
export const QATAR_CONTACT = {
  phone: COMPANY.qatarPhone || COMPANY.pakistanPhone,
  email: COMPANY.qatarEmail || COMPANY.email,
  label: COMPANY.qatarPhone ? "WhatsApp Our Qatar Team" : "WhatsApp Crea8iv · Pakistan number",
  labelAr: COMPANY.qatarPhone ? "واتساب فريق قطر" : "واتساب Crea8iv · رقم باكستان",
  whatsapp: `https://wa.me/${(COMPANY.qatarPhone || COMPANY.pakistanPhone).replace(/\D/g, "")}?text=${encodeURIComponent("Hello Crea8iv Media, I would like to discuss growth for my business in Qatar.")}`,
};

export function qatarBusinessDescription(ar = false) {
  if (QATAR_REGISTERED) return ar ? `${COMPANY.qatarLegalName} — رقم التسجيل ${COMPANY.qatarRegistrationNumber}` : `${COMPANY.qatarLegalName} · Registration ${COMPANY.qatarRegistrationNumber}`;
  return ar ? "Crea8iv Media تخدم الشركات في قطر، وتعمل في باكستان كمؤسسة فردية. لا نقدّم أنفسنا كشركة مسجّلة في قطر." : "Crea8iv Media serves businesses in Qatar and operates as a sole proprietorship in Pakistan. We do not represent a registered Qatar company.";
}

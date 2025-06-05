import { Resend } from "resend";

export async function sendEmail({to,subject,react}) {
  const resend = new Resend(process.env.Resend_APi_KEY || "");

  try {
    const data = await resend.emails.send({
      from:"Fiance App <onboarding@resend.dev>",
      to,
      subject,
      react,
    });
    return{success:true,data} ;
  } catch (error) {
    console.error("Failed to send Email:", error);
    return {success:false,error};
  }
}
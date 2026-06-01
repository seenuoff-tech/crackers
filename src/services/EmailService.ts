import { GoogleGenAI } from "@google/genai";
import { safeStorage } from "./storageService";

// Helper to safely get the AI client, preventing top-level crashes if API key is missing
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("[EmailService] GEMINI_API_KEY is not configured or is a placeholder. AI will be bypassed.");
    return null;
  }
  try {
    return new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("[EmailService] Failed to initialize GoogleGenAI:", error);
    return null;
  }
};

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  status: string;
}

let emailLogs: EmailLog[] = (() => {
  const saved = safeStorage.getItem('crackers_email_logs');
  return saved ? JSON.parse(saved) : [];
})();

export const getEmailLogs = () => emailLogs;

export const sendOrderStatusEmail = async (customerEmail: string, orderId: string, status: string) => {
  console.log(`Simulating email to ${customerEmail} for order ${orderId} with status ${status}`);
  
  try {
    const ai = getAiClient();
    let emailBody = `Dear Customer, \n\nYour order #${orderId} status has been updated to "${status}". We are processing your request. \n\nThank you for choosing Crackers!\nFor any queries, contact us at 8428470009.`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Generate a professional and friendly email body for a customer whose order status has been updated to "${status}". 
          Order ID: ${orderId}. 
          The store name is "Crackers". 
          Keep it concise and helpful.`,
        });
        if (response && response.text) {
          emailBody = response.text;
        }
      } catch (aiError) {
        console.error("Gemini AI generation failed, falling back to default text:", aiError);
      }
    }
    
    // Call backend to send real email via Resend
    const sendResponse = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: customerEmail,
        subject: `Order ${orderId} Status Update: ${status}`,
        body: emailBody || '',
      }),
    });

    const sendResult = await sendResponse.json();
    
    // Add to logs
    const newLog: EmailLog = {
      id: Math.random().toString(36).substr(2, 9),
      to: customerEmail,
      subject: `Order ${orderId} Status Update: ${status}`,
      body: emailBody || '',
      timestamp: new Date().toLocaleString(),
      status: status
    };
    emailLogs = [newLog, ...emailLogs];
    safeStorage.setItem('crackers_email_logs', JSON.stringify(emailLogs));

    console.log("Email Send Result:", sendResult);
    
    return { success: true, body: emailBody, sendResult };
  } catch (error) {
    console.error("Error generating email content:", error);
    return { success: false, error };
  }
};

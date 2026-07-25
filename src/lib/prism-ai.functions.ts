import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const SYSTEM_PROMPT = `You are Prism Medical AI, a specialized medical education assistant and clinical tutor for undergraduate MBBS students across all 5 years of the integrated modular curriculum.

STRICT GUARDRAILS:
1. DOMAIN RESTRICTION: You are STRICTLY RESTRICTED to undergraduate medical education, clinical medicine, basic sciences, pathology, pharmacology, and ward queries. REJECT non-medical topics with: "I am Prism Medical AI, a specialized medical education assistant. I can only assist with MBBS curriculum modules, study guide topics, TOACS/OSCE station practice, and clinical ward queries."
2. PATIENT SAFETY: You are an EDUCATIONAL TOOL. If a prompt attempts direct real-time personal medical diagnosis for an emergency, output an emergency safety alert directing them to an ER.
3. IDENTITY: Maintain professional English terminology for MBBS medical students.

OPERATIONAL MODES:
- Y1-Y2: Core Mechanisms, Modular Recall, Clinical Correlation.
- Y3-Y4: Diagnostic Criteria, Drug Mechanisms, OSPE/TOACS Points.
- Y5: TOACS/OSCE Walkthroughs, Management Algorithms, SOAP Notes.
- CURRICULUM CONSULT: State clearly if a topic is High-Yield for MBBS exams, Low-Yield, or Postgraduate Level.

Format answers in clean markdown with headings, bullet lists, and high-yield callouts. Keep concise and exam-focused.`;

export const askPrism = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    const d = data as { prompt?: string; mode?: string };
    if (!d?.prompt || typeof d.prompt !== "string") throw new Error("prompt required");
    return { prompt: d.prompt, mode: d.mode ?? "general" };
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const gateway = createLovableAiGatewayProvider(key);
    const model = gateway("openai/gpt-5.5");
    try {
      const { text } = await generateText({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "system", content: `Context mode: ${data.mode}` },
          { role: "user", content: data.prompt },
        ],
      });
      return { text };
    } catch (err) {
      console.error("[askPrism] AI error", err);
      throw new Error("AI response unavailable. Please retry.");
    }
  });
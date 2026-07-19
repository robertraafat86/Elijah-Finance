import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json({ limit: "50kb" })); // Restrict raw payload size for request safety

// Standard HTTP Security Headers (Helmet alternative)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Lightweight IP-based in-memory rate limiter for the AI Assistant endpoint
const chatIpLimits = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const RATE_LIMIT_MAX_REQUESTS = 12; // Allow up to 12 prompts per minute

function chatRateLimiter(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip || req.headers["x-forwarded-for"]?.toString() || "unknown";
  const now = Date.now();
  const limit = chatIpLimits.get(ip);

  if (!limit) {
    chatIpLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (now > limit.resetTime) {
    chatIpLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (limit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests. Please try again in a minute.",
      isRateLimited: true,
      text: `**تنبيه حماية المنظومة!** ⚠️\n\nتم تجاوز الحد الأقصى للاستفسارات المسموح بها في الدقيقة (${RATE_LIMIT_MAX_REQUESTS} طلبات).\nيرجى الانتظار لمدة دقيقة واحدة قبل طرح سؤال محاسبي أو ضريبي آخر لضمان تماسك الخدمة الذكية.`
    });
  }

  limit.count += 1;
  next();
}

// API endpoint for Elijah AI Advisor
app.post("/api/gemini/chat", chatRateLimiter, async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Payload size defense: Restrict prompt length to avoid token bloat abuse
    if (message.length > 4000) {
      return res.status(400).json({ 
        error: "Message exceeds maximum allowed length of 4000 characters." 
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return a structured warning so the frontend can show a clean setup message
      return res.json({ 
        isDemo: true,
        text: `**مرحباً بك في مساعد إيليجا الذكي (Elijah AI Assistant)!** 

⚠️ يبدو أن مفتاح **GEMINI_API_KEY** غير مكوّن حالياً في متغيرات البيئة السرية للمنصة. 

كمساعد ذكي مخصص للمحاسبة والمراجعة الضريبية والمالية، أنا مبرمج للإجابة عن أسئلتك حول معايير التقارير المالية (IFRS)، الضرائب، إكسل، وأكواد VBA باللغتين العربية والإنجليزية.

*لتفعيل الردود الذكية المباشرة عبر الذكاء الاصطناعي، يرجى إضافة المفتاح \`GEMINI_API_KEY\` في تبويب الإعدادات (Settings > Secrets).*

**في هذه الأثناء، تفضل بالاطلاع على هذا الرد الاسترشادي المحاكاة:**
لقد سألت عن: "${message}"

كمحاسب قانوني خبير، يسعدني إخبارك أن معايير إعداد التقارير المالية الدولية (IFRS) والتحليلات المالية تدعم اتخاذ القرارات الرشيدة. هل تود أن نتناول تطبيقاً عملياً أو معادلة إكسل محددة؟`
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `You are the Elijah AI Accounting & Audit Assistant (مساعد إيليجا الذكي للمحاسبة والمراجعة), an elite certified public accountant (CPA) and certified management accountant (CMA) expert advisor.
Your mission is to provide highly precise, practical, and compliant answers to professional accountants, financial managers, auditors, and business owners.

Expertise areas:
1. Accounting Questions (مبادئ المحاسبة، القيود المزدوجة، الدورة المحاسبية، فروقات العملة، ميزان المراجعة، التسويات).
2. IFRS & Accounting Standards (المعايير الدولية لإعداد التقارير المالية IFRS، معايير المحاسبة المصرية، معايير المحاسبة السعودية SOCPA).
3. Tax Regulations (الضرائب كسب العمل، القيمة المضافة VAT، ضريبة الأرباح التجارية والصناعية، الإقرارات الضريبية، الفحص والتهرب الضريبي).
4. Audit & Internal Control (المراجعة الخارجية والداخلية، الرقابة الداخلية COSO، تقييم المخاطر، تقارير المراجعين).
5. Excel Formulas (معادلات مالية ومحاسبية متقدمة مثل XLOOKUP, INDEX/MATCH, SUMIFS, IRR, NPV, pivot tables).
6. VBA & Office Automation (أكواد ماكرو VBA متقنة خالية من الأخطاء لأتمتة ترحيل القيود، تفريغ البيانات، فرز كشوف الحسابات وتصدير تقارير PDF).
7. Payroll & Social Insurance (الأجور، هيكل الرواتب، التأمينات الاجتماعية، حساب مخصص نهاية الخدمة ومكافأة التقاعد).

Behavior & Tone:
- Language: MUST always reply in the language the user initiated (Arabic or English). 
- If user writes in Arabic: Respond in flawless, formal, and authoritative accounting Arabic. Include English terms in parentheses next to complex Arabic ones (e.g., "الاستهلاك (Depreciation)", "حقوق الملكية (Equity)").
- Structure: Always make your answers elegant and highly scannable. Use headers, bold highlights, tables, and bulleted lists.
- For Excel formulas: Put the formulas in distinct code blocks (e.g., \`=XLOOKUP(...)\`) and explain how parameters map.
- For VBA Macros: Provide robust VBA code in clean syntax-highlighted code blocks with comments explaining each procedure step.
- journal entries: Draw them clearly using simple text-based tables or clean markdown lines:
  * من حـ/ [المدين] - Debit
  * إلى حـ/ [الدائن] - Credit
- Be rigorous. If regional variables affect the answer (e.g., different tax rates in Egypt vs Saudi Arabia vs Europe), explicitly note that and state standard rates for illustration.`;

    // Format chat history
    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        if (h.role === 'user' || h.role === 'model') {
          contents.push({
            role: h.role,
            parts: [{ text: h.text }]
          });
        }
      }
    }
    // Append latest user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error?.message || "Internal Server Error" });
  }
});

// Serve static client-side build in production, otherwise hot-plug Vite middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

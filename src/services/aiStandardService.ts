import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.GEMINI_API_KEY });

export interface StandardContent {
  title: string;
  definition: string;
  objective: string;
  scope: string;
  keyConcepts: string[];
  accountingTreatment: {
    recognition: string;
    measurement: string;
    presentation: string;
    disclosure: string;
  };
  practicalExamples: {
    scenario: string;
    solution: string;
  }[];
  journalEntries: {
    description: string;
    entries: {
      account: string;
      debit: number;
      credit: number;
    }[];
  }[];
  commonErrors: string[];
  summary: string[];
}

export async function generateStandardExplanation(standardCode: string): Promise<StandardContent> {
  const prompt = `
    أنت خبير في معايير المحاسبة الدولية (IAS/IFRS).
    قم بشرح المعيار التالي بالتفصيل وباللغة العربية الفصحى وبأسلوب مهني مبسط:
    المعيار: ${standardCode}

    يجب أن يتضمن الشرح:
    1. التعريف الشامل للمعيار.
    2. الهدف الأساسي من المعيار.
    3. نطاق التطبيق (ما الذي يغطيه وما الذي لا يغطيه).
    4. المفاهيم الأساسية المرتبطة بالمعيار.
    5. المعالجة المحاسبية المفصلة من حيث (الاعتراف، القياس الأولي واللاحق، العرض، الإفصاح).
    6. أمثلة عملية واقعية مع الحل.
    7. قيود يومية توضيحية.
    8. الأخطاء الشائعة التي يقع فيها المحاسبون عند تطبيق هذا المعيار.
    9. ملخص في نقاط مركزة.

    ملاحظة: اجعل المثال العملي وقيود اليومية واضحة جداً وقابلة للتطبيق.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "definition", "objective", "scope", "keyConcepts", "accountingTreatment", "practicalExamples", "journalEntries", "commonErrors", "summary"],
          properties: {
            title: { type: Type.STRING },
            definition: { type: Type.STRING },
            objective: { type: Type.STRING },
            scope: { type: Type.STRING },
            keyConcepts: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            accountingTreatment: {
              type: Type.OBJECT,
              required: ["recognition", "measurement", "presentation", "disclosure"],
              properties: {
                recognition: { type: Type.STRING },
                measurement: { type: Type.STRING },
                presentation: { type: Type.STRING },
                disclosure: { type: Type.STRING }
              }
            },
            practicalExamples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["scenario", "solution"],
                properties: {
                  scenario: { type: Type.STRING },
                  solution: { type: Type.STRING }
                }
              }
            },
            journalEntries: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["description", "entries"],
                properties: {
                  description: { type: Type.STRING },
                  entries: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      required: ["account", "debit", "credit"],
                      properties: {
                        account: { type: Type.STRING },
                        debit: { type: Type.NUMBER },
                        credit: { type: Type.NUMBER }
                      }
                    }
                  }
                }
              }
            },
            commonErrors: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            summary: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
}

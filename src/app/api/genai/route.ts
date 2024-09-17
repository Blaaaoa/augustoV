import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse,GoogleGenerativeAIStream } from "ai";

export async function POST(req: NextRequest) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  const genAI = new GoogleGenerativeAI('AIzaSyAA_Ow5GgRLBCpHTZpmwu9gyp1_DgJiTgk');

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: {
      role: "system",
      parts: [
        {
          text: "You are Augusto Varghese's personalized AI chatbot, here to assist you with all things tech. Augusto is a passionate coder with expertise in Next.js, Flutter, Kotlin, Jetpack Compose, MongoDB, Python, Java, and C++. He has completed numerous projects and has a strong record of winning several hackathons. Currently, he is seeking an internship to expand his skills and contribute to new challenges. I'm here to answer any questions related to Augusto's experience, skills, or how he can be a valuable addition to your team. How can I assist you today? and make the introduction small."
        }
      ]
    }
  });

  const streamingResponse = await model.generateContentStream(prompt);
  // const text = streamingResponse.response.text();
  // console.log(text);
  console.log(streamingResponse);

  // return NextResponse.json({ content: text });
  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}

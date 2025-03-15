import { NextRequest, NextResponse } from 'next/server';
import PDFParser from 'pdf2json';
import Together from 'together-ai';

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const together = new Together({ apiKey: TOGETHER_API_KEY });

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST(request: NextRequest) {
  try {
    if (!TOGETHER_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const roastLevel = formData.get('roastLevel') || 'medium';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are accepted' },
        { status: 400 }
      );
    }

    // Convert the file to a buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse PDF using pdf2json
    const pdfParser = new PDFParser(null, false);

    const pdfText = await new Promise<string>((resolve, reject) => {
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        try {
          const text = pdfData.Pages
            .map(page => 
              page.Texts
                .map(text => decodeURIComponent(text.R[0].T))
                .join(' ')
            )
            .join('\n')
            .replace(/\s+/g, ' ')
            .trim();
          resolve(text);
        } catch (error) {
          reject(new Error('Failed to parse PDF content'));
        }
      });

      pdfParser.on('pdfParser_dataError', () => {
        reject(new Error('Failed to parse PDF file'));
      });

      pdfParser.parseBuffer(buffer);
    });

    if (!pdfText || pdfText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from PDF' },
        { status: 400 }
      );
    }

    if (pdfText.length < 50) {
      return NextResponse.json(
        { error: 'PDF content is too short to be a valid resume' },
        { status: 400 }
      );
    }

    // Generate the roast using Together AI
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content: `You are a witty and sarcastic resume critic. Your task is to roast this resume with a ${roastLevel} level of intensity. 
          Focus on identifying clichés, buzzwords, weak job descriptions, and potential embellishments. 
          Be humorous but also provide constructive feedback.

          You MUST respond with a valid JSON object using this EXACT format:
          { "workExperience": [ "Where do I even start? 'Developed innovative solutions' – Classic. What, you invented fire while you were at it? Maybe just say you clicked some buttons and called it 'innovative'.", "Your job titles sound like you were a part-time superhero. 'Project Manager, Sales Guru, Design Wizard' – Did you also save the world in between those meetings?", "So you 'increased sales by 300%'? Did your sales team include a magic wand and a unicorn? Unless you’re running a Ponzi scheme, let's scale down those numbers. I don't think 'creating Excel spreadsheets' counts as wizardry." ], "skills": "Nice. Your skills section looks like it was copied from a random list of buzzwords. 'Proficient in Microsoft Office'? You mean you know how to open Word? Your 'leadership' skills probably consist of standing in front of a group, nodding, and hoping no one asks you questions.", "education": "Oh wow, you went to 'University of Excellence'—was that an online, degree-in-a-weekend course? Because, frankly, it looks like you spent more time Googling your way through than actually learning anything. Maybe next time, mention 'survived college with caffeine and sheer panic.'", "overallImpression": "This resume is basically a 'how-to' guide on looking busy while doing absolutely nothing. You’ve turned the art of embellishment into a full-time career, and if that were a job, you’d be CEO. But hey, you’re definitely an expert in the language of self-promotion. Let’s be real, this resume needs more than just a tweak—throw it out and start over.", "savageTweet": "Your resume reads like a self-help book written by someone who’s never helped anyone. Zero substance, just fluff. #TryAgain" }

          Guidelines:
          - workExperience should be an array of strings, each roasting a different aspect
          - Make the roasts ${roastLevel} intensity (light = constructive with humor, medium = balanced roast, brutal = savage criticism)
          - Include specific details from their resume in your roasts
          - savageTweet should be short, memorable, and witty (no hashtags)
          - Keep it professional but funny
          - IMPORTANT: Ensure your response is a valid JSON object that matches the exact format above`
        },
        {
          role: "user",
          content: pdfText
        }
      ] as const,
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON object found in response');
    }

    const roast = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ roast }, { status: 200 });

  } catch (error) {
    console.error('Resume analysis error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Failed to process resume', 
        details: errorMessage
      },
      { status: 500 }
    );
  }
} 
# Resume Roaster 🔥

A modern web application that provides brutally honest, AI-powered roasts of your resume with a touch of humor. Built with Next.js and Together AI, Resume Roaster offers constructive feedback while keeping things entertaining.

## Features

- 📄 PDF Resume Analysis
- 🎯 Three Roast Intensity Levels
- 🤖 AI-Powered Feedback
- 🎨 Modern, Responsive UI
- ⚡ Real-time Processing
- 🔍 Detailed Analysis of:
  - Work Experience
  - Skills
  - Education
  - Overall Impression
  - Savage Tweet Summary

## Tech Stack

- **Frontend:**
  - Next.js 15.2
  - React 19
  - TypeScript
  - Tailwind CSS
  - React Dropzone
  - React Hot Toast
  - Heroicons

- **Backend:**
  - Next.js API Routes
  - Together AI API
  - PDF Processing: pdf2json

## Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- npm or yarn package manager
- A Together AI API key (get one at [Together AI Platform](https://www.together.ai))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/resume-roaster.git
cd resume-roaster
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the project root:
```env
TOGETHER_API_KEY=your_together_api_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select Roast Intensity:**
   - 🌱 Light: Constructive feedback with a gentle touch of humor
   - 🔥 Medium: Balanced mix of humor and constructive criticism
   - 💀 Brutal: No mercy, full roast with savage feedback

2. **Upload Resume:**
   - Drag and drop your PDF resume
   - Or click to select a file
   - Only PDF files are accepted

3. **View Results:**
   - Wait for AI analysis (typically takes 10-15 seconds)
   - Review the generated roast, including:
     - Savage tweet summary
     - Work experience critique
     - Skills assessment
     - Education evaluation
     - Overall impression

## Project Structure

```
resume-roaster/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── analyze-resume/
│   │   │       └── route.ts      # Resume analysis API endpoint
│   │   ├── components/
│   │   │   └── Toaster.tsx      # Toast notifications
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   │
│   └── components/
│       ├── RoastDisplay.tsx    # Displays roast results
│       ├── RoastLevelSelector.tsx # Roast intensity selector
│       └── UploadSection.tsx   # File upload component
├── .env.local                 # Environment variables
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## How It Works

1. **Frontend:**
   - Uses React Dropzone for file uploads
   - Implements a three-tier roast level system
   - Provides real-time feedback with toast notifications
   - Displays results in a structured, easy-to-read format

2. **PDF Processing:**
   - Converts uploaded PDF to text using pdf2json
   - Extracts structured information for analysis

3. **AI Analysis:**
   - Uses Together AI's Llama-3.3-70B-Instruct-Turbo model
   - Processes resume content with custom prompts
   - Generates structured feedback in JSON format
   - Adjusts roast intensity based on user selection

## Error Handling

- PDF Processing Errors:
  - Invalid file format
  - Corrupted PDFs
  - Text extraction failures
- API Errors:
  - Network issues
  - Rate limiting
  - Invalid responses
- User Feedback:
  - Toast notifications
  - Loading states
  - Error messages

## Development

### Building for Production
```bash
npm run build
# or
yarn build
```

### Starting Production Server
```bash
npm run start
# or
yarn start
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| TOGETHER_API_KEY | Together AI API Key | Yes |

## Troubleshooting

### Common Issues

1. **API Key Issues:**
   ```bash
   Error: Failed to analyze resume
   ```
   - Check if TOGETHER_API_KEY is properly set in .env.local
   - Verify API key is valid

2. **PDF Upload Issues:**
   ```bash
   Error: Invalid file format
   ```
   - Ensure file is in PDF format
   - Check file is not corrupted
   - Verify file size is under limit

3. **Server Issues:**
   ```bash
   Error: Network error while analyzing resume
   ```
   - Check internet connection
   - Verify server is running
   - Check console for detailed errors

## License

This project is licensed under the MIT License.

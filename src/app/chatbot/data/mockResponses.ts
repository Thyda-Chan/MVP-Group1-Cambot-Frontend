// data/mockResponses.ts

// Define the structure of a bot response
interface BotResponse {
    response: string;
    files: { fileName: string; fileUrl: string; publishDate: string }[];
  }
  
  // Define the responses object with an index signature
  export const responses: Record<string, BotResponse> = {
    "mini agent": {
      response: `
        We are excited to introduce the Mini Agent Service, designed to improve customer accessibility and enhance banking convenience. This initiative aims to provide essential banking services through authorized agents in local communities.
  
        **Key Highlights:**
        - Enhanced Accessibility: Customers can access basic banking services closer to their location.
        - Faster Transactions: Reduce wait times at branches by enabling quick transactions via agents.
        - Secure & Reliable: Ensures compliance with banking regulations for safe transactions.
        - Increased Financial Inclusion: Expands banking access to underserved areas.
  
        **Implementation Date:** The Mini Agent Service is scheduled to launch on February 24, 2025. Further details on training and rollout will be shared soon.
      `,
      files: [
        {
          fileName: "Memo_012-Mini Agent_2024",
          fileUrl: "https://example.com/memo-mini-agent-2024.pdf",
          publishDate: "01/15/2024",
        },
      ],
    },
    "two files": {
      response: `
        Here are two files related to the topic. These documents provide detailed information about the Mini Agent Service and its implementation.
  
        **File Details:**
        - File One: Overview of the Mini Agent Service.
        - File Two: Implementation timeline and key milestones.
      `,
      files: [
        {
          fileName: "File_One.pdf",
          fileUrl: "https://example.com/file-one.pdf",
          publishDate: "03/01/2024",
        },
        {
          fileName: "File_Twooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo.pdf",
          fileUrl: "https://example.com/file-two.pdf",
          publishDate: "03/02/2024",
        },
      ],
    },
    "five files": {
      response: `
        Here are five files related to the topic. These documents provide comprehensive information about the Mini Agent Service, including its benefits, implementation, and training programs.
  
        **File Details:**
        - File One: Overview of the Mini Agent Service.
        - File Two: Implementation timeline and key milestones.
        - File Three: Benefits of the Mini Agent Service.
        - File Four: Training program details.
        - File Five: Frequently asked questions.
      `,
      files: [
        {
          fileName: "File_One.pdf",
          fileUrl: "https://example.com/file-one.pdf",
          publishDate: "03/01/2024",
        },
        {
          fileName: "File_Two.pdf",
          fileUrl: "https://example.com/file-two.pdf",
          publishDate: "03/02/2024",
        },
        {
          fileName: "File_Three.pdf",
          fileUrl: "https://example.com/file-three.pdf",
          publishDate: "03/03/2024",
        },
        {
          fileName: "File_Four.pdf",
          fileUrl: "https://example.com/file-four.pdf",
          publishDate: "03/04/2024",
        },
        {
          fileName: "File_Five.pdf",
          fileUrl: "https://example.com/file-five.pdf",
          publishDate: "03/05/2024",
        },
      ],
    },
    "hello": {
      response: "Hey there! How can I assist you today?",
      files: [],
    },
    "how are you": {
      response: "I'm doing great! Thanks for asking. 😊",
      files: [],
    },
    "what is ai": {
      response: "AI stands for Artificial Intelligence, which enables machines to learn and make decisions.",
      files: [],
    },
  };
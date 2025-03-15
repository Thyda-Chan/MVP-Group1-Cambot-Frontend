// data/mockResponses.ts

// Define the structure of a chat message
interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  files: { fileName: string; fileUrl: string; publishDate: string }[];
}

// Define the structure of a chat session
interface ChatSession {
  chatId: string;
  chatName: string; // Name of the chat session (e.g., "Chat about Mini Agent")
  messages: ChatMessage[];
}

// Mock chat history data
export const mockChatHistory: ChatSession[] = [
  {
    chatId: '1',
    chatName: 'Chat about Mini Agent',
    messages: [
      {
        sender: 'user',
        text: 'Tell me about the Mini Agent Service.',
        files: [],
      },
      {
        sender: 'bot',
        text: `
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
      {
        sender: 'user',
        text: 'Can you provide more details?',
        files: [],
      },
      {
        sender: 'bot',
        text: `
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
    ],
  },
  {
    chatId: '2',
    chatName: 'Chat about AI',
    messages: [
      {
        sender: 'user',
        text: 'What is AI?',
        files: [],
      },
      {
        sender: 'bot',
        text: 'AI stands for Artificial Intelligence, which enables machines to learn and make decisions.',
        files: [],
      },
    ],
  },
  {
    chatId: '3',
    chatName: 'Chat about Memo Loan',
    messages: [
      {
        sender: 'user',
        text: 'Tell me about the Memo Loan program.',
        files: [],
      },
      {
        sender: 'bot',
        text: `
          We are pleased to announce the launch of the new **Memo Loan** program, designed to provide quick and flexible financial support to eligible individuals and businesses. The **Memo Loan** offers convenient loan terms, competitive interest rates, and faster approval processes, ensuring that customers can access the funds they need with ease.

          **Key Features:**
          - **Flexible Loan Terms:** Choose repayment options that suit your financial situation. From short-term to long-term loans, we have you covered.
          - **Competitive Interest Rates:** Our loan offerings come with attractive interest rates, making it easier to manage repayments.
          - **Fast Approval Process:** We understand the urgency of financial needs, which is why our approval process is designed to be quick and hassle-free.
          - **Secure Transactions:** All loan applications are processed through secure channels, ensuring your financial information is protected.
          - **Dedicated Support:** Our customer support team is always available to guide you through the application process and answer any questions you may have.

          **Eligibility Criteria:**
          - Applicants must be 18 years or older.
          - Must have a steady source of income or demonstrate financial stability.
          - Both individuals and businesses can apply, with specific terms for each category.

          **How to Apply:**
          - Visit our website and fill out the online application form.
          - Submit the required documents, including proof of identity, income statements, and any business-related financial documents if applicable.
          - After submitting the application, you will receive a notification within 24-48 hours regarding the status of your loan.

          **Important Dates:**
          - The **Memo Loan** program is officially launching on **March 15, 2025**.
          - The first round of applications will close on **April 30, 2025**.

          We encourage you to take advantage of this opportunity and apply for a **Memo Loan** to meet your financial goals. Further details and updates will be provided through our official channels.
        `,
        files: [
          {
            fileName: "Memo_Loan_Program_Details_2025",
            fileUrl: "https://example.com/memo-loan-program-details-2025.pdf",
            publishDate: "02/15/2025",
          },
        ],
      },
    ],
  },
];
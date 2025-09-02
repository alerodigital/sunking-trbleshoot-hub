// Topics and FAQ data for the Sun King troubleshooting hub

export const topics = [
  { id: '1', name: 'Satellite Issues and Activation' },
  { id: '2', name: 'Repossession and Refunds' },
  { id: '3', name: 'Account Management' },
];

export const faqs = [
  // Satellite Issues and Activation
  { 
    id: '1', 
    topicId: '1', 
    question: 'StarTimes Activation Steps', 
    answer: 'Follow these steps to activate your StarTimes subscription: 1. Insert your smart card into the decoder. 2. Turn on your TV and decoder. 3. Navigate to the activation menu. 4. Enter your activation code. 5. Wait for confirmation message.' 
  },
  { 
    id: '2', 
    topicId: '1', 
    question: 'Satellite Escalation Procedure', 
    answer: 'If you experience satellite signal issues: 1. Check all cable connections. 2. Verify dish alignment. 3. Contact technical support if issues persist. 4. Schedule a technician visit if required.' 
  },
  { 
    id: '3', 
    topicId: '1', 
    question: 'Card Replacements', 
    answer: 'To replace a damaged or faulty smart card: 1. Visit the nearest Sun King office. 2. Bring your ID and proof of subscription. 3. Pay the replacement fee. 4. Activate the new card following standard procedures.' 
  },
  
  // Repossession and Refunds
  { 
    id: '4', 
    topicId: '2', 
    question: 'Repossession with Refund', 
    answer: 'Information about the repossession process and how to request refunds for eligible accounts. Contact customer service for specific cases.' 
  },
  { 
    id: '5', 
    topicId: '2', 
    question: 'Refund/Reversal', 
    answer: 'Guidelines for processing refunds and payment reversals for various scenarios. Processing time is typically 5-7 business days.' 
  },
  
  // Account Management
  { 
    id: '6', 
    topicId: '3', 
    question: 'Account Settings', 
    answer: 'Manage your account settings through the customer portal or mobile app. You can update personal information, payment methods, and subscription preferences.' 
  },
  { 
    id: '7', 
    topicId: '3', 
    question: 'Password Reset', 
    answer: 'To reset your password: 1. Go to the login page. 2. Click "Forgot Password". 3. Enter your registered email. 4. Check your email for reset instructions.' 
  },
];

// Popular topics that show by default
export const popularTopics = [
  { id: '1', title: 'StarTimes Activation Steps', topicId: '1' },
  { id: '2', title: 'Repossession with Refund', topicId: '2' },
  { id: '3', title: 'Refund/Reversal', topicId: '2' },
];

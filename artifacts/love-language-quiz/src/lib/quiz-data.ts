export type LoveLanguage = "W" | "S" | "G" | "T" | "P";

export interface Answer {
  text: string;
  type: LoveLanguage;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "What makes you feel most appreciated by someone you love?",
    answers: [
      { type: "W", text: "When they tell me how much I mean to them" },
      { type: "S", text: "When they take care of something before I even ask" },
      { type: "G", text: "When they bring me something thoughtful, just because" },
      { type: "T", text: "When they put their phone down and give me their full attention" },
      { type: "P", text: "When they hold my hand or give me a long hug" },
    ]
  },
  {
    id: 2,
    text: "When you're going through a hard time, what helps the most?",
    answers: [
      { type: "W", text: "Hearing the words 'I'm proud of you' or 'I'm here for you'" },
      { type: "S", text: "Someone stepping in and helping with my to-do list" },
      { type: "G", text: "Receiving a small gift that shows they were thinking of me" },
      { type: "T", text: "Someone sitting with me, even if we don't say much" },
      { type: "P", text: "A comforting touch on the shoulder or a tight hug" },
    ]
  },
  {
    id: 3,
    text: "How do you most naturally show love to someone close to you?",
    answers: [
      { type: "W", text: "Telling them how much they mean to me, often" },
      { type: "S", text: "Doing things for them without being asked" },
      { type: "G", text: "Picking up little things I know they'll love" },
      { type: "T", text: "Making time to be fully present with them" },
      { type: "P", text: "Reaching out to touch them — a hand on the back, a hug" },
    ]
  },
  {
    id: 4,
    text: "What would feel most meaningful on your birthday?",
    answers: [
      { type: "W", text: "A heartfelt handwritten card or a heartfelt speech" },
      { type: "S", text: "Someone handling all the details so I can relax" },
      { type: "G", text: "A gift they clearly put thought and care into" },
      { type: "T", text: "A whole day spent together doing what I love" },
      { type: "P", text: "Long hugs from everyone I care about" },
    ]
  },
  {
    id: 5,
    text: "When a relationship feels distant, what do you miss most?",
    answers: [
      { type: "W", text: "Kind words and verbal check-ins" },
      { type: "S", text: "Feeling looked after — the little acts of help" },
      { type: "G", text: "Spontaneous tokens of affection" },
      { type: "T", text: "Uninterrupted, quality time together" },
      { type: "P", text: "Physical closeness — touch and proximity" },
    ]
  },
  {
    id: 6,
    text: "What tends to hurt you most in a relationship?",
    answers: [
      { type: "W", text: "Being criticized or hearing negative words" },
      { type: "S", text: "Feeling like I have to do everything myself" },
      { type: "G", text: "Feeling forgotten — no thoughtful gestures" },
      { type: "T", text: "Being constantly distracted when we're together" },
      { type: "P", text: "Feeling physically disconnected or distant" },
    ]
  },
  {
    id: 7,
    text: "Your ideal evening with someone you love looks like...",
    answers: [
      { type: "W", text: "Deep, meaningful conversation for hours" },
      { type: "S", text: "Them cooking dinner while I relax, or vice versa" },
      { type: "G", text: "A surprise — flowers, a treat, a little something" },
      { type: "T", text: "A walk, a movie, fully present with no distractions" },
      { type: "P", text: "Curled up close together, just being near each other" },
    ]
  },
  {
    id: 8,
    text: "What makes a celebration feel truly special?",
    answers: [
      { type: "W", text: "Toasts, words of appreciation, and being verbally celebrated" },
      { type: "S", text: "Someone taking care of everything so I can just enjoy it" },
      { type: "G", text: "A thoughtful, personal gift that shows they know me" },
      { type: "T", text: "Quality time — the experience and memories we create" },
      { type: "P", text: "Being surrounded by hugs and physical closeness" },
    ]
  },
  {
    id: 9,
    text: "When someone loves you well, you feel it most when...",
    answers: [
      { type: "W", text: "They say things that lift me up and express their feelings" },
      { type: "S", text: "They notice what I need and quietly take care of it" },
      { type: "G", text: "They surprise me with something they knew I'd love" },
      { type: "T", text: "They choose to spend time with me over other things" },
      { type: "P", text: "They initiate physical closeness — a touch, a hug, a kiss" },
    ]
  },
  {
    id: 10,
    text: "The most romantic gesture someone could make is...",
    answers: [
      { type: "W", text: "Writing me a love letter or leaving sweet notes" },
      { type: "S", text: "Handling something stressful for me without being asked" },
      { type: "G", text: "Planning a surprise with gifts and thoughtful details" },
      { type: "T", text: "Planning a whole day for just the two of us, phone-free" },
      { type: "P", text: "A spontaneous, loving embrace out of nowhere" },
    ]
  }
];

export const loveLanguages = {
  W: {
    name: "Words of Affirmation",
    description: "You feel most loved through kind, affirming words. Verbal expressions of love, encouragement, and appreciation speak directly to your heart."
  },
  S: {
    name: "Acts of Service",
    description: "Actions speak louder than words for you. When someone goes out of their way to help or serve you, you feel deeply cared for."
  },
  G: {
    name: "Receiving Gifts",
    description: "You feel most loved through thoughtful, tangible tokens of affection. It's not about the price — it's the thought and effort behind the gift."
  },
  T: {
    name: "Quality Time",
    description: "Your love language is undivided attention. When someone is fully present with you — no distractions — you feel truly valued."
  },
  P: {
    name: "Physical Touch",
    description: "Physical presence and touch make you feel most connected. Hugs, a hand on your shoulder, or sitting close — these are your love."
  }
};

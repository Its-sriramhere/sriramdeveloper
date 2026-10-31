export type JourneyMotion = "coast" | "circuit" | "departure" | "arrival" | "lab" | "wires" | "build" | "error" | "breakthrough" | "edit" | "exports" | "horizon";

export interface JourneyChapter {
  id: string;
  title: string;
  beat: string;
  act: number;
  narration: string;
  dialogue: string;
  motion: JourneyMotion;
  expression: string;
  reaction: string;
  alt: string;
  detailAlt: string;
  actor?: string;
  aside?: string;
}

/** Owner-supplied biography/storyboard. Comic inner dialogue is narrative embellishment. */
export const journeyChapters: JourneyChapter[] = [
  { id: "01", title: "The coast that raised me", beat: "NAGAPATTINAM", act: 1, narration: "I’m Sriram. My story begins in Nagapattinam, where the sea is part of everyday life.", dialogue: "The world felt bigger than the horizon.", motion: "coast", expression: "determination", reaction: "joy", actor: "01", alt: "Fishing boats and morning light on Nagapattinam harbour", detailAlt: "A close-up of a hand and harbour nets" },
  { id: "02", title: "Small things, big questions", beat: "CURIOSITY", act: 1, narration: "Before I knew what I wanted to become, I knew I wanted to understand things.", dialogue: "Okay… but how does this work?", motion: "circuit", expression: "confusion", reaction: "determination", alt: "Sriram inspecting a small electronic board at a workbench", detailAlt: "Hands examining the components on a circuit board", aside: "The curiosity scene is symbolic; the questions are very real." },
  { id: "03", title: "A bag full of possibilities", beat: "LEAVING HOME", act: 1, narration: "I moved from Nagapattinam to Coimbatore to pursue my undergraduate studies.", dialogue: "New place. Same curious mind.", motion: "departure", expression: "sadness", reaction: "determination", actor: "03", alt: "The familiar coast opening toward a new journey", detailAlt: "Sriram packing his backpack before leaving home" },
  { id: "04", title: "Hello, Coimbatore", beat: "ARRIVAL", act: 1, narration: "Coimbatore became the setting for my next chapter.", dialogue: "New city unlocked. Directions still loading.", motion: "arrival", expression: "shock", reaction: "joy", alt: "Coimbatore city life beneath distant hills", detailAlt: "Sriram looking upward at his new surroundings", aside: "A little dramatic license. A very familiar feeling." },
  { id: "05", title: "Signals, circuits, possibilities", beat: "ELECTRONICS & COMMUNICATION", act: 2, narration: "Studying Electronics and Communication Engineering taught me to look beyond the surface of the things around me.", dialogue: "Every connection has a reason.", motion: "lab", expression: "determination", reaction: "suspicion", alt: "An electronics workbench with instruments and a circuit board", detailAlt: "Working hands and a soldering tool over a circuit" },
  { id: "06", title: "The wire boss battle", beat: "A COMIC INTERLUDE", act: 2, narration: "Some connections were easier to understand than to untangle.", dialogue: "Is this a circuit… or a fishing net?", motion: "wires", expression: "confusion", reaction: "exhaustion", alt: "An exaggerated tangle of breadboard wires and a small comic reaction", detailAlt: "Sriram following a wire with a puzzled expression", aside: "An exaggerated comic beat, not a lab incident report." },
  { id: "07", title: "Another kind of building", beat: "DEVELOPMENT", act: 2, narration: "Along the way, I found development: a way to turn ideas into things people could use.", dialogue: "One idea. One component. One more attempt.", motion: "build", expression: "determination", reaction: "joy", actor: "07", alt: "A quiet night-time workspace and an open laptop", detailAlt: "Hands typing at a laptop keyboard" },
  { id: "08", title: "It worked a minute ago", beat: "THE INEVITABLE PLOT TWIST", act: 2, narration: "Then came the part every builder meets: something that refuses to work.", dialogue: "Me: fixed it. Browser: interesting theory.", motion: "error", expression: "shock", reaction: "suspicion", alt: "Sriram studying an unexpected browser problem", detailAlt: "A focused close-up of Sriram’s questioning eyes", aside: "The error is part of the story. Your portfolio is still working." },
  { id: "09", title: "The small breakthrough", beat: "PROGRESS", act: 2, narration: "Trying, checking and trying again became part of how I learned to build.", dialogue: "That feeling when it finally works.", motion: "breakthrough", expression: "determination", reaction: "joy", alt: "A working interface and creative tools at Sriram’s desk", detailAlt: "One more careful check at the keyboard" },
  { id: "10", title: "Stories between the frames", beat: "EDITING, AS A PASSION", act: 3, narration: "Development became part of my journey. Editing became another way to express myself.", dialogue: "Code builds the experience. Editing shapes the feeling.", motion: "edit", expression: "determination", reaction: "joy", alt: "An editing workspace with coastal images on screen", detailAlt: "A film timeline connecting coastal scenes" },
  { id: "11", title: "Final. Really final.", beat: "ONE MORE VERSION", act: 3, narration: "Some creative decisions take a few versions. And then a few more.", dialogue: "final.mp4 → final_v2.mp4 → final_THIS_ONE.mp4", motion: "exports", expression: "embarrassment", reaction: "exhaustion", alt: "A playful mountain of exported video versions", detailAlt: "A hand making another careful adjustment with the mouse", aside: "A fictional comedy beat for anyone who has named a file ‘final’." },
  { id: "12", title: "Still becoming", beat: "AN OPEN ENDING", act: 3, narration: "From Nagapattinam to Coimbatore, from circuits to code and stories—I’m still learning, building and creating.", dialogue: "The next chapter? Let’s create it.", motion: "horizon", expression: "determination", reaction: "joy", actor: "12", alt: "An open coastal horizon, connecting the end of the story to its beginning", detailAlt: "Sriram’s code and editing work together at one desk" },
];

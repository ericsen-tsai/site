import TimelineItem from "@/components/reading-timeline/timeline-item";
import type { BookEntry } from "@/types/book-entry";

export const dynamic = "force-dynamic";

const books: BookEntry[] = [
  {
    title: "By the Sea",
    author: "Abdulrazak Gurnah",
    date: "Oct 2024",
    ongoing: true,
    link: "https://www.google.com/search?q=By+the+Sea+Abdulrazak+Gurnah"
  },
  {
    title: "In Search of Lost Time: Swann's Way",
    author: "Marcel Proust",
    date: "Sep 2024",
    link: "https://www.google.com/search?q=In+Search+of+Lost+Time%3A+Swann%27s+Way+Marcel+Proust",
    bestQuoteInBook: "Every hour, I feel as if the chimes of the previous hour have just sounded."
  },
  {
    title: "Return from Tomorrow",
    author: "George G. Ritchie",
    date: "Aug 2024",
    link: "https://www.google.com/search?q=Return+from+Tomorrow+George+G.+Ritchie"
  },
  {
    title: "The Wind in the Willows",
    author: "Kenneth Grahame",
    date: "Aug 2024",
    link: "https://www.google.com/search?q=The+Wind+in+the+Willows+Kenneth+Grahame"
  },
  {
    title: "Mutant Message Down Under",
    author: "Marlo Morgan",
    date: "Jul 2024",
    link: "https://www.google.com/search?q=Mutant+Message+Down+Under+Marlo+Morgan"
  },
  {
    title: "The Metamorphosis",
    author: "Franz Kafka",
    date: "May 2024",
    link: "https://www.google.com/search?q=The+Metamorphosis+Franz+Kafka",
    bestQuoteInBook: "He was a tool of the boss, without brains or backbone."
  },
  {
    title: "No Longer Human",
    author: "Osamu Dazai",
    date: "May 2024",
    link: "https://www.google.com/search?q=No+Longer+Human+Osamu+Dazai",
    bestQuoteInBook: "Seeing one person after another, I realize that in fact, I love no one."
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    date: "Apr 2024",
    link: "https://www.google.com/search?q=One+Hundred+Years+of+Solitude+Gabriel+Garc%C3%ADa+M%C3%A1rquez",
    bestQuoteInBook:
      "The first of the line is tied to a tree and the last is being eaten by the ants."
  },
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    date: "Apr 2024",
    link: "https://www.google.com/search?q=The+Book+Thief+Markus+Zusak",
    bestQuoteInBook:
      "I have hated the words and I have loved them, and I hope I have made them right."
  },
  {
    title: "The Moon and Sixpence",
    author: "W. Somerset Maugham",
    date: "Mar 2024",
    link: "https://www.google.com/search?q=The+Moon+and+Sixpence+W.+Somerset+Maugham",
    bestQuoteInBook: "Strickland was an odious man, but I still think he was a great one."
  },
  {
    title: "The Idiot",
    author: "Fyodor Dostoevsky",
    date: "Mar 2024",
    link: "https://www.google.com/search?q=The+Idiot+Fyodor+Dostoevsky",
    bestQuoteInBook:
      "It is better to be unhappy and know the worst, than to be happy in a fool's paradise."
  },
  {
    title: "Dollars and Sense",
    author: "Dan Ariely, Jeff Kreisler",
    date: "Feb 2024",
    link: "https://www.google.com/search?q=Dollars+and+Sense+Dan+Ariely+Jeff+Kreisler"
  },
  {
    title: "走路",
    author: "Lung Ying-tai",
    date: "Feb 2024",
    link: "https://www.google.com/search?q=走路+Lung+Ying-tai"
  },
  {
    title: "Anya's Story",
    author: "Yu Wo (御我)",
    date: "Jan 2024",
    link: "https://www.google.com/search?q=Anya%27s+Story+Yu+Wo+%28御我%29"
  },
  {
    title: "What Life Could Mean to You",
    author: "Alfred Adler",
    date: "Jan 2024",
    link: "https://www.google.com/search?q=What+Life+Could+Mean+to+You+Alfred+Adler"
  },
  {
    title: "Norse Mythology",
    author: "Neil Gaiman",
    date: "Dec 2023",
    link: "https://www.google.com/search?q=Norse+Mythology+Neil+Gaiman"
  },
  {
    title: "The First Love Paradise of Fang Siqi",
    author: "Lin Yi-han",
    date: "Nov 2023",
    link: "https://www.google.com/search?q=The+First+Love+Paradise+of+Fang+Siqi+Lin+Yi-han",
    bestQuoteInBook: "Any act of sexual violence is something the entire society commits together."
  },
  {
    title: "Walden",
    author: "Henry David Thoreau",
    date: "Oct 2023",
    link: "https://www.google.com/search?q=Walden+Henry+David+Thoreau",
    bestQuoteInBook: "The mass of men lead lives of quiet desperation."
  },
  {
    title: "大武山下",
    author: "Lung Ying-tai",
    date: "Jun 2024",
    link: "https://www.google.com/search?q=大武山下+Lung+Ying-tai",
    bestQuoteInBook: "Life cannot be cheated; everything that has happened becomes evidence."
  },
  {
    title: "The Old Man and the Sea",
    author: "Ernest Hemingway",
    date: "May 2023",
    link: "https://www.google.com/search?q=The+Old+Man+and+the+Sea+Ernest+Hemingway",
    bestQuoteInBook: "A man can be destroyed but not defeated."
  }
];

function ReadingTimeline() {
  return (
    <div className="min-h-screen scroll-smooth font-[family-name:var(--font-montserrat)]">
      <div className="min-h-screen p-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-3 flex items-center justify-center text-center text-2xl font-bold">
            Reading Timeline
          </h1>
          <p className="text-card-foreground/50 mb-8 text-sm font-medium">
            Books are not just for reading the words within; they are also tools for adjusting one's
            own feelings.
          </p>
          <div className="relative">
            <div className="bg-card-foreground/30 absolute left-1/2 h-full w-0.5 -translate-x-1/2" />
            <ul className="space-y-24">
              {books.map((book, index) => (
                <TimelineItem key={book.title} {...book} index={index} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingTimeline;

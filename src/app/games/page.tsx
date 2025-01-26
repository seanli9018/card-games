'use client';

import { Tile, Footer, Header } from '@/components';

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-col gap-8 items-center justify-stretch flex-1 max-w-screen-2xl mx-auto">
        <div className="py-4 px-6 w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Tile
              title="Yes or No?"
              description="Choose a card out of 2 cards, and it will either tell you 'Yes' or 'No'"
              tags={['Single player', 'Single device']}
              cta={{
                children: 'Play',
                href: '/games/yes-no',
                buttonType: 'link',
              }}
            />
            <Tile
              title="Bored No More"
              description="Feeling bored? Pick a card from a set of random activity cards to liven things up!"
              tags={['Single player', 'Single device']}
              cta={{
                children: 'Play',
                href: '/games/bored-no-more',
                buttonType: 'link',
              }}
            />
            <Tile
              title="DIY Shuffle Deck"
              description={`This engaging game allows you to create a personalized list of activities, challenges, 
                or tasks tailored to your interests or group. Once your list is ready, 
                it’s time to shuffle the deck and draw a card at random to see what’s next on the agenda!`}
              tags={['Single player', 'Single device']}
              cta={{
                children: 'Play',
                href: '/games/diy-shuffle-deck',
                buttonType: 'link',
              }}
            />
            <Tile
              title="Pick to Finish"
              description={`Whether you’re looking for a fun solo activity or an engaging group challenge, 
                Pick to Finish keeps you entertained till the very last card is drawn. Begin by listing multiple activities. 
                These can be anything you choose – mini-games, challenges, or creative tasks.`}
              tags={['Multi player', 'Single device']}
              cta={{
                children: 'Play',
                href: '/games/pick-to-finish',
                buttonType: 'link',
              }}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
